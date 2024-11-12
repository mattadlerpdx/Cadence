package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/mattadlerpdx/Cadence/backend/internal/domain/business"
)

type BusinessHandler struct {
	service *business.Service
}

func NewBusinessHandler(service *business.Service) *BusinessHandler {
	return &BusinessHandler{service: service}
}

// CreateBusiness creates a new business
func (h *BusinessHandler) CreateBusiness(w http.ResponseWriter, r *http.Request) {
	var b business.Business
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	createdBusiness, err := h.service.CreateBusiness(b.Name, b.Owner, b.ContactInfo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(createdBusiness)
}

// GetBusiness fetches a business by ID
func (h *BusinessHandler) GetBusiness(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])
	business, err := h.service.GetBusiness(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if business == nil {
		http.Error(w, "Business not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(business)
}

// UpdateBusiness updates an existing business by ID
func (h *BusinessHandler) UpdateBusiness(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])

	var b business.Business
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Call the service to update the business
	updatedBusiness, err := h.service.UpdateBusiness(id, b.Name, b.Owner, b.ContactInfo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return the updated business
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedBusiness)
}

// DeleteBusiness deletes a business by ID
func (h *BusinessHandler) DeleteBusiness(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.Atoi(vars["id"])

	// Call the service to delete the business
	err := h.service.DeleteBusiness(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return a success message (No content)
	w.WriteHeader(http.StatusNoContent)
}
