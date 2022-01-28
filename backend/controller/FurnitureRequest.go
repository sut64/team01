package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /furniturerequests
func CreateFurnitureRequest(c *gin.Context) {
	var furniturerequest entity.FurnitureRequest
	var dormatten entity.DormAtten
	var dorminventory entity.DormInventory
	var roomallocate entity.RoomAllocate

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร furniturerequest
	if err := c.ShouldBindJSON(&furniturerequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา dormatten ด้วย id
	if tx := entity.DB().Where("id = ?", furniturerequest.DormAttenID).First(&dormatten); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dorm Attendant not found"})
		return
	}

	// ค้นหา dorminventory ด้วย id
	if tx := entity.DB().Where("id = ?", furniturerequest.DormInventoryID).First(&dorminventory); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dorm inventory not found"})
		return
	}

	// ค้นหา roomallocate ด้วย id
	if tx := entity.DB().Where("id = ?", furniturerequest.RoomAllocateID).First(&roomallocate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room Allocate not found"})
		return
	}

	// สร้าง Furniture Request
	fr := entity.FurnitureRequest{
		FurAmount:     furniturerequest.FurAmount,
		PhoneNo:       furniturerequest.PhoneNo,
		DateRequest:   furniturerequest.DateRequest,
		DormAtten:     dormatten,
		DormInventory: dorminventory,
		RoomAllocate:  roomallocate,
	}
	// 12: บันทึก
	if err := entity.DB().Create(&fr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fr})
}

// GET /furniturerequest/:id
func GetFurnitureRequest(c *gin.Context) {
	var furniturerequest entity.FurnitureRequest
	id := c.Param("id")
	if err := entity.DB().Preload("DormAtten").Preload("DormInventory").Preload("RoomAllocate").Raw("SELECT * FROM furniturerequests WHERE id = ?", id).Find(&furniturerequest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": furniturerequest})
}

// GET /furniturerequest
func ListFurnitureRequest(c *gin.Context) {
	var furniturerequest []entity.FurnitureRequest
	if err := entity.DB().Preload("DormAtten").Preload("DormInventory").Preload("RoomAllocate").Raw("SELECT * FROM furniturerequests").Find(&furniturerequest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": furniturerequest})
}

// PATCH /furniturerequest
func UpdateFurnitureRequest(c *gin.Context) {
	var furniturerequest entity.FurnitureRequest
	if err := c.ShouldBindJSON(&furniturerequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", furniturerequest.ID).First(&furniturerequest); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "furniture request record not found"})
		return
	}

	if err := entity.DB().Save(&furniturerequest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": furniturerequest})
}

// DELETE /furniturerequest/:id
func DeleteFurnitureRequest(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM furniturerequests WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "furniturerequest not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
