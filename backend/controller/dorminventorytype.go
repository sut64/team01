package controller

import (
	"net/http"

	"github.com/sut64/team01/entity"
	"github.com/gin-gonic/gin"
)

// POST /dorm_inventory_types
func CreateDormInventoryType(c *gin.Context) {
	var dorminventorytype entity.DormInventoryType
	if err := c.ShouldBindJSON(&dorminventorytype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&dorminventorytype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dorminventorytype})
}

// GET /dorm_inventory_types/:id
func GetDormInventoryType(c *gin.Context) {
	var dorminventorytype entity.DormInventoryType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM dorm_inventory_types WHERE id = ?", id).Find(&dorminventorytype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dorminventorytype})
}

// GET /dorm_inventory_types
func ListDormInventoryType(c *gin.Context) {
	var dorminventorytype []entity.DormInventoryType
	if err := entity.DB().Raw("SELECT * FROM dorm_inventory_types").Find(&dorminventorytype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dorminventorytype})
}