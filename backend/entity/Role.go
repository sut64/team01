package entity

import (
	"gorm.io/gorm"
)

type Role struct {
	gorm.Model

	rol string

	DormAtten  []DormAtten  `gorm:"foreignKey:RoleID"`
	DormTenant []DormTenant `gorm:"foreignKey:RoleID"`
}
