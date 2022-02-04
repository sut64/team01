package entity

import (
	"gorm.io/gorm"
)

// -- ประเภททำความสะอาด ---
type Cleaningtype struct {
	gorm.Model
	Type  string
	Price float64

	Cleaningrequrests []Cleaningrequrest `gorm:"foreignKey:CleaningtypeID"`
}
