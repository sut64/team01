package entity

import (
	"gorm.io/gorm"
)

type Carrier struct {
	gorm.Model
	CarrierName    string
	Initials       string
	Postal_Records []Postal_Record `gorm:"foreignKey:CarrierID"`
}
