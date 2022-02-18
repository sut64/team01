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
	FurAmount       uint          `valid:"customPositiveNumber,required~จำนวนที่กรอกต้องเป็นจำนวนเต็มบวกและไม่เป็น0เท่านั้น"`
	RoomAllocateID  *uint
	RoomAllocate    RoomAllocate `gorm:"references:id" valid:"-"`
	PhoneNo         string       `valid:"matches(^[0]\\d{9}$)~กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"`
	DateRequest     time.Time    `valid:"future~วันเวลาที่ระบุต้องเป็นอนาคต"`
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
