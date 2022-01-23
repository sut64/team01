package entity

import (
	"time"

	"gorm.io/gorm"
)

type Bill struct {
	gorm.Model
	BillDateTime time.Time

	DormAttenID *uint
	DormAtten   DormAtten

	RoomAllocateID *uint `gorm:"uniqueIndex"`
	RoomAllocate   RoomAllocate

	/* รอแก้ไขๆๆๆๆ



	MeterRecordID *uint
	MeterRecord   MeterRecord

	CleaningRequestID *uint
	CleaningRequest   CleaningRequest

	*/

	PayByCash  bool
	AmountPaid float64
}
