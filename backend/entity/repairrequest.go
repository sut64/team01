package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"fmt"
)

/*type DormTenant struct {
	gorm.Model
	FirstName      string
	LastName       string
	Pid            string
	Gender         string
	Age            uint8
	Email          string
	Tel            string
	RoomAllocates  []RoomAllocate  `gorm:"foreignKey:DormTenantID"`

}*/

/*type DormInventory struct {
	gorm.Model
	FurnitureName string
	Amount        uint16

	DormInventoryTypeID *uint
	DormInventoryType   DormInventoryType `gorm:"references:id"`

	RepairRequests []RepairRequest `gorm:"foreignKey:DormInventoryID"`
}
*/
/* type RoomAllocate struct {
	gorm.Model
	FirstName      string
	LastName       string
	Number         string
	People         int
	Note           string
	EntryTime      time.Time
	RepairRequests []RepairRequest `gorm:"foreignKey:RoomAllocateID"`

	DormTenantID *uint
	DormTenant   DormTenant `gorm:"references:id"`
} */

type RepairRequest struct {
	gorm.Model
	TelNumber string `valid:"matches(^[0]\\d{9}$)"`

	RecordDate      time.Time `valid:"-"`
	EntryPermission *bool       //มีการ validation ใน controller ไม่ได้ใช้ govalidator
	RequestDate     time.Time `valid:"future~RequestDate Must be in the future" `
	ProblemNote     string      `valid:"required~ProblemNote can not be blank"`                                  

	RoomAllocateID *uint
	RoomAllocate   RoomAllocate `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	DormTenantID *uint
	DormTenant   DormTenant `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	DormInventoryID *uint
	DormInventory   DormInventory `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	RepairTypeID *uint
	RepairType   RepairType `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	Bills []Bill `gorm:"foreignKey:RepairRequestID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

}

func BooleanNotNull(t *bool) (bool, error) {
	if t == nil {
		return false, fmt.Errorf("EntryPermission cannot be blank and please choose one")
	} else {
		return true, nil
	}
}
