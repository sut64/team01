package entity

import (
	"time"

	"gorm.io/gorm"
)

type MeterRecord struct {
	gorm.Model
	Uele           float64
	Uwat           float64
	Sum            float64
	Date           time.Time
	UnitpriceID    *uint
	Unitprice      Unitprice
	DormAttenID    *uint
	DormAtten      DormAtten
	RoomAllocateID *uint
	RoomAllocate   RoomAllocate

	Bills []Bill `gorm:"foreignKey:MeterRecordID"` //update
}
