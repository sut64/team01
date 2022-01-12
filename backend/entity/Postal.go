package entity

import (
	"gorm.io/gorm"
)

type Postal struct {
	gorm.Model
	Type           string
	Postal_Records []Postal_Record `gorm:"foreignKey:PostalID"`
}
