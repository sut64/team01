package entity

import (
	"gorm.io/gorm"
)

type RepairType struct {
	gorm.Model
	TypeName       string
	Cost           int
	RepairRequests []RepairRequest `gorm:"foreignKey:RepairTypeID"`
}
