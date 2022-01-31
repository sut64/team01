package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPostalRecordPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	pr := Postal_Record{
		Amount:     1,
		Tracking:   "THB12345679",
		RecordTime: time.Now().Add(-24 * time.Hour),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(pr)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestAmountMustBePositiveIntegerAndNotBeZero(t *testing.T) {
	g := NewGomegaWithT(t)

	pr := Postal_Record{
		Amount:     0, //wrong
		Tracking:   "THB12345679",
		RecordTime: time.Now().Add(-24 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(pr)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Amount must none zero and not a negative number"))
}

func TestTrackingNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	pr := Postal_Record{
		Amount:     1,
		Tracking:   "", //wrong
		RecordTime: time.Now().Add(-24 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(pr)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Tracking ID cannot be blank"))
}

func TestRecordTimeMustBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	pr := Postal_Record{
		Amount:     1,
		Tracking:   "THB123456789",
		RecordTime: time.Now().Add(24 * time.Hour), //wrong
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(pr)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("RecordTime must be in the past"))
}
