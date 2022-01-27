package entity

import (
	"gorm.io/gorm"
)

// -- ช่วงเวลาทำความสะอาด --
type Timerequrest struct {
	gorm.Model
	Period string

	Cleaningrequrests []Cleaningrequrest `gorm:"foreignKey:TimerequrestID"`
}
