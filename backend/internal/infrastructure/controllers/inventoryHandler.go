package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/mattadlerpdx/Cadence/backend/internal/domain/inventory"
)

// InventoryHandler provides HTTP handlers for managing inventory items.
type InventoryHandler struct {
	service *inventory.Service
}

// NewInventoryHandler creates a new instance of InventoryHandler.
func NewInventoryHandler(service *inventory.Service) *InventoryHandler {
	return &InventoryHandler{service: service}
}

// AddInventoryItem handles the creation of a new inventory item.
func (h *InventoryHandler) AddInventoryItem(w http.ResponseWriter, r *http.Request) {
	var item inventory.InventoryItem
	if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	createdItem, err := h.service.AddInventoryItem(item.Name, item.Stock)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(createdItem)
}

// GetInventoryItem handles retrieving an inventory item by ID.
func (h *InventoryHandler) GetInventoryItem(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid inventory ID", http.StatusBadRequest)
		return
	}

	item, err := h.service.GetInventoryItem(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if item == nil {
		http.Error(w, "Inventory item not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(item)
}

// GetAllInventoryItems handles retrieving all inventory items.
func (h *InventoryHandler) GetAllInventoryItems(w http.ResponseWriter, r *http.Request) {
	items, err := h.service.GetAllInventoryItems()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(items)
}

// DeleteInventoryItem handles deleting an inventory item by ID.
func (h *InventoryHandler) DeleteInventoryItem(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid inventory ID", http.StatusBadRequest)
		return
	}

	if err := h.service.DeleteInventoryItem(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
