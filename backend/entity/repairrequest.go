package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"fmt"
)

type RepairRequest struct {
	gorm.Model
	TelNumber string `valid:"matches(^[0]\\d{9}$)~Tel. Number invalid pattern"` //matches(^[0][2689]\\d{8}$) ฟิกเลขหลัง 0

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
