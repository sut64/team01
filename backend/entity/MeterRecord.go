package entity

import (
	"gorm.io/gorm"
	"time"
)

type MeterRecord struct {
	gorm.Model
	Uele float64
	Uwat float64
	Sum float64
	Date time.Time
	UnitpriceID *uint
	Unitprice Unitprice
	DormAttenID *uint
	DormAtten DormAtten
	RoomAllocateID *uint
	RoomAllocate RoomAllocate

	
}
