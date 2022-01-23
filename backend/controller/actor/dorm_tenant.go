package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
)

// POST /dorm_tenants
func CreateDormTenant(c *gin.Context) {
	var dormtenant entity.DormTenant
	if err := c.ShouldBindJSON(&dormtenant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&dormtenant).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dormtenant})
}

// GET /dorm_tenant/:id
func GetDormTenant(c *gin.Context) {
	var dormtenant entity.DormTenant
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM dorm_tenants WHERE id = ?", id).Scan(&dormtenant).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dormtenant})
}

// GET /dorm_tenant
func ListDormTenants(c *gin.Context) {
	var dormtenants []entity.DormTenant
	if err := entity.DB().Raw("SELECT * FROM dorm_tenants").Scan(&dormtenants).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dormtenants})
}

// DELETE /dorm_tenant/:id
func DeleteDormTenant(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM dorm_tenants WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dormtenant not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /dorm_tenant
func UpdateDormTenant(c *gin.Context) {
	var dormtenant entity.DormTenant
	if err := c.ShouldBindJSON(&dormtenant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", dormtenant.ID).First(&dormtenant); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dormtenant not found"})
		return
	}

	if err := entity.DB().Save(&dormtenant).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dormtenant})
}
