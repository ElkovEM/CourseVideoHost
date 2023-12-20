package controller

import (
	"log"
	"storage-service-api/database"
	"storage-service-api/model/entity"
	"storage-service-api/model/request"
	"storage-service-api/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func LoginController(c *fiber.Ctx) error {
	loginRequest := new(request.LoginRequest)
	if err := c.BodyParser(loginRequest); err != nil {
		return err
	}
	log.Println(loginRequest)

	validate := validator.New()
	errValidate := validate.Struct(loginRequest)
	if errValidate != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "failed",
			"error":   errValidate.Error(),
		})
	}

	var user entity.User
	err := database.DB.Where("username = ? AND password = ?", loginRequest.Username, loginRequest.Password).First(&user).Error
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "wrong credential",
		})
	}

	claims := jwt.MapClaims{}
	claims["username"] = user.Username
	claims["password"] = user.Password
	claims["role"] = user.Role

	token, errGenerateToken := utils.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "wrong credential",
		})
	}

	return c.JSON(fiber.Map{
		"token": token,
	})
}
