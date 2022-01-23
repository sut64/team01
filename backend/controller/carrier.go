package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /users
func CreateCarrier(c *gin.Context) {
	var carrier entity.Carrier
	if err := c.ShouldBindJSON(&carrier); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&carrier).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": carrier})
}

// GET /user/:id
func GetCarrier(c *gin.Context) {
	var carrier entity.DormAtten
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM carriers WHERE id = ?", id).Scan(&carrier).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carrier})
}

// GET /users
func ListCarriers(c *gin.Context) {
	var carriers []entity.Carrier
	if err := entity.DB().Raw("SELECT * FROM carriers").Scan(&carriers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carriers})
}

// DELETE /users/:id
func DeleteCarrier(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM carriers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "carrier not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateCarrier(c *gin.Context) {
	var carrier entity.Carrier
	if err := c.ShouldBindJSON(&carrier); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", carrier.ID).First(&carrier); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "carrier not found"})
		return
	}

	if err := entity.DB().Save(&carrier).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carrier})
}
