package entity

import (
	"gorm.io/gorm"
)

type DormAtten struct {
	gorm.Model
	FirstName string
	LastName  string
	Pid       string `gorm:"uniqueIndex"`
	Age       uint
	Tel       string `gorm:"uniqueIndex"`
	Gender    string
	Password  string

	Postal_Records []Postal_Record `gorm:"foreignKey:DormAttenID"`
}
