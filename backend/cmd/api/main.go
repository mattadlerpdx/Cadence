package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
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

    log.Println("Server running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", router))
}

