package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /rooms
func CreateRoomAllocate(c *gin.Context) {
	var roomallocate entity.RoomAllocate
	if err := c.ShouldBindJSON(&roomallocate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&roomallocate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomallocate})
}

// GET /user/:id
func GetRoomAllocate(c *gin.Context) {
	var roomallocate entity.RoomAllocate
	id := c.Param("id")
	if err := entity.DB().Preload("Room").Preload("DormTenant").Raw("SELECT * FROM room_allocates WHERE id = ?", id).Find(&roomallocate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomallocate})
}

// GET /users
func ListRoomAllocates(c *gin.Context) {
	var roomallocate []entity.RoomAllocate
	if err := entity.DB().Preload("Room").Preload("DormTenant").Raw("SELECT * FROM room_allocates").Find(&roomallocate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": roomallocate})
}
