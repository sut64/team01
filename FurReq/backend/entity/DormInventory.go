package entity

import (
	"gorm.io/gorm"
)

type DormInventory struct {
	gorm.Model
	FurnitureName string
	Amount        int

	FurnitureRequests []FurnitureRequest `gorm:"foreignKey:DormInventoryID"`
}
