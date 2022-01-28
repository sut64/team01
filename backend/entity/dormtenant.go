package entity

import (
	"gorm.io/gorm"
)

type DormTenant struct {
	gorm.Model

	Pid                  string `gorm:"uniqueIndex"`
	DormTenant_FirstName string
	DormTenant_LastName  string
	Email                string `gorm:"uniqueIndex"`
	Gender               string
	Age                  uint
	Password             string
	Tel                  string `gorm:"uniqueIndex"`

	RoleID *uint
	Role   Role

	RepairRequests []RepairRequest `gorm:"foreignKey:DormTenantID"`
	RoomAllocate []RoomAllocate `gorm:"foreignKey:DormTenantID"`
}
