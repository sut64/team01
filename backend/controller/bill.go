package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

func CreateBill(c *gin.Context) {

	var bill entity.Bill
	var dormatten entity.DormAtten
	var roomallocate entity.RoomAllocate
	/*
		var meterrecord entity.MeterRecord
		var cleaningrequest entity.CleaningRequest
	*/

	// ผลลัพธ์จะถูก bind เข้าตัวแปร bill
	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา DormAtten ด้วย id
	if tx := entity.DB().Where("id = ?", bill.DormAttenID).First(&dormatten); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dorm atten not found"})
		return
	}

	// ค้นหา RoomAllocate ด้วย id
	if tx := entity.DB().Where("id = ?", bill.RoomAllocateID).First(&roomallocate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomallocate not found"})
		return
	}

	/*
		// ค้นหา MeterRecord ด้วย id
		if tx := entity.DB().Where("id = ?", bill.MeterRecordID).First(&meterrecord); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "roomallocate not found"})
			return
		}

		// ค้นหา CleaningRequest ด้วย id
		if tx := entity.DB().Where("id = ?", bill.CleaningRequestID).First(&cleaningrequest); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "roomallocate not found"})
			return
		}
	*/

	calculate := 0.00
	//calculate = RoomAllocate.Room.RoomType.Cost + MeterRecord.Cost + CleaningRequest.Cost รอแก้ไขๆๆๆๆๆๆ

	/* เผื่อใช้ เก็บไว้ก่อน
	if RightTreatment.RightTreatmentName == "บัตร30" {
		calculate = 30
	} else if TreatmentRecord.Cost > (-RightTreatment.Price) {
		calculate = TreatmentRecord.Cost + RightTreatment.Price
	} else {
		calculate = 0
	}
	*/

	// 12: สร้าง bill
	b := entity.Bill{
		BillDateTime: bill.BillDateTime.Local(),
		DormAtten:    dormatten,
		RoomNumber:   roomallocate.Number,
		RoomPrice:    roomallocate.Room.Roomtypes.Price,
		//MeterRecord:     meterrecord,
		//CleaningRequest: cleaningrequest,
		PayByCash:  bill.PayByCash,
		AmountPaid: calculate,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": b})
}

// GET /Bill
// List all Bill
func ListBill(c *gin.Context) {
	var bill []entity.Bill
	if err := entity.DB().Preload("DormAtten").Preload("CleaningRequest").Preload("MeterRecord").Preload("RoomAllocate").Preload("RoomAllocate.Room.RoomType").Raw("SELECT * FROM bills").Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}

// GET /Bill/:id
// Get Bill by id
func GetBill(c *gin.Context) {
	var bill entity.Bill
	id := c.Param("id")
	if err := entity.DB().Preload("DormAtten").Preload("CleaningRequest").Preload("MeterRecord").Preload("RoomAllocate").Raw("SELECT * FROM bills WHERE id = ?", id).Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bill})
}
