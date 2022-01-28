package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /meterrecord
func CreateMeterRecord(c *gin.Context) {

	var meterrecord entity.MeterRecord
	var roomallocate entity.RoomAllocate
	var dormatten entity.DormAtten
	var unitprice entity.Unitprice
	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร meterrecord
	if err := c.ShouldBindJSON(&meterrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา roomallocate ด้วย id
	if tx := entity.DB().Where("id = ?", meterrecord.RoomAllocateID).First(&roomallocate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomallocate not found"})
		return
	}

	// 10: ค้นหา unitprice ด้วย id
	if tx := entity.DB().Where("id = ?", meterrecord.UnitpriceID).First(&unitprice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "carrier record not found"})
		return
	}

	// 11: ค้นหา dormatten ด้วย id
	if tx := entity.DB().Where("id = ?", meterrecord.DormAttenID).First(&dormatten); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dorm atten not found"})
		return
	}

	// 12: สร้าง Meterrecord
	pr := entity.MeterRecord{
		Uele:         meterrecord.Uele,
		Uwat:         meterrecord.Uwat,
		Sum:          meterrecord.Sum,
		Unitprice:    unitprice,
		DormAtten:    dormatten,
		RoomAllocate: roomallocate,
		Date:         meterrecord.Date,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pr})
}

// GET /meterrecord/:id
func GetMeterRecord(c *gin.Context) {
	var meterrecord entity.MeterRecord
	id := c.Param("id")
	if err := entity.DB().Preload("Unitprice").Preload("RoomAllocate").Preload("DormAtten"). /*.Preload("MeterRecord")*/ Raw("SELECT * FROM meter_records WHERE id = ?", id).Find(&meterrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": meterrecord})
}

// GET /meterrecords
func ListMeterRecords(c *gin.Context) {
	var meterrecord []entity.MeterRecord
	if err := entity.DB().Preload("Unitprice").Preload("RoomAllocate").Preload("DormAtten"). /*.Preload("MeterRecord")*/ Raw("SELECT * FROM meter_records").Find(&meterrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//update
	c.JSON(http.StatusOK, gin.H{"data": meterrecord})
}
