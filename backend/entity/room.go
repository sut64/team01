package entity

import (
	"gorm.io/gorm"
)

//ปรับปรุงครั้งที่ 1
type Roomtypes struct {
	gorm.Model
	Name  string
	Price int

	Rooms []Room `gorm:"foreignKey:RoomtypesID"`
}

type Room struct {
	gorm.Model
	Number string

	RoomtypesID *uint
	Roomtypes   Roomtypes

	RoomAllocate []RoomAllocate `gorm:"foreignKey:RoomID"`
}
