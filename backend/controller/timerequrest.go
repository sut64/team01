package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /timerequrest
func CreatePTimerequrest(c *gin.Context) {
	var timerequrest entity.Timerequrest
	if err := c.ShouldBindJSON(&timerequrest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&timerequrest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timerequrest})
}

// GET /Timerequrest/:id
func GetTimerequrest(c *gin.Context) {
	var timerequrest entity.Timerequrest
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM timerequrests WHERE id = ?", id).Scan(&timerequrest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": timerequrest})
}

// GET /Timerequrests
func ListTimerequrests(c *gin.Context) {
	var timerequrests []entity.Timerequrest
	if err := entity.DB().Raw("SELECT * FROM timerequrests").Scan(&timerequrests).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": timerequrests})
}
