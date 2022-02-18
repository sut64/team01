package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของหมายเหตุแล้วต้องเจอ Error

func TestNoteNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	cr := Cleaningrequrest{
		Note: "",
		Tel:  "0223336665",
		Day:  time.Now().Add(24 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(cr)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Note can not be blank"))
}

func TestDayMustBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	cr := Cleaningrequrest{
		Note: "TestNote",
		Tel:  "0223336665",
		Day:  time.Now().Add(-24 * time.Hour), //wrong
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(cr)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Day must be in the future"))
}

//ตรวจสอบว่าเบอร์โทรศัพท์ตรงตามรูปแบบหรือไม่
func TestPhoneNoMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{

		"X600000000", // ขึ้นต้นด้วยตัวอีกษร และ \d 9 ตัว
		"1234567890", // ขึ้นต้นด้วย 1 และ \d 9 ตัว
		"012345678",  // ขึ้นต้นด้วย 0 และ \d 8 ตัว

		//	"B00000000", // B ตามด้วย \d 8 ตัว
		//	"", // ค่าว่าง

	}

	for _, fixture := range fixtures {
		user := Cleaningrequrest{
			Note: "Abc",
			Tel:  fixture, // ผิด
			Day:  time.Now().Add(24 * time.Hour),
		}

		ok, err := govalidator.ValidateStruct(user)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง`)))
	}
}