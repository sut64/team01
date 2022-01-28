package entity

import (
	"gorm.io/gorm"
)

type Unitprice struct {
	gorm.Model

	Unitname string
	Uperbath float64

	MeterRecord []MeterRecord `gorm:"foreignKey:UnitpriceID"`
	
	
}
