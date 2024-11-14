package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
	"github.com/mattadlerpdx/Cadence/backend/internal/domain/business"
	"github.com/mattadlerpdx/Cadence/backend/internal/domain/inventory"
	"github.com/mattadlerpdx/Cadence/backend/internal/infrastructure/controllers"
	"github.com/mattadlerpdx/Cadence/backend/internal/infrastructure/db/postgres"
	"github.com/rs/cors"

	_ "github.com/lib/pq" // PostgreSQL driver
)

func main() {
	// Retrieve environment variables for database connection
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST") // Cloud SQL Unix socket path, e.g., "/cloudsql/cadencescm:us-west1:cadence-postgres-instance"

	// Ensure all required environment variables are set
	if dbUser == "" || dbPass == "" || dbName == "" || dbHost == "" {
		log.Fatal("Database environment variables are not set properly.")
	}

	// Use key-value format for the DSN to connect to Cloud SQL via Unix socket
	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=%s sslmode=disable", dbUser, dbPass, dbName, dbHost)
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Initialize repositories, services, and handlers
	businessRepo := postgres.NewBusinessRepository(db)
	inventoryRepo := postgres.NewInventoryRepository(db)
	businessService := business.NewService(businessRepo)
	inventoryService := inventory.NewService(inventoryRepo)
	businessHandler := controllers.NewBusinessHandler(businessService)
	inventoryHandler := controllers.NewInventoryHandler(inventoryService)

	// Set up the router
	router := mux.NewRouter()

	// Define routes for business
	router.HandleFunc("/business", businessHandler.CreateBusiness).Methods("POST")
	router.HandleFunc("/business/{id}", businessHandler.GetBusiness).Methods("GET")
	router.HandleFunc("/businessAll", businessHandler.GetAllBusinesses).Methods("GET")
	router.HandleFunc("/business/{id}", businessHandler.UpdateBusiness).Methods("PUT")    // Update route
	router.HandleFunc("/business/{id}", businessHandler.DeleteBusiness).Methods("DELETE") // Delete route

	// Define routes for inventory
	router.HandleFunc("/inventory", inventoryHandler.AddInventoryItem).Methods("POST")
	router.HandleFunc("/inventory/{id}", inventoryHandler.GetInventoryItem).Methods("GET")
	router.HandleFunc("/inventory", inventoryHandler.GetAllInventoryItems).Methods("GET")
	router.HandleFunc("/inventory/{id}", inventoryHandler.DeleteInventoryItem).Methods("DELETE")

	// Handle preflight requests for CORS (OPTIONS requests)
	router.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.WriteHeader(http.StatusOK)
	})

	// Configure CORS
	corsAllowedOrigin := os.Getenv("CORS_ALLOWED_ORIGIN")
	if corsAllowedOrigin == "" {
		log.Println("Warning: CORS_ALLOWED_ORIGIN not set. Defaulting to localhost.")
		corsAllowedOrigin = "http://localhost:3000"
	}
	allowedOrigins := strings.Split(corsAllowedOrigin, ",")

	c := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Apply CORS middleware to the router
	handler := c.Handler(router)

	// Get the server port from environment variables or use a default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start the server
	log.Printf("Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
