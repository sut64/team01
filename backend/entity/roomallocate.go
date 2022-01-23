package entity

import (
	"time"

	"gorm.io/gorm"
)

//ปรับปรุงครั้งที่ 1
type RoomAllocate struct {
	gorm.Model
	EntryTime time.Time

	DormAttenID *uint
	DormAtten   DormAtten

	RoomID *uint
	Room   Room
	Number string

	DormTenantID         *uint
	DormTenant           DormTenant
	DormTenant_FirstName string
	DormTenant_LastName  string

	Postal_Records []Postal_Record `gorm:"foreignKey:RoomAllocateID"`
	Bills          []Bill          `gorm:"foreignKey:RoomAllocateID"`
}
