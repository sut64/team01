package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team01/entity"
	"github.com/sut64/team01/service"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginDormAttenPayload struct {
	Pid      string `json:"pid"`
	Password string `json:"password"`
}

// LoginResponse token response
type LoginDormAttenResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Role  string `json:"role"`
}

// POST /login
func LoginDormAtten(c *gin.Context) {
	var payload LoginDormAttenPayload
	var dorm_atten entity.DormAtten

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย pid ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM dorm_attens WHERE pid = ?", payload.Pid).Scan(&dorm_atten).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(dorm_atten.Password), []byte(payload.Password))
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

	signedToken, err := jwtWrapper.GenerateToken(dorm_atten.Pid)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginDormAttenResponse{
		Token: signedToken,
		ID:    dorm_atten.ID,
		Role:  `atten`,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// POST /dorm_atten
func CreateDormAtten(c *gin.Context) {
	var dormatten entity.DormAtten
	if err := c.ShouldBindJSON(&dormatten); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	bytes, err := bcrypt.GenerateFromPassword([]byte(dormatten.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	dormatten.Password = string(bytes)

	if err := entity.DB().Create(&dormatten).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dormatten})
}

// GET /dorm_atten/:id
func GetDormAtten(c *gin.Context) {
	var dormatten entity.DormAtten
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM dorm_attens WHERE id = ?", id).Scan(&dormatten).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dormatten})
}

// GET /dorm_atten
func ListDormAttens(c *gin.Context) {
	var dormattens []entity.DormAtten
	if err := entity.DB().Raw("SELECT * FROM dorm_attens").Scan(&dormattens).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dormattens})
}

// DELETE /dorm_atten/:id
func DeleteDormAtten(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM dorm_attens WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dormatten not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /dorm_atten
func UpdateDormAtten(c *gin.Context) {
	var dormatten entity.DormAtten
	if err := c.ShouldBindJSON(&dormatten); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", dormatten.ID).First(&dormatten); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&dormatten).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dormatten})
}
