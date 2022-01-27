package controller

import (
	"net/http"

	"github.com/sut64/team01/entity"
	"github.com/gin-gonic/gin"
)

// POST /repair_types
func CreateRepairtype(c *gin.Context) {
	var repairtype entity.RepairType
	if err := c.ShouldBindJSON(&repairtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&repairtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repairtype})
}

// GET /repair_types/:id
func GetRepairtype(c *gin.Context) {
	var repairtype entity.RepairType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM repair_types WHERE id = ?", id).Scan(&repairtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairtype})
}

// GET /repair_types
func ListRepairtype(c *gin.Context) {
	var repairtype []entity.RepairType
	if err := entity.DB().Raw("SELECT * FROM repair_types").Scan(&repairtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairtype})
}