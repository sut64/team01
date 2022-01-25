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

		"2800485123",
		"B788888888", //ขึ้นต้นด้วยตัวอักษร \d 9 ตัว
		"2222222222", //ขึ้นต้นเลขอื่นที่ไม่ใช่ 0 \d 9 ตัว
		"028789999",  //ขึ้นต้นด้วย 0  \d 8 ตัว

	}

	for _, fixture := range fixtures {
		user := RepairRequest{
			RecordDate:      time.Now(),
			EntryPermission: true,
			TelNumber:       fixture,
			RequestDate:     time.Now(),
			RoomAllocate:    RoomAllocate{},
			DormTenant:      DormTenant{},
			DormInventory:   DormInventory{},
			RepairType:      RepairType{},
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

func TestEntryPermissionNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := RepairRequest{
		RecordDate:      time.Now(),
		EntryPermission: false,
		TelNumber:       "0800485123",
		RequestDate:     time.Now(),
		RoomAllocate:    RoomAllocate{},
		DormTenant:      DormTenant{},
		DormInventory:   DormInventory{},
		RepairType:      RepairType{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Name cannot be blank"))
}
