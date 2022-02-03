package entity

import (
	"gorm.io/gorm"
)

type RepairType struct {
	gorm.Model
	TypeName       string
	Cost           float64
	RepairRequests []RepairRequest `gorm:"foreignKey:RepairTypeID"`
}
