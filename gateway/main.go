package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	godotenv.Load()

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	app := gin.Default()

	app.SetTrustedProxies(nil)

	app.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "X-044 ISP Running",
		})
	})

	app.Run(":" + port)
}
