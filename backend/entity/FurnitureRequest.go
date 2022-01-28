package entity

import (
	"time"

	"gorm.io/gorm"
)

type FurnitureRequest struct {
	gorm.Model
	DormAttenID     *uint
	DormAtten       DormAtten `gorm:"references:id"`
	DormInventoryID *uint
	DormInventory   DormInventory `gorm:"references:id"`
	FurAmount       uint
	RoomAllocateID  *uint
	RoomAllocate    RoomAllocate `gorm:"references:id"`
	PhoneNo         string		`valid:"matches(^[0]\\d{9}$)"`
	DateRequest     time.Time
}
