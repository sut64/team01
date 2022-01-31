package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /postal_records
func CreatePostalRecord(c *gin.Context) {

	var postalrecord entity.Postal_Record
	var roomallocate entity.RoomAllocate
	var carrier entity.Carrier
	var dormatten entity.DormAtten
	var postal entity.Postal

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร postalrecord
	if err := c.ShouldBindJSON(&postalrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา dormatten ด้วย id
	if tx := entity.DB().Where("id = ?", postalrecord.DormAttenID).First(&dormatten); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dorm attendant not found"})
		return
	}

	// 11: ค้นหา roomallocate ด้วย id
	if tx := entity.DB().Where("id = ?", postalrecord.RoomAllocateID).First(&roomallocate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room allocate not found"})
		return
	}

	// 12: ค้นหา carrier ด้วย id
	if tx := entity.DB().Where("id = ?", postalrecord.CarrierID).First(&carrier); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "carrier not found"})
		return
	}

	// 13: ค้นหา postal ด้วย id
	if tx := entity.DB().Where("id = ?", postalrecord.PostalID).First(&postal); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "postal not found"})
		return
	}

	// 14: สร้าง Postal_Record
	pr := entity.Postal_Record{
		DormAtten:    dormatten,                       // โยงความสัมพันธ์กับ Entity DormAtten
		Carrier:      carrier,                         // โยงความสัมพันธ์กับ Entity Carrier
		Postal:       postal,                          // โยงความสัมพันธ์กับ Entity Postal
		Amount:       postalrecord.Amount,             // ตั้งค่า Amount
		Tracking:     postalrecord.Tracking,           // ตั้งค่า Tracking ID
		RecordTime:   postalrecord.RecordTime.Local(), // ตั้งค่า RecordTime
		RoomAllocate: roomallocate,                    // โยงความสัมพันธ์กับ Entity RoomAllocate
	}

	//แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 15: บันทึก
	if err := entity.DB().Create(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pr})
}

// GET /postalrecord/:id
func GetPostalRecord(c *gin.Context) {
	var postalrecord entity.Postal_Record
	id := c.Param("id")
	if err := entity.DB().Preload("RoomAllocate").Preload("Carrier").Preload("DormAtten").Preload("Postal").Raw("SELECT * FROM postal_records WHERE id = ?", id).Find(&postalrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": postalrecord})
}

// GET /postalrecords
func ListPostalRecords(c *gin.Context) {
	var postalrecord []entity.Postal_Record
	if err := entity.DB().Preload("RoomAllocate").Preload("Carrier").Preload("DormAtten").Preload("Postal").Raw("SELECT * FROM postal_records").Find(&postalrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": postalrecord})
}
