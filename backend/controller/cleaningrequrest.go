package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /cleaningrequrest 01
func CreateCleaningrequrest(c *gin.Context) {

	var cleaningrequrest entity.Cleaningrequrest
	var roomallocate entity.RoomAllocate
	var cleaningtype entity.Cleaningtype
	var timerequrest entity.Timerequrest

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร cleaningrequrest
	if err := c.ShouldBindJSON(&cleaningrequrest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา Roomallocate ด้วย id
	if tx := entity.DB().Where("id = ?", cleaningrequrest.RoomAllocateID).First(&roomallocate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomallocate not found"})
		return
	}

	// 10: ค้นหา cleaningtype ด้วย id
	if tx := entity.DB().Where("id = ?", cleaningrequrest.CleaningtypeID).First(&cleaningtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cleaningtype record not found"})
		return
	}

	// 11: ค้นหา timerequrest ด้วย id
	if tx := entity.DB().Where("id = ?", cleaningrequrest.TimerequrestID).First(&timerequrest); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "timerequrest not found"})
		return
	}

	// 12: สร้าง cleaningrequrest
	cr := entity.Cleaningrequrest{
		RoomAllocate: roomallocate, // โยงความสัมพันธ์กับ Entity Roomallocate
		Cleaningtype: cleaningtype, // โยงความสัมพันธ์กับ Entity Cleaningtype
		Timerequrest: timerequrest, // โยงความสัมพันธ์กับ Entity Timerequrest

		Day:  cleaningrequrest.Day.Local(),
		Tel:  cleaningrequrest.Tel,
		Note: cleaningrequrest.Note,
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(cr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&cr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cr})
}

// GET /Cleaningrequrest/:id
func GetCleaningrequrest(c *gin.Context) {
	var cleaningrequrest entity.Cleaningrequrest
	id := c.Param("id")
	if err := entity.DB().Preload("RoomAllocate").Preload("Cleaningtype").Preload("Timerequrest").Raw("SELECT * FROM cleaningrequrests WHERE id = ?", id).Find(&cleaningrequrest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cleaningrequrest})
}

// GET /Cleaningrequrest
func ListCleaningrequrests(c *gin.Context) {
	var cleaningrequrests []entity.Cleaningrequrest
	if err := entity.DB().Preload("RoomAllocate").Preload("Cleaningtype").Preload("Timerequrest").Raw("SELECT * FROM cleaningrequrests").Find(&cleaningrequrests).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cleaningrequrests})
}
