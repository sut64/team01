package entity

import (
	"time"


	"gorm.io/gorm"
)

// -- แจ้งทำความสะอาด --
type Cleaningrequrest struct {
	gorm.Model

	// CleaningtypeID ทำหน้าที่เป็น FK
	CleaningtypeID *uint
	Cleaningtype   Cleaningtype `gorm:"references:id"`

	// TimerequrestID ทำหน้าที่เป็น FK
	TimerequrestID *uint
	Timerequrest   Timerequrest `gorm:"references:id"`

	// RoomallocateID ทำหน้าที่เป็น FK
	RoomAllocateID *uint
	RoomAllocate   RoomAllocate `gorm:"references:id"`

	Day   time.Time 
	Tel   string    
	Note  string  
}
