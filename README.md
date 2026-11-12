# Technology Computer Landing Page

Full-stack production setup featuring:
- **Frontend**: Next.js 16 (TypeScript, Tailwind CSS) with SSG (Static Site Generation) & ISR (Incremental Static Regeneration)
- **Backend**: Go REST API
- **Database**: PostgreSQL 16
- **Proxy**: Caddy 2 Reverse Proxy
- **Containerization**: Docker Compose

---

## Architecture Overview

```
[ Client Browser ]
       │ (Port 80)
       ▼
 [ Caddy 2 Reverse Proxy ]
   ├── /api/*   ──────► [ Go REST API ] (Port 8080)
   │                           │
   │                           ▼
   │                    [ PostgreSQL 16 ] (Port 5432)
   │
   └── /*       ──────► [ Next.js Frontend ] (Port 3000)
                              (SSG / ISR cached)
```

---

## Quick Start (Docker Compose)

### 1. Start all services
```bash
docker compose up -d --build
```

### 2. Check running containers
```bash
docker compose ps
# or
docker ps
```

### 3. Verify access
- **Landing Page (Frontend via Caddy)**: [http://localhost](http://localhost)
- **Backend Health Check**: [http://localhost/api/health](http://localhost/api/health)
- **Hardware Catalog API**: [http://localhost/api/products](http://localhost/api/products)
- **Backend Info**: [http://localhost/api/info](http://localhost/api/info)

---

## Stopping the Services

```bash
docker compose down
# To remove persistent database volume as well:
docker compose down -v
```
