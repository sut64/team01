package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Bill struct {
	gorm.Model
	DormAttenID *uint
	DormAtten   DormAtten `gorm:"references:id" valid:"-"`

	RoomAllocateID *uint
	RoomAllocate   RoomAllocate `gorm:"references:id" valid:"-"`

	RoomID *uint
	Room   Room `gorm:"references:id" valid:"-"`

	MeterRecordID *uint       `gorm:"uniqueIndex"`
	MeterRecord   MeterRecord `gorm:"references:id" valid:"-"`

	RepairRequestID *uint         `gorm:"uniqueIndex"`
	RepairRequest   RepairRequest `gorm:"references:id" valid:"-"`

	CleaningrequrestID *uint            `gorm:"uniqueIndex"`
	Cleaningrequrest   Cleaningrequrest `gorm:"references:id" valid:"-"`

	BillDateTime time.Time `valid:"past~BillDateTime: must be in the past"` //มีการ validation
	PayByCash    *bool     //มีการ validation ใน controller ไม่ได้ใช้ govalidator														//`valid:"customPayByCashMustNotNull,required~PayByCash: cannot be Null"`
	AmountPaid   float64   `valid:"customPositiveAmountPaid,required~AmountPaid: 0 does not validate as customPositiveAmountPaid"` //มีการ validation
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("customPositiveAmountPaid", func(i interface{}, context interface{}) bool {
		return i.(float64) > 0
	})

	/*govalidator.CustomTypeTagMap.Set("customPayByCashMustNotNull", func(i interface{}, context interface{}) bool {
		return i.(*bool) != nil
	})*/

}
