package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /users
func CreatePostal(c *gin.Context) {
	var postal entity.Postal
	if err := c.ShouldBindJSON(&postal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&postal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": postal})
}

// GET /user/:id
func GetPostal(c *gin.Context) {
	var postal entity.Postal
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM postals WHERE id = ?", id).Scan(&postal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": postal})
}

// GET /users
func ListPostals(c *gin.Context) {
	var postals []entity.Postal
	if err := entity.DB().Raw("SELECT * FROM postals").Scan(&postals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": postals})
}
