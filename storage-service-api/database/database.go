package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DatabaseInit() {
	var err error
	dsn := "host=localhost user=postgres password=root dbname=course port=5432 sslmode=disable" // Замените значения на ваши настройки PostgreSQL
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("cannot connect to database")
	}
	fmt.Println("connected to PostgreSQL database")
}
