package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Bill struct {
	gorm.Model
	BillDateTime time.Time `valid:"past~BillDateTime: must be in the past"` //มีการ validation
	PayByCash    *bool     //`valid:"required~PayByCash: cannot be blank"`    //มีการ validation
	AmountPaid   float64   //`valid:"customPositiveAmountPaid"`               //มีการ validation

	DormAttenID *uint
	DormAtten   DormAtten `gorm:"references:id" valid:"-"`

	RoomAllocateID *uint
	RoomAllocate   RoomAllocate `gorm:"references:id" valid:"-"`

	RoomID *uint
	Room   Room `gorm:"references:id" valid:"-"`

	MeterRecordID *uint
	MeterRecord   MeterRecord `gorm:"references:id" valid:"-"`

	RepairRequestID *uint
	RepairRequest   RepairRequest `gorm:"references:id" valid:"-"`

	CleaningrequrestID *uint
	Cleaningrequrest   Cleaningrequrest `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("customPositiveAmountPaid", func(i interface{}, context interface{}) bool {
		return i.(float64) >= 0.00
	})

}
