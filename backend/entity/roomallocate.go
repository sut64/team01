package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

//ปรับปรุงครั้งที่ 1
type RoomAllocate struct {
	gorm.Model
	EntryTime time.Time `valid:"future~EntryTime must be in the future"`                          //มีการ validation
	Note      string    `valid:"required~Note can not be blank"`                                  //มีการ validation
	People    int       `valid:"range(1|3)~People must be in 1-3,required~People must be in 1-3"` //มีการ validation

	DormAttenID *uint
	DormAtten   DormAtten `gorm:"references:id" valid:"-"`

	RoomID *uint  `gorm:"uniqueIndex"`
	Room   Room   `gorm:"references:id" valid:"-"`
	Number string //`gorm:"uniqueIndex"`

	DormTenantID         *uint
	DormTenant           DormTenant `gorm:"references:id" valid:"-"`
	DormTenant_FirstName string
	DormTenant_LastName  string

	Postal_Records   []Postal_Record    `gorm:"foreignKey:RoomAllocateID"`
	Bills            []Bill             `gorm:"foreignKey:RoomAllocateID"`
	FurnitureRequest []FurnitureRequest `gorm:"foreignKey:RoomAllocateID"`
	RepairRequest    []RepairRequest    `gorm:"foreignKey:RoomAllocateID"`
}

//ฟังก์ชันที่จะใช่ในการ validation EntryTime
func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.Before(time.Time(t))
	})
}
