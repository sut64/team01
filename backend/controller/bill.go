package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

func CreateBill(c *gin.Context) {

	var bill entity.Bill
	var dormatten entity.DormAtten
	var roomallocate entity.RoomAllocate
	var room entity.Room
	var repairrequest entity.RepairRequest
	var cleaningrequrest entity.Cleaningrequrest
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

	// ค้นหา room ด้วย id
	if bill.RoomID != nil {
		if tx := entity.DB().Where("id = ?", bill.RoomID).First(&room); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
			return
		}
	}

	// ค้นหา MeterRecord ด้วย id
	if bill.MeterRecordID != nil {
		if tx := entity.DB().Where("id = ?", bill.MeterRecordID).First(&meterrecord); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "meterrecord not found"})
			return
		}
	}

	// ค้นหา RepairRequest ด้วย id
	if bill.RepairRequestID != nil {
		if tx := entity.DB().Where("id = ?", bill.RepairRequestID).First(&repairrequest); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "repairrequest not found"})
			return
		}
	}

	// ค้นหา Cleaningrequrest ด้วย id
	if bill.CleaningrequrestID != nil {
		if tx := entity.DB().Where("id = ?", bill.CleaningrequrestID).First(&cleaningrequrest); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "cleaningrequrest not found"})
			return
		}
	}

	calculate := 0.00

	// เผื่อใช้ เก็บไว้ก่อน
	if bill.RoomID == nil {
		calculate = calculate + 0.00
	} else if *room.RoomtypesID == 1 || *room.RoomtypesID == 2 {
		calculate = calculate + 3500.00
	} else if *room.RoomtypesID == 3 || *room.RoomtypesID == 4 {
		calculate = calculate + 4500.00
	} else {
		calculate = calculate + 0.00
	}

	calculate = calculate + meterrecord.Sum

	if bill.RepairRequestID == nil {
		calculate = calculate + 0.00
	} else if *repairrequest.RepairTypeID == 1 {
		calculate = calculate + 250.00
	} else if *repairrequest.RepairTypeID == 2 {
		calculate = calculate + 500.00
	} else {
		calculate = calculate + 0.00
	}

	if bill.CleaningrequrestID == nil {
		calculate = calculate + 0.00
	} else if *cleaningrequrest.CleaningtypeID == 1 {
		calculate = calculate + 50.00
	} else if *cleaningrequrest.CleaningtypeID == 2 {
		calculate = calculate + 100.00
	} else if *cleaningrequrest.CleaningtypeID == 3 {
		calculate = calculate + 150.00
	} else if *cleaningrequrest.CleaningtypeID == 4 {
		calculate = calculate + 200.00
	} else if *cleaningrequrest.CleaningtypeID == 5 {
		calculate = calculate + 400.00
	} else {
		calculate = calculate + 0.00
	}

	// 12: สร้าง bill
	b := entity.Bill{
		BillDateTime:     bill.BillDateTime.Local(),
		DormAtten:        dormatten,
		RoomAllocate:     roomallocate,
		Room:             room,
		MeterRecord:      meterrecord,
		RepairRequest:    repairrequest,
		Cleaningrequrest: cleaningrequrest,
		PayByCash:        bill.PayByCash,
		AmountPaid:       calculate,
	}

	//data_out, err := json.MarshalIndent(b, "", "    ")
	//if err != nil {
	//	panic("fail")
	//}
	//fmt.Println(string(data_out))

	//แทรกการ validate PayByCash
	if b.PayByCash == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PayByCash: cannot be Null"})
		return
	}

	//แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(b); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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
func ListBills(c *gin.Context) {
	var bill []entity.Bill
	if err := entity.DB().Preload("DormAtten").Preload("MeterRecord").Preload("RepairRequest").Preload("RepairRequest.RepairType").Preload("Cleaningrequrest").Preload("Cleaningrequrest.Cleaningtype").Preload("RoomAllocate").Preload("Room").Preload("Room.Roomtypes").Raw("SELECT * FROM bills").Find(&bill).Error; err != nil {
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
	if err := entity.DB().Preload("DormAtten").Preload("MeterRecord").Preload("RepairRequest").Preload("Cleaningrequrest").Preload("RoomAllocate").Preload("Room").Raw("SELECT * FROM bills WHERE id = ?", id).Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bill})
}
