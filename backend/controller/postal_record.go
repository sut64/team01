package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /medication_records
func CreatePostalRecord(c *gin.Context) {

	var postalrecord entity.Postal_Record
	var roomallocate entity.RoomAllocate
	var carrier entity.Carrier
	var dormatten entity.DormAtten
	var postal entity.Postal

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร medicationrecord
	if err := c.ShouldBindJSON(&postalrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา pharmacist ด้วย id
	if tx := entity.DB().Where("id = ?", postalrecord.RoomAllocateID).First(&roomallocate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomallocate not found"})
		return
	}

	// 10: ค้นหา treatmentrecord ด้วย id
	if tx := entity.DB().Where("id = ?", postalrecord.CarrierID).First(&carrier); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "carrier record not found"})
		return
	}

	// 11: ค้นหา medicine ด้วย id
	if tx := entity.DB().Where("id = ?", postalrecord.DormAttenID).First(&dormatten); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dorm atten not found"})
		return
	}

	// 12: ค้นหา medicine ด้วย id
	if tx := entity.DB().Where("id = ?", postalrecord.PostalID).First(&postal); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "postal not found"})
		return
	}

	// 12: สร้าง MedicationRecord
	pr := entity.Postal_Record{
		DormAtten: dormatten, // โยงความสัมพันธ์กับ Entity Pharmacist
		Carrier:   carrier,   // โยงความสัมพันธ์กับ Entity Medicine
		//DormTenant:   dormtenant, // โยงความสัมพันธ์กับ Entity TreatmentRecord
		Postal:       postal,
		Amount:       postalrecord.Amount, // ตั้งค่า Amount
		Tracking:     postalrecord.Tracking,
		RecordTime:   postalrecord.RecordTime.Local(), // ตั้งค่า RecordTime
		RoomAllocate: roomallocate,
	}

	//แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(postalrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pr})
}

// GET /medication_record/:id
func GetPostalRecord(c *gin.Context) {
	var postalrecord entity.Postal_Record
	id := c.Param("id")
	if err := entity.DB().Preload("RoomAllocate").Preload("Carrier").Preload("DormAtten").Preload("Postal").Raw("SELECT * FROM postal_records WHERE id = ?", id).Find(&postalrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": postalrecord})
}

// GET /medication_records
func ListPostalRecords(c *gin.Context) {
	var postalrecord []entity.Postal_Record
	if err := entity.DB().Preload("RoomAllocate").Preload("Carrier").Preload("DormAtten").Preload("Postal").Raw("SELECT * FROM postal_records").Find(&postalrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": postalrecord})
}
