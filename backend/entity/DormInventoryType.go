package entity

import (
	"gorm.io/gorm"
)

type DormInventoryType struct {
	gorm.Model
	InvenType     string
	DormInventorys []DormInventory `gorm:"foreignKey:DormInventoryTypeID"`
}