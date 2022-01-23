package entity

import (
	"gorm.io/gorm"
)

type DormTenant struct {
	gorm.Model

	Pid                  string `gorm:"uniqueIndex"`
	DormTenant_Firstname string
	DormTenant_LastName  string
	Email                string
	Gender               string
	Age                  uint
	Tel                  string `gorm:"uniqueIndex"`

	Record_byID *uint
	Record_by   DormAtten

	RoomAllocate []RoomAllocate `gorm:"foreignKey:DormTenantID"`
}
