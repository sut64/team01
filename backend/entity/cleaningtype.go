package entity

import (
	"gorm.io/gorm"
)

// -- ประเภททำความสะอาด --
type Cleaningtype struct {
	gorm.Model
	Type  string
	Price float32

	Cleaningrequrests []Cleaningrequrest `gorm:"foreignKey:CleaningtypeID"`
}
