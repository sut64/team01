package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

//ตรวจสอบว่าเบอร์โทรศัพท์ตรงตามรูปแบบ ex. 0801456781 10 ตัว ขึ้นต้นด้วย 0
func TestTelNumberMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{

		"B788888888", //ขึ้นต้นด้วยตัวอักษร \d 9 ตัว
		"028789999",  //ขึ้นต้นด้วย 0  \d 8 ตัว
	}
	for _, fixture := range fixtures {
		ff := true
		user := RepairRequest{
		
			RecordDate:      time.Now().Add( 24 -time.Hour),
			EntryPermission: &ff,
			TelNumber:        fixture,
			//RequestDate:     time.Now(),
			//RoomAllocate:    RoomAllocate{},
			//DormTenant:      DormTenant{},
			//DormInventory:   DormInventory{},
			//RepairType:      RepairType{},
		}

		ok, err := govalidator.ValidateStruct(user)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`TelNumber: %s does not validate as matches(^[0]\d{9}$)`, fixture)))
	}

} 

func TestRequestDateMustBeFuture(t *testing.T) {
	
	g := NewGomegaWithT(t)
	ff := false
	rr :=RepairRequest{
		RequestDate: time.Now().Add( 24 - time.Hour),
		EntryPermission:  &ff,
		TelNumber:       "0800485123",

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(rr)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("RequestDate Must be in the future"))
}


func TestEntryPermissionNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	v := true

	// ข้อมูลถูกต้องหมดทุก field
	rr := RepairRequest{
		RequestDate: time.Now().Add( 24 * time.Hour),
		TelNumber:       "0800485123",
		EntryPermission: &v,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(rr)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}
