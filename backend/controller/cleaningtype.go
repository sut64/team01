package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /cleaningtype
func CreateCleaningtype(c *gin.Context) {
	var cleaningtype entity.Cleaningtype
	if err := c.ShouldBindJSON(&cleaningtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&cleaningtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cleaningtype})
}

// GET /Cleaningtype/:id
func GetCleaningtype(c *gin.Context) {
	var cleaningtype entity.Cleaningtype
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM cleaningtypes WHERE id = ?", id).Scan(&cleaningtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cleaningtype})
}

// GET /Cleaningtype
func ListCleaningtypes(c *gin.Context) {
	var cleaningtypes []entity.Cleaningtype
	if err := entity.DB().Raw("SELECT * FROM cleaningtypes").Scan(&cleaningtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cleaningtypes})
}
