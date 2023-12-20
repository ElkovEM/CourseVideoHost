package migration

import (
	"fmt"
	"log"
	"storage-service-api/database"
	"storage-service-api/model/entity"
)

func RunMigration() {
	err := database.DB.AutoMigrate(&entity.User{}, &entity.Item{})
	if err != nil {
		log.Println(err)
	}
	fmt.Println("Database Migrated")
}
