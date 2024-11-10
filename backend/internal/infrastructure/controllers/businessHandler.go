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
	json.NewEncoder(w).Encode(createdBusiness)
}

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
	json.NewEncoder(w).Encode(business)
}
