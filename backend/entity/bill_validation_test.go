package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBillPass(t *testing.T) {
	g := NewGomegaWithT(t)

	v := true

	// ข้อมูลถูกต้องหมดทุก field
	bill := Bill{
		BillDateTime: time.Now().Add(-24 * time.Hour),
		PayByCash:    &v,
		AmountPaid:   4045.66,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(bill)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

//
func TestBillDateTimeMustBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	v := true

	// ข้อมูลถูกต้องหมดทุก field
	bill := Bill{
		BillDateTime: time.Now().Add(24 * time.Hour), //ผิด
		PayByCash:    &v,
		AmountPaid:   4045.66,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(bill)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("BillDateTime: does not validate as past"))
}

func CheckBool(t *bool) (bool, error) {
	if t == nil {
		return false, fmt.Errorf("PayByCash: cannot be blank")
	} else {
		return true, nil
	}
}

/*
// ตรวจสอบค่าจ่ายด้วยเงินสดเป็น Null ต้องเจอ Error
// จ่ายด้วยเงินสดต้องไม่เป็น Null
func TestBillPayByCashNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	bill := Bill{
		BillDateTime: time.Now().Add(-24 * time.Hour),
		PayByCash:    nil, // ผิด
		AmountPaid:   4045.66,
	}

	ok, err := CheckBool(bill.PayByCash)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("PayByCash: cannot be blank"))
}
*/
// ตรวจสอบค่าใช้จ่ายรวม น้อยกว่าหรือเท่ากับศูนย์ ต้องเจอ Error
// ค่าใช้จ่ายรวมต้องไม่น้อยกว่าหรือเท่ากับศูนย์
func TestBillAmountPaidNotLessThanEqualZero(t *testing.T) {
	g := NewGomegaWithT(t)

	v := true

	bill := Bill{
		BillDateTime: time.Now().Add(-24 * time.Hour),
		PayByCash:    &v,
		AmountPaid:   0.00, //ผิด
	}

	ok, err := govalidator.ValidateStruct(bill)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal(fmt.Sprintf("Amount: non zero vaue required")))
}
