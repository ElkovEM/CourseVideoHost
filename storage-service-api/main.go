package main

import (
	"storage-service-api/database"
	"storage-service-api/database/migration"
	"storage-service-api/route"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.DatabaseInit()
	migration.RunMigration()

	app := fiber.New()

	// Middleware для обработки CORS
	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "*")                                // Установка заголовка Access-Control-Allow-Origin
		c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") // Установка разрешенных методов
		c.Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")    // Установка разрешенных заголовков
		if c.Method() == "OPTIONS" {
			c.Status(fiber.StatusNoContent) // Если метод - OPTIONS, возвращаем статус No Content
			return nil
		}
		return c.Next()
	})

	route.RouteInit(app)

	app.Listen(":8000")
}
