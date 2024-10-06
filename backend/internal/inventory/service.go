package inventory

import (
    "net/http"
    "encoding/json"
)

type Service struct {}

func NewService() *Service {
    return &Service{}
}

type Item struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
    Qty  int    `json:"quantity"`
}

func (s *Service) GetItems(w http.ResponseWriter, r *http.Request) {
    items := []Item{
        {ID: 1, Name: "Item 1", Qty: 100},
        {ID: 2, Name: "Item 2", Qty: 200},
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(items)
}

