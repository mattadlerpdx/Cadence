package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/mattadlerpdx/Cadence/backend/internal/inventory"
	"github.com/mattadlerpdx/Cadence/backend/internal/user"
	"github.com/rs/cors"
)

func main() {
	// Load environment variables from .env file for local development
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Println("No .env file found in backend directory, proceeding with system environment variables")
	}

	// Set up the router
	router := mux.NewRouter()

	// Inventory routes
	inventoryService := inventory.NewService()
	router.HandleFunc("/inventory", inventoryService.GetItems).Methods("GET")

	// User routes
	userService := user.NewService()
	router.HandleFunc("/users", userService.GetUser).Methods("GET")

	// Handle preflight requests for CORS (OPTIONS requests)
	router.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	// Get the allowed origins from the environment variable
	allowedOriginsEnv := os.Getenv("ALLOWED_ORIGINS")
	if allowedOriginsEnv == "" {
		log.Println("Warning: ALLOWED_ORIGINS not set. Defaulting to localhost.")
		allowedOriginsEnv = "http://localhost:3000"
	}
	allowedOrigins := strings.Split(allowedOriginsEnv, ",")

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: false, // Set to true if using cookies or authentication
	})

	// Apply the CORS middleware globally to the router
	handler := c.Handler(router)

	// Get the port from the environment, or use a default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	// Start the server
	log.Printf("Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
