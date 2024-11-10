package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/mattadlerpdx/Cadence/backend/internal/domain/business"
	"github.com/mattadlerpdx/Cadence/backend/internal/domain/inventory"
	"github.com/mattadlerpdx/Cadence/backend/internal/infrastructure/controllers"
	"github.com/mattadlerpdx/Cadence/backend/internal/infrastructure/db/postgres"
	"github.com/rs/cors"

	_ "github.com/lib/pq" // PostgreSQL driver
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Println("No .env file found, proceeding with system environment variables")
	}

	// Set up database connection using TCP (for local development)
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST") // public IP of Cloud SQL instance
	dbPort := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", dbUser, dbPass, dbHost, dbPort, dbName)
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
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

	// Define routes
	router.HandleFunc("/business", businessHandler.CreateBusiness).Methods("POST")
	router.HandleFunc("/business/{id}", businessHandler.GetBusiness).Methods("GET")
	//router.HandleFunc("/business", businessHandler.GetAllBusinesses).Methods("GET")
	//router.HandleFunc("/business/{id}", businessHandler.DeleteBusiness).Methods("DELETE")

	router.HandleFunc("/inventory", inventoryHandler.AddInventoryItem).Methods("POST")
	router.HandleFunc("/inventory/{id}", inventoryHandler.GetInventoryItem).Methods("GET")
	router.HandleFunc("/inventory", inventoryHandler.GetAllInventoryItems).Methods("GET")
	router.HandleFunc("/inventory/{id}", inventoryHandler.DeleteInventoryItem).Methods("DELETE")

	// Handle preflight requests for CORS (OPTIONS requests)
	router.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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
		AllowCredentials: true, // Set to true if using cookies or authentication
	})

	// Apply CORS middleware globally to the router
	handler := c.Handler(router)

	// Get the server port from environment variable, or use a default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	// Start the server
	log.Printf("Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
