package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /unitprices
func CreateUnitprice(c *gin.Context) {
	var unitprice entity.Unitprice
	if err := c.ShouldBindJSON(&unitprice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&unitprice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": unitprice})
}

// GET /unitprice/:id
func GetUnitprice(c *gin.Context) {
	var unitprice entity.Unitprice
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM unitprice WHERE id = ?", id).Scan(&unitprice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": unitprice})
}
