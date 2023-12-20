package utils

import (
	"errors"
	"fmt"
	"log"
	"mime/multipart"

	"github.com/gofiber/fiber/v2"
)

func HandleSingleFile(c *fiber.Ctx) error {

	file, errFile := c.FormFile("item")
	if errFile != nil {
		log.Println("Error File = ", errFile)
	}

	var filename *string

	if file != nil {
		errCheckContentType := checkContentType(
			file,
			"image/jpg",
			"image/png",
			"image/gif",
			"image/jpeg",
			"image/tiff",
			"image/vnd.microsoft.icon",
			"image/x-icon",
			"image/vnd.djvu",
			"image/svg+xml",
			"video/mpeg",
			"video/mp4",
			"video/quicktime",
			"video/x-ms-wmv",
			"video/x-msvideo",
			"video/x-flv",
			"video/webm",
		)

		if errCheckContentType != nil {
			return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
				"message": errCheckContentType.Error,
			})
		}

		filename = &file.Filename
		errSaveFile := c.SaveFile(file, fmt.Sprintf("./public/files/%s", *filename))
		if errSaveFile != nil {
			log.Println("Failed to upload file")
		}
	} else {
		log.Println("Please select file to upload")
	}

	if filename != nil {
		c.Locals("filename", *filename)
	} else {
		c.Locals("filename", nil)
	}

	return c.Next()
}

func checkContentType(file *multipart.FileHeader, contentTypes ...string) error {
	if len(contentTypes) > 0 {
		for _, contentType := range contentTypes {
			contentTypeFile := file.Header.Get("Content-Type")
			if contentTypeFile == contentType {
				return nil
			}
		}

		return errors.New("not allowed file type")
	} else {
		return errors.New("Content Type not found")
	}
}
