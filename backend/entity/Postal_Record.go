package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Postal_Record struct {
	gorm.Model
	Amount     uint      `valid:"customPositiveNumber,required~Amount must none zero and not a negative number"`
	RecordTime time.Time `valid:"past~RecordTime must be in the past"`
	Tracking   string    `valid:"required~Tracking ID cannot be blank"`

	DormAttenID *uint
	DormAtten   DormAtten `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	RoomAllocateID *uint
	RoomAllocate   RoomAllocate `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	CarrierID *uint
	Carrier   Carrier `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation

	PostalID *uint
	Postal   Postal `gorm:"references:id" valid:"-"` // ไม่ validate ไปในระดับ relation
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
