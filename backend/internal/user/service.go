package user

import (
    "net/http"
    "encoding/json"
)

type Service struct {}

func NewService() *Service {
    return &Service{}
}

type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

func (s *Service) GetUser(w http.ResponseWriter, r *http.Request) {
    user := User{ID: 1, Name: "John Doe"}

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

