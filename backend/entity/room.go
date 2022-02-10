package entity

import (
	"gorm.io/gorm"
)

//ปรับปรุงครั้งที่ 1
//ปรับปรุงครั้งที่ 2 Roomtypes อยู่ใน Room
type Roomtypes struct {
	gorm.Model
	Name  string
	Price float64

	Rooms []Room `gorm:"foreignKey:RoomtypesID"`
}

type Room struct {
	gorm.Model
	Number string

	RoomtypesID *uint
	Roomtypes   Roomtypes

	RoomAllocate []RoomAllocate `gorm:"foreignKey:RoomID"`
	Bills        []Bill         `gorm:"foreignKey:RoomID"`
}
