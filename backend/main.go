package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq"
)

type Product struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Category    string    `json:"category"`
	Price       float64   `json:"price"`
	Specs       string    `json:"specs"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
}

type HealthResponse struct {
	Status    string    `json:"status"`
	Database  string    `json:"database"`
	Timestamp time.Time `json:"timestamp"`
}

var db *sql.DB

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbHost := getEnv("DB_HOST", "postgres")
	dbPort := getEnv("DB_PORT", "5432")
	dbUser := getEnv("DB_USER", "postgres")
	dbPass := getEnv("DB_PASSWORD", "postgres123")
	dbName := getEnv("DB_NAME", "techdb")

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPass, dbName)

	var err error
	log.Println("Connecting to PostgreSQL database...")
	for attempts := 1; attempts <= 15; attempts++ {
		db, err = sql.Open("postgres", connStr)
		if err == nil {
			err = db.Ping()
			if err == nil {
				log.Println("Successfully connected to PostgreSQL!")
				break
			}
		}
		log.Printf("PostgreSQL not ready yet (attempt %d/15): %v. Retrying in 2 seconds...", attempts, err)
		time.Sleep(2 * time.Second)
	}

	if err != nil {
		log.Printf("Warning: Failed to connect to database: %v. Running in degraded mode.", err)
	} else {
		initDatabase()
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/health", handleHealth)
	mux.HandleFunc("/api/health", handleHealth)
	mux.HandleFunc("/api/products", handleProducts)
	mux.HandleFunc("/api/info", handleInfo)

	handler := enableCORS(mux)

	log.Printf("Go Backend server listening on port %s", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

func initDatabase() {
	createTableSQL := `
	CREATE TABLE IF NOT EXISTS products (
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		category VARCHAR(100) NOT NULL,
		price NUMERIC(10, 2) NOT NULL,
		specs TEXT NOT NULL,
		description TEXT NOT NULL,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	);`

	if _, err := db.Exec(createTableSQL); err != nil {
		log.Fatalf("Failed to create products table: %v", err)
	}

	var count int
	if err := db.QueryRow("SELECT COUNT(*) FROM products").Scan(&count); err == nil && count == 0 {
		log.Println("Seeding initial computer / technology products...")
		seedSQL := `
		INSERT INTO products (name, category, price, specs, description) VALUES
		('QuantumBook Pro 16', 'Workstation Laptop', 2499.00, 'M4 Max / 64GB Unified RAM / 2TB PCIe 4.0 SSD / 16" Liquid Retina XDR 120Hz', 'Flagship workstation engineered for high-performance machine learning, 3D rendering, and compilation.'),
		('AeroBlade Ultra 14', 'Ultrabook', 1399.00, 'Intel Core Ultra 7 / 32GB LPDDR5X / 1TB NVMe / OLED 2.8K 120Hz', 'Featherlight carbon chassis weighing under 1.1kg with all-day battery life and neural processing unit.'),
		('Titan Apex Neural Rig', 'Desktop Workstation', 4899.00, 'AMD Ryzen 9 9950X / RTX 5090 32GB / 128GB DDR5 ECC / Custom Liquid Loop', 'Uncompromised desktop workstation crafted for on-prem LLM fine-tuning, photorealistic raytracing, and heavy simulation.'),
		('CyberDeck Edge Mini', 'Compact PC', 899.00, 'AMD Ryzen 7 8845HS / 32GB DDR5 / Dual 2.5GbE / USB4 40Gbps', 'Ultra-compact computing node built for edge clustering, micro-servers, and modern developer workstations.');`
		if _, err := db.Exec(seedSQL); err != nil {
			log.Printf("Failed to seed products: %v", err)
		} else {
			log.Println("Database seeded successfully!")
		}
	}
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	dbStatus := "connected"
	if db == nil || db.Ping() != nil {
		dbStatus = "disconnected"
	}

	resp := HealthResponse{
		Status:    "ok",
		Database:  dbStatus,
		Timestamp: time.Now().UTC(),
	}
	_ = json.NewEncoder(w).Encode(resp)
}

func handleProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if db == nil {
		http.Error(w, `{"error":"Database not connected"}`, http.StatusServiceUnavailable)
		return
	}

	rows, err := db.Query("SELECT id, name, category, price, specs, description, created_at FROM products ORDER BY id ASC")
	if err != nil {
		http.Error(w, fmt.Sprintf(`{"error":"%s"}`, err.Error()), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	products := []Product{}
	for rows.Next() {
		var p Product
		if err := rows.Scan(&p.ID, &p.Name, &p.Category, &p.Price, &p.Specs, &p.Description, &p.CreatedAt); err != nil {
			http.Error(w, fmt.Sprintf(`{"error":"%s"}`, err.Error()), http.StatusInternalServerError)
			return
		}
		products = append(products, p)
	}

	_ = json.NewEncoder(w).Encode(products)
}

func handleInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	info := map[string]interface{}{
		"system":      "Next.js + Go + PostgreSQL + Caddy Stack",
		"backend":     "Go 1.23 REST API",
		"environment": "Docker Compose",
		"time":        time.Now().Format(time.RFC3339),
	}
	_ = json.NewEncoder(w).Encode(info)
}
