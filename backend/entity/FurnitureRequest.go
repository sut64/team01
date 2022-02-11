package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type FurnitureRequest struct {
	gorm.Model
	DormAttenID     *uint
	DormAtten       DormAtten `gorm:"references:id" valid:"-"`
	DormInventoryID *uint
	DormInventory   DormInventory `gorm:"references:id" valid:"-"`
	FurAmount       uint          `valid:"customPositiveNumber,required~Amount must not be zero or negative number"`
	RoomAllocateID  *uint
	RoomAllocate    RoomAllocate `gorm:"references:id" valid:"-"`
	PhoneNo         string       `valid:"matches(^[0]\\d{9}$)"`
	DateRequest     time.Time    `valid:"future~RequestDate must be in the future"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("customPositiveNumber", func(i interface{}, context interface{}) bool {
		return i.(uint) > 0
	})
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})
}
