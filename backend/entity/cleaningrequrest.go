package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

// -- แจ้งทำความสะอาด --
type Cleaningrequrest struct {
	gorm.Model

	// CleaningtypeID ทำหน้าที่เป็น FK
	CleaningtypeID *uint
	Cleaningtype   Cleaningtype `gorm:"references:id" valid:"-"`

	// TimerequrestID ทำหน้าที่เป็น FK
	TimerequrestID *uint
	Timerequrest   Timerequrest `gorm:"references:id" valid:"-"`

	// RoomallocateID ทำหน้าที่เป็น FK
	RoomAllocateID *uint
	RoomAllocate   RoomAllocate `gorm:"references:id" valid:"-"`

	Note string    `valid:"required~Note can not be blank"`
	Day  time.Time `valid:"future~Day must be in the future"`
	Tel  string    `valid:"matches(^[0]\\d{9}$)~กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"`

	Bills []Bill `gorm:"foreignKey:CleaningrequrestID"`
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
