package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
	"github.com/sut64/team01/service"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginDormTenantPayload struct {
	Pid      string `json:"pid"`
	Password string `json:"password"`
}

// LoginResponse token response
type LoginDormTenantResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Role  string `json:"role"`
}

// POST /login
func LoginDormTenant(c *gin.Context) {
	var payload LoginDormTenantPayload
	var dorm_tenant entity.DormTenant

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย pid ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM dorm_tenants WHERE pid = ?", payload.Pid).Scan(&dorm_tenant).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(dorm_tenant.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user credentials"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(dorm_tenant.Pid)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginDormTenantResponse{
		Token: signedToken,
		ID:    dorm_tenant.ID,
		Role:  `tenant`,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}


// POST /dorm_tenants
func CreateDormTenant(c *gin.Context) {
	var dormtenant entity.DormTenant
	if err := c.ShouldBindJSON(&dormtenant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
		// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
		bytes, err := bcrypt.GenerateFromPassword([]byte(dormtenant.Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return
		}
		dormtenant.Password = string(bytes)

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
