
package entity
import (
	"gorm.io/gorm"
)
type DormInventory struct {
	gorm.Model
	FurnitureName string
	Amount        uint16

	DormInventoryTypeID *uint
	DormInventoryType   DormInventoryType `gorm:"references:id"`

	RepairRequests []RepairRequest `gorm:"foreignKey:DormInventoryID"`
}
