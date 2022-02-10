package entity

import (
	"fmt"
    "testing"
    "time"

    "github.com/asaskevich/govalidator"
    . "github.com/onsi/gomega"
)

func TestFurnitureRequestPass(t *testing.T) {
    g := NewGomegaWithT(t)

    // ข้อมูลถูกต้องหมดทุก field
    user := FurnitureRequest{
        FurAmount:     5,
        PhoneNo:       "0610937012",
        DateRequest:   time.Now().Add( 24* time.Hour),
        DormAtten:     DormAtten{},
        RoomAllocate:  RoomAllocate{},
        DormInventory: DormInventory{},
    }
    // ตรวจสอบด้วย govalidator
    ok, err := govalidator.ValidateStruct(user)

    // ok ต้องเป็น true แปลว่าไม่มี error
    g.Expect(ok).To(BeTrue())

    // err เป็นค่า nil แปลว่าไม่มี error
    g.Expect(err).To(BeNil())
}

//ตรวจสอบว่าเบอร์โทรศัพท์ตรงตามรูปแบบหรือไม่
func TestFurPhoneNoMustBeInValidPattern(t *testing.T) {
    g := NewGomegaWithT(t)

    fixtures := []string{

        
        "B788888888", //ขึ้นต้นด้วยตัวอักษร \d 9 ตัว
        "1788888888", //ขึ้นต้นด้วยเลขอื่นนอกจาก 0 \d 9 ตัว
        "028789999",  //ขึ้นต้นด้วย 0  \d 8 ตัว

    }

    for _, fixture := range fixtures {
        user := FurnitureRequest{
            FurAmount:     5,
            PhoneNo:       fixture,
            DateRequest:   time.Now().Add( 24* time.Hour),
            DormAtten:     DormAtten{},
            RoomAllocate:  RoomAllocate{},
            DormInventory: DormInventory{},
        }

        ok, err := govalidator.ValidateStruct(user)

        // ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
        g.Expect(ok).ToNot(BeTrue())

        // err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
        g.Expect(err).ToNot(BeNil())

        // err.Error ต้องมี error message แสดงออกมา
        g.Expect(err.Error()).To(Equal(fmt.Sprintf(`PhoneNo: %s does not validate as matches(^[0]\d{9}$)`, fixture)))
    }

}