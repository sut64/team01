package entity

import (
	//"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

//การ test validation
func TestRoomAllocatePass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	roomallocate := RoomAllocate{
		EntryTime: time.Now().Add(24 * time.Hour),
		Note:      "Hello",
		People:    1,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(roomallocate)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

//#22
func TestEntryTimeMustBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	roomallocate := RoomAllocate{
		EntryTime: time.Now().Add(-24 * time.Hour), //ผิด
		Note:      "Hello",
		People:    1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(roomallocate)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("EntryTime must be in the future"))
}

//#41
func TestNoteCannotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	roomallocate := RoomAllocate{
		EntryTime: time.Now().Add(24 * time.Hour),
		Note:      "", // ผิด
		People:    1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(roomallocate)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Note can not be blank"))
}

//#21
func TestPeopleMustBeInRange(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []int{
		0,
		4,
	}

	for _, fixtures := range fixtures {
		roomallocate := RoomAllocate{
			EntryTime: time.Now().Add(24 * time.Hour),
			Note:      "Hello",
			People:    fixtures, // ผิด --> people < 1 and people > 3
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(roomallocate)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("People must be in 1-3"))
	}
}
