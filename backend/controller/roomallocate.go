package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /rooms
func CreateRoomAllocate(c *gin.Context) {

	var roomallocate entity.RoomAllocate
	var dormtenant entity.DormTenant
	var room entity.Room
	//var roomtypes entity.Roomtypes
	var dormatten entity.DormAtten

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร RoomAllocate
	if err := c.ShouldBindJSON(&roomallocate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา DormTenant ด้วย id
	if tx := entity.DB().Where("id = ?", roomallocate.DormTenantID).First(&dormtenant); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dormtenant not found"})
		return
	}

	// ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", roomallocate.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// ค้นหา DormAtten ด้วย id
	if tx := entity.DB().Where("id = ?", roomallocate.DormAttenID).First(&dormatten); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dormatten not found"})
		return
	}

	// สร้าง RoomAllocate
	ad := entity.RoomAllocate{
		DormAtten:  dormatten,           // โยงความสัมพันธ์กับ Entity DormAtten
		Room:       room,                // โยงความสัมพันธ์กับ Entity Room
		DormTenant: dormtenant,          // โยงความสัมพันธ์กับ Entity DormTenant
		People:     roomallocate.People, //มีการ validation
		Note:       roomallocate.Note,   //มีการ validation

		DormTenant_FirstName: dormtenant.DormTenant_FirstName,
		DormTenant_LastName:  dormtenant.DormTenant_LastName,
		EntryTime:            roomallocate.EntryTime, // ตั้งค่าฟิลด์ EntryTime //มีการ validation
	}

	//มีการใช้ validation
	if _, err := govalidator.ValidateStruct(ad); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึก
	if err := entity.DB().Create(&ad).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ad})
}

// GET /RoomAllocate
func ListRoomAllocate(c *gin.Context) {
	var roomallocate []entity.RoomAllocate
	if err := entity.DB().Preload("Room").Preload("Room.Roomtypes").Preload("DormTenant").Preload("DormAtten").Raw("SELECT * FROM room_allocates").Find(&roomallocate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": roomallocate})
}

// GET /roomallocate/:id
func GetRoomAllocate(c *gin.Context) {
	var roomallocate entity.RoomAllocate
	id := c.Param("id")
	if err := entity.DB().Preload("Room").Preload("Room.Roomtypes").Preload("DormTenant").Preload("DormAtten").Raw("SELECT * FROM room_allocates WHERE id = ?", id).Find(&roomallocate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomallocate})
}
