# Use the official Golang image as a base
FROM golang:1.22-alpine

# Set environment variables for production use
ENV GO111MODULE=on \
    APP_ENV=production \
    PORT=8080

# Set the working directory inside the container
WORKDIR /app

# Copy Go files and .env (ensure .env is added only if safe to expose in container)
COPY . .

# Download and install the Go modules
RUN go mod download

# Build the Go application
RUN go build -o main ./cmd/api

# Expose the port used by the app
EXPOSE 8080

# Command to run the binary
CMD ["./main"]
