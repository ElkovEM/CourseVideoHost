package route

import (
	"storage-service-api/controller"
	"storage-service-api/middleware"
	"storage-service-api/utils"

	"github.com/gofiber/fiber/v2"
)

func RouteInit(r *fiber.App) {
	// LOGIN
	r.Post("/login", controller.LoginController)

	// UPLOAD
	r.Post("/upload", utils.HandleSingleFile, controller.ItemControllerCreate)

	// FILE LIST
	r.Get("/items", controller.ItemControllerGetAll)
	r.Get("/items/:id", controller.ItemControllerGetByID)

	// All USER
	r.Get("/users", middleware.Auth, controller.UserControllerGetAll)

	r.Static("/public", "./public/files/")
}
