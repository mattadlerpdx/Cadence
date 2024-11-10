package postgres

import (
	"database/sql"

	"github.com/mattadlerpdx/Cadence/backend/internal/domain/inventory"
)

type InventoryRepository struct {
	db *sql.DB
}

func NewInventoryRepository(db *sql.DB) *InventoryRepository {
	return &InventoryRepository{db: db}
}

func (r *InventoryRepository) Save(item *inventory.InventoryItem) error {
	query := "INSERT INTO inventory (name, stock) VALUES ($1, $2)"
	_, err := r.db.Exec(query, item.Name, item.Stock)
	return err
}

func (r *InventoryRepository) FindByID(id int) (*inventory.InventoryItem, error) {
	var item inventory.InventoryItem
	query := "SELECT id, name, stock FROM inventory WHERE id = $1"
	err := r.db.QueryRow(query, id).Scan(&item.ID, &item.Name, &item.Stock)
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *InventoryRepository) FindAll() ([]*inventory.InventoryItem, error) {
	query := "SELECT id, name, stock FROM inventory"
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []*inventory.InventoryItem
	for rows.Next() {
		var item inventory.InventoryItem
		if err := rows.Scan(&item.ID, &item.Name, &item.Stock); err != nil {
			return nil, err
		}
		items = append(items, &item)
	}
	return items, nil
}

func (r *InventoryRepository) Delete(id int) error {
	query := "DELETE FROM inventory WHERE id = $1"
	_, err := r.db.Exec(query, id)
	return err
}
