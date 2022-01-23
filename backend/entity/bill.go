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

	/* รอแก้ไขๆๆๆๆ



	RoomAllocateID *uint `gorm:"uniqueIndex"`
	RoomAllocate   RoomAllocate

	MeterRecordID *uint
	MeterRecord   MeterRecord

	CleaningRequestID *uint
	CleaningRequest   CleaningRequest

	*/

	PayByCash  bool
	AmountPaid float32
}
