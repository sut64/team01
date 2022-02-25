package controller

import (

	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /RepairRequest
func CreateRepairRequest(c *gin.Context) {

	var repairrequest entity.RepairRequest
	var dormtenant entity.DormTenant
	var repairtype entity.RepairType
	var dorminventory entity.DormInventory
	var roomallocate entity.RoomAllocate

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร RepairRequest
	if err := c.ShouldBindJSON(&repairrequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// ค้นหา dormtenant ด้วย id
	if tx := entity.DB().Where("id = ?", repairrequest.DormTenantID).First(&dormtenant); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dorm tenant not found"})
		return
	}
	// ค้นหา roomallocate ด้วย id
	if tx := entity.DB().Where("id = ?", repairrequest.RoomAllocateID).First(&roomallocate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomallrocate not found"})
		return
	}

	// ค้นหา dorminventory ด้วย id
	if tx := entity.DB().Where("id = ?", repairrequest.DormInventoryID).First(&dorminventory); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dorminventory not found"})
		return
	}

	// ค้นหา repairtype ด้วย id
	if tx := entity.DB().Where("id = ?", repairrequest.RepairTypeID).First(&repairtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repairtype not found"})
			return
		}
	// สร้าง repairrequest
	ad := entity.RepairRequest{
	
		RoomAllocate: roomallocate ,       // โยงความสัมพันธ์กับ Entity roomallocate
		DormTenant: dormtenant, // โยงความสัมพันธ์กับ Entity DormTenant
		DormInventory: dorminventory, // โยงความสัมพันธ์กับ Entity dorminventory
		RepairType: repairtype, // โยงความสัมพันธ์กับ Entity repairtype

		ProblemNote: repairrequest.ProblemNote,
		RecordDate: repairrequest.RecordDate.Local(),
		RequestDate: repairrequest.RequestDate.Local(),
		EntryPermission: repairrequest.EntryPermission,
		TelNumber: repairrequest.TelNumber,	
	}

	//Validaition 
	if _, err := govalidator.ValidateStruct(ad); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := entity.BooleanNotNull(ad.EntryPermission); err != nil {
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

// GET /repair_requests/:id
func GetRepairRequest(c *gin.Context) {
	var repairrequest entity.RepairRequest
	id := c.Param("id")
	if err := entity.DB().Preload("RoomAllocate").Preload("DormTenant").Preload("DormInventory").Preload("RepairType").Raw("SELECT * FROM repair_requests WHERE id = ?", id).Find(&repairrequest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repairrequest})
}

// GET /repair_requests
func ListRepairRequest(c *gin.Context) {
	var repairrequest []entity.RepairRequest
	if err := entity.DB().Preload("RoomAllocate").Preload("DormTenant").Preload("DormInventory").Preload("DormInventory.DormInventoryType").Preload("RepairType").Raw("SELECT * FROM repair_requests").Find(&repairrequest).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairrequest})
}

