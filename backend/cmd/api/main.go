package main

import (
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/mattadlerpdx/Cadence/backend/internal/inventory"
	"github.com/mattadlerpdx/Cadence/backend/internal/user"
)

func main() {
	router := mux.NewRouter()

	// Inventory routes
	inventoryService := inventory.NewService()
	router.HandleFunc("/inventory", inventoryService.GetItems).Methods("GET")

	// User routes
	userService := user.NewService()
	router.HandleFunc("/users", userService.GetUser).Methods("GET")

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://storage.googleapis.com"}, 
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Apply CORS middleware globally
	handler := c.Handler(router)

	log.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

