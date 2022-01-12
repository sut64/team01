package entity

import (
	"gorm.io/gorm"
)

type DormAtten struct {
	gorm.Model
	FirstName string
	LastName  string
	Pid       string
	Age       uint8
	Tel       string
	Gender    string
	Password  string

	Postal_Records []Postal_Record `gorm:"foreignKey:DormAttenID"`
}
