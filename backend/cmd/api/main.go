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

    // Handle preflight requests for CORS (OPTIONS requests)
    router.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
    })

    // CORS configuration to allow the frontend from the Google Cloud Storage bucket
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"https://storage.googleapis.com/cadence-scm", "https://storage.googleapis.com"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Content-Type", "Authorization"},
        AllowCredentials: false, // Disable if not using cookies or authentication
    })

    // Apply the CORS middleware globally to the router
    handler := c.Handler(router)

    // Start the server on port 8080
    log.Println("Server running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", handler))
}

