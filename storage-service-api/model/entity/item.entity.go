package entity

import "time"

type Item struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name"`
	Item      string    `json:"item"`
	CreatedAt time.Time `json:"uploaded_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Owner     string    `json:"owner"`
	Url       string    `json:"url"`
}
