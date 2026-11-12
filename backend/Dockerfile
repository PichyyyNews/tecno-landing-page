# Multi-stage Go build
FROM golang:1.24-alpine AS builder

WORKDIR /app

# Install git and ca-certificates
RUN apk add --no-cache git ca-certificates

COPY go.mod ./
# Download dependencies
RUN go get github.com/lib/pq@v1.10.9 && go mod download

COPY . .

# Build static binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server main.go

# Production stage
FROM alpine:3.21

WORKDIR /app

RUN apk --no-cache add ca-certificates tzdata

COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]
