# Use the official Golang image as a base
FROM golang:1.22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Go files into the container
COPY . .

# Download and install the Go modules
RUN go mod download

# Build the Go app
RUN go build -o main ./cmd/api

# Expose the default port used by the app
EXPOSE 8080

# Command to run the binary
CMD ["./main"]

