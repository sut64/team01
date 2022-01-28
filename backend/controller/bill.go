package controller

import (
	"net/http"

	//"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

func CreateBill(c *gin.Context) {

	var bill entity.Bill
	var dormatten entity.DormAtten
	var roomallocate entity.RoomAllocate
	var meterrecord entity.MeterRecord

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
	// ค้นหา MeterRecord ด้วย id
	if tx := entity.DB().Where("id = ?", bill.MeterRecordID).First(&meterrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "meterrecord not found"})
		return
	}

	calculate := 0.00

	// เผื่อใช้ เก็บไว้ก่อน
	if roomallocate.Number == "A01" || roomallocate.Number == "A02" || roomallocate.Number == "A03" || roomallocate.Number == "A04" ||
		roomallocate.Number == "A05" || roomallocate.Number == "A06" || roomallocate.Number == "A07" || roomallocate.Number == "A08" ||
		roomallocate.Number == "A09" || roomallocate.Number == "A10" {
		calculate = calculate + 3500.00
	} else {
		calculate = calculate + 4500.00
	}
	calculate = calculate + meterrecord.Sum

	// 12: สร้าง bill
	b := entity.Bill{
		BillDateTime: bill.BillDateTime.Local(),
		DormAtten:    dormatten,
		RoomNumber:   roomallocate.Number,
		RoomAllocate: roomallocate,
		MeterRecord:  meterrecord,
		PayByCash:    bill.PayByCash,
		AmountPaid:   calculate,
	}

	//แทรกการ validate ไว้ช่วงนี้ของ controller
	/*
		if _, err := govalidator.ValidateStruct(bill); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	// 13: บันทึก
	if err := entity.DB().Create(&b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": b})
}

// GET /Bill
// List all Bill
func ListBills(c *gin.Context) {
	var bill []entity.Bill
	if err := entity.DB().Preload("DormAtten").Preload("MeterRecord").Preload("RoomAllocate").Preload("RoomAllocate.Room.Roomtypes").Raw("SELECT * FROM bills").Find(&bill).Error; err != nil {
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
	if err := entity.DB().Preload("DormAtten").Preload("MeterRecord").Preload("RoomAllocate").Raw("SELECT * FROM bills WHERE id = ?", id).Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bill})
}
