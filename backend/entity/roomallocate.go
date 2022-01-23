package entity

import (
	"time"

	"gorm.io/gorm"
)

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
}
