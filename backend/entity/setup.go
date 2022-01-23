package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("postal-record-system.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&RoomAllocate{}, &Carrier{}, &DormAtten{}, &Room{},
		&DormTenant{}, &Postal{}, &Postal_Record{}, &Bill{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	dorm_atten1 := DormAtten{
		Model:     gorm.Model{},
		FirstName: "Somchai",
		LastName:  "Saichom",
		Pid:       "1234567890123",
		Age:       39,
		Tel:       "0912345678",
		Gender:    "Male",
		Password:  string(password),
	}
	db.Model(&DormAtten{}).Create(&dorm_atten1)

	dorm_atten2 := DormAtten{
		Model:     gorm.Model{},
		FirstName: "Somphong",
		LastName:  "Songphom",
		Pid:       "1234567890000",
		Age:       36,
		Tel:       "0823314567",
		Gender:    "Male",
		Password:  string(password),
	}
	db.Model(&DormAtten{}).Create(&dorm_atten2)

	dorm_atten3 := DormAtten{
		Model:     gorm.Model{},
		FirstName: "Somdee",
		LastName:  "Sridom",
		Pid:       "1234567890111",
		Age:       41,
		Tel:       "0964547878",
		Gender:    "Male",
		Password:  string(password),
	}
	db.Model(&DormAtten{}).Create(&dorm_atten3)

	carrier1 := Carrier{
		CarrierName: "Kerry Express",
		Initials:    "KRY",
	}
	db.Model(&Carrier{}).Create(&carrier1)
	carrier2 := Carrier{
		CarrierName: "SCG Express",
		Initials:    "SCG",
	}
	db.Model(&Carrier{}).Create(&carrier2)
	carrier3 := Carrier{
		CarrierName: "DHL Express",
		Initials:    "DHL",
	}
	db.Model(&Carrier{}).Create(&carrier3)
	carrier4 := Carrier{
		CarrierName: "Flash Express",
		Initials:    "FL",
	}
	db.Model(&Carrier{}).Create(&carrier4)

	dorm_tenant1 := DormTenant{
		Pid:                  "1234567890123",
		DormTenant_FirstName: "John",
		DormTenant_LastName:  "Cena",
		Email:                "Johnny@gmail.com",
		Gender:               "Male",
		Age:                  23,
		Tel:                  "0888888888",

		//Password:      string(password),
	}
	db.Model(&DormTenant{}).Create(&dorm_tenant1)
	dorm_tenant2 := DormTenant{
		Pid:                  "1236196196199",
		DormTenant_FirstName: "Ray",
		DormTenant_LastName:  "Mysterio",
		Email:                "Rayyy@gmail.com",
		Gender:               "Male",
		Age:                  21,
		Tel:                  "0877777777",

		//Password:      string(password),
	}
	db.Model(&DormTenant{}).Create(&dorm_tenant2)
	dorm_tenant3 := DormTenant{
		Pid:                  "1212312121234",
		DormTenant_FirstName: "Jamie",
		DormTenant_LastName:  "Vardy",
		Email:                "JamieVardy@gmail.com",
		Gender:               "Male",
		Age:                  25,
		Tel:                  "0999999999",

		//Password:      string(password),
	}
	db.Model(&DormTenant{}).Create(&dorm_tenant3)

	postal1 := Postal{
		Type: "กล่องขนาดใหญ่",
	}
	db.Model(&Postal{}).Create(&postal1)
	postal2 := Postal{
		Type: "กล่องขนาดกลาง",
	}
	db.Model(&Postal{}).Create(&postal2)
	postal3 := Postal{
		Type: "กล่องขนาดเล็ก",
	}
	db.Model(&Postal{}).Create(&postal3)
	postal4 := Postal{
		Type: "ซองจดหมาย",
	}
	db.Model(&Postal{}).Create(&postal4)
	postal5 := Postal{
		Type: "ซองเอกสาร",
	}
	db.Model(&Postal{}).Create(&postal5)

	roomtype1 := Roomtypes{
		Name:  "ห้องพัดลม+เตียงคู่",
		Price: 3500,
	}
	db.Model(&Roomtypes{}).Create(&roomtype1)
	roomtype2 := Roomtypes{
		Name:  "ห้องพัดลม+เตียงเดี่ยว",
		Price: 3500,
	}
	db.Model(&Roomtypes{}).Create(&roomtype2)
	roomtype3 := Roomtypes{
		Name:  "ห้องแอร์+เตียงคู่",
		Price: 4500,
	}
	db.Model(&Roomtypes{}).Create(&roomtype3)
	roomtype4 := Roomtypes{
		Name:  "ห้องแอร์+เตียงเดี่ยว",
		Price: 4500,
	}
	db.Model(&Roomtypes{}).Create(&roomtype4)

	room1 := Room{
		Number:    "A01",
		Roomtypes: roomtype1,
	}
	db.Model(&Room{}).Create(&room1)
	room2 := Room{
		Number:    "A02",
		Roomtypes: roomtype2,
	}
	db.Model(&Room{}).Create(&room2)
	room3 := Room{
		Number:    "A08",
		Roomtypes: roomtype2,
	}
	db.Model(&Room{}).Create(&room3)
	room10 := Room{
		Number:    "B01",
		Roomtypes: roomtype3,
	}
	db.Model(&Room{}).Create(&room10)
	room11 := Room{
		Number:    "B07",
		Roomtypes: roomtype4,
	}
	db.Model(&Room{}).Create(&room11)

	roomallocate1 := RoomAllocate{
		EntryTime:            time.Now(),
		DormAtten:            dorm_atten1,
		DormTenant:           dorm_tenant1,
		DormTenant_FirstName: dorm_tenant1.DormTenant_FirstName,
		DormTenant_LastName:  dorm_tenant1.DormTenant_LastName,
		Room:                 room1,
		Number:               room1.Number,
	}
	db.Model(&RoomAllocate{}).Create(&roomallocate1)
	roomallocate2 := RoomAllocate{
		EntryTime:            time.Now(),
		DormAtten:            dorm_atten1,
		DormTenant:           dorm_tenant2,
		DormTenant_FirstName: dorm_tenant2.DormTenant_FirstName,
		DormTenant_LastName:  dorm_tenant2.DormTenant_LastName,
		Room:                 room2,
		Number:               room2.Number,
	}
	db.Model(&RoomAllocate{}).Create(&roomallocate2)
	roomallocate3 := RoomAllocate{
		EntryTime:            time.Now(),
		DormAtten:            dorm_atten2,
		DormTenant:           dorm_tenant3,
		DormTenant_FirstName: dorm_tenant3.DormTenant_FirstName,
		DormTenant_LastName:  dorm_tenant3.DormTenant_LastName,
		Room:                 room10,
		Number:               room10.Number,
	}
	db.Model(&RoomAllocate{}).Create(&roomallocate3)

	//------------Bill-------------------------
	bill1 := Bill{
		BillDateTime: time.Now(),
		DormAtten:    dorm_atten1,
		RoomNumber:   roomallocate1.Number,
		RoomPrice:    roomallocate1.Room.Roomtypes.Price,
		/*
			CleaningRequest:	,
			MeterRecord:		,
		*/
		PayByCash:  true,
		AmountPaid: 5340.25, //เดี๋ยวบวกเอา รอก่อนๆ
	}
	db.Model(&Bill{}).Create(&bill1)
	bill2 := Bill{
		BillDateTime: time.Now(),
		DormAtten:    dorm_atten1,
		RoomNumber:   roomallocate3.Number,
		RoomPrice:    roomallocate3.Room.Roomtypes.Price,
		/*
			CleaningRequest:	,
			MeterRecord:		,
		*/
		PayByCash:  true,
		AmountPaid: 5340.25, //เดี๋ยวบวกเอา รอก่อนๆ
	}
	db.Model(&Bill{}).Create(&bill2)

}
