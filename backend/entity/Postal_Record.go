package entity

import (
	"time"

	"gorm.io/gorm"
)

type Postal_Record struct {
	gorm.Model
	Amount     uint
	RecordTime time.Time
	Tracking   string

	DormAttenID *uint
	DormAtten   DormAtten

	RoomAllocateID *uint
	RoomAllocate   RoomAllocate

	CarrierID *uint
	Carrier   Carrier

	PostalID *uint
	Postal   Postal
}
