package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Bill struct {
	gorm.Model
	BillDateTime time.Time //`valid:"past~BillDateTime: does not validate as past"`

	DormAttenID *uint
	DormAtten   DormAtten `gorm:"references:id" valid:"-"`

	RoomAllocateID *uint
	RoomNumber     string       //`gorm:"uniqueIndex"`
	RoomAllocate   RoomAllocate `gorm:"references:id" valid:"-"`

	/* รอแก้ไขๆๆๆๆ
	MeterRecordID *uint
	MeterRecord   MeterRecord
	*/

	CleaningrequrestID *uint
	Cleaningrequrest   Cleaningrequrest //`gorm:"uniqueIndex"`

	PayByCash  *bool
	AmountPaid float64 //`valid:"customPositiveAmount,required~Amount: non zero vaue required"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("customPositiveAmount", func(i interface{}, context interface{}) bool {
		return i.(float64) > 0
	})

}
