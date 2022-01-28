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

	RoleID *uint
	Role   Role

	Postal_Records []Postal_Record `gorm:"foreignKey:DormAttenID"`
	RoomAllocate   []RoomAllocate  `gorm:"foreignKey:DormAttenID"`
	Bills          []Bill          `gorm:"foreignKey:DormAttenID"`
	FurnitureRequests []FurnitureRequest `gorm:"foreignKey:DormAttenID"`
}
