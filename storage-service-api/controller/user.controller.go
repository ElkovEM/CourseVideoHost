package controller

import (
	"log"
	"storage-service-api/database"
	"storage-service-api/model/entity"

	"github.com/gofiber/fiber/v2"
)

func UserControllerGetAll(c *fiber.Ctx) error {
	var users []entity.User
	result := database.DB.Find(&users)
	if result.Error != nil {
		log.Println(result.Error)
	}

	return c.JSON(users)
}
