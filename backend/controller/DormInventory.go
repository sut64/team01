package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /dorminventory
func CreateDormInventory(c *gin.Context) {
	var dorminventory entity.DormInventory
	if err := c.ShouldBindJSON(&dorminventory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&dorminventory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dorminventory})
}

// GET /dorminventory/:id
func GetDormInventory(c *gin.Context) {
	var dorminventory entity.DormInventory
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM dorminventories WHERE id = ?", id).Scan(&dorminventory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dorminventory})
}

// GET /dorminventories
func ListDormInventory(c *gin.Context) {
	var dorminventory []entity.DormInventory
	if err := entity.DB().Raw("SELECT * FROM dorminventories").Scan(&dorminventory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dorminventory})
}
