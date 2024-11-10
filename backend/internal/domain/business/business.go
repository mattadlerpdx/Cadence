package business

// Business represents a single business entity within the application.
type Business struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Owner       string `json:"owner"`
	ContactInfo string `json:"contact_info"` // Updated to match database and JSON payload
}
