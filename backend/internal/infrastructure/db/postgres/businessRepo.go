package postgres

import (
	"database/sql"
	"fmt"

	"github.com/mattadlerpdx/Cadence/backend/internal/domain/business"
)

// BusinessRepository provides access to the business data stored in PostgreSQL.
type BusinessRepository struct {
	db *sql.DB
}

// NewBusinessRepository initializes a new BusinessRepository with a PostgreSQL connection.
func NewBusinessRepository(db *sql.DB) *BusinessRepository {
	return &BusinessRepository{db: db}
}

// Save inserts a new business into the database and retrieves the generated ID.
func (r *BusinessRepository) Save(b *business.Business) error {
	query := `INSERT INTO businesses (name, owner, contact_info) VALUES ($1, $2, $3) RETURNING id`
	err := r.db.QueryRow(query, b.Name, b.Owner, b.ContactInfo).Scan(&b.ID)
	if err != nil {
		return fmt.Errorf("failed to save business: %w", err)
	}
	return nil
}

// FindByID retrieves a business by its ID.
func (r *BusinessRepository) FindByID(id int) (*business.Business, error) {
	var b business.Business
	query := `SELECT id, name, owner, contact_info FROM businesses WHERE id = $1`
	err := r.db.QueryRow(query, id).Scan(&b.ID, &b.Name, &b.Owner, &b.ContactInfo)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // Not found
		}
		return nil, fmt.Errorf("failed to find business by ID: %w", err)
	}
	return &b, nil
}

// FindAll retrieves all businesses from the database.
func (r *BusinessRepository) FindAll() ([]*business.Business, error) {
	query := `SELECT id, name, owner, contact_info FROM businesses`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve all businesses: %w", err)
	}
	defer rows.Close()

	var businesses []*business.Business
	for rows.Next() {
		var b business.Business
		if err := rows.Scan(&b.ID, &b.Name, &b.Owner, &b.ContactInfo); err != nil {
			return nil, fmt.Errorf("failed to scan business row: %w", err)
		}
		businesses = append(businesses, &b)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over business rows: %w", err)
	}

	return businesses, nil
}

// Delete removes a business by its ID.
func (r *BusinessRepository) Delete(id int) error {
	query := `DELETE FROM businesses WHERE id = $1`
	_, err := r.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete business by ID: %w", err)
	}
	return nil
}

// Update modifies an existing business in the database.
func (r *BusinessRepository) Update(id int, name, owner, contactInfo string) (*business.Business, error) {
	query := `UPDATE businesses SET name = $1, owner = $2, contact_info = $3 WHERE id = $4 RETURNING id, name, owner, contact_info`
	var b business.Business
	err := r.db.QueryRow(query, name, owner, contactInfo, id).Scan(&b.ID, &b.Name, &b.Owner, &b.ContactInfo)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("business with ID %d not found", id)
		}
		return nil, fmt.Errorf("failed to update business: %w", err)
	}
	return &b, nil
}
