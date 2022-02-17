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
	database, err := gorm.Open(sqlite.Open("dorm-system.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&RoomAllocate{}, &Carrier{}, &DormAtten{}, &Room{}, &Role{},
		&DormTenant{}, &Postal{}, &Postal_Record{}, &Bill{}, &RepairRequest{}, RepairType{}, DormInventory{}, DormInventoryType{},

		&Cleaningtype{}, &Timerequrest{}, &Cleaningrequrest{}, &Unitprice{}, &MeterRecord{},

		&FurnitureRequest{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	password2, err := bcrypt.GenerateFromPassword([]byte("654321"), 14)
	//------------Role-------------------------
	role1 := Role{
		Model: gorm.Model{},
		rol:   "DormAtten",
	}
	db.Model(&Role{}).Create(&role1)

	role2 := Role{
		Model: gorm.Model{},
		rol:   "DormTenant",
	}
	db.Model(&Role{}).Create(&role2)
	//------------DormAtten-------------------------
	dorm_atten1 := DormAtten{
		Model:     gorm.Model{},
		FirstName: "Somchai",
		LastName:  "Saichom",
		Pid:       "1234567890123",
		Age:       39,
		Tel:       "0912345678",
		Gender:    "Male",
		Role:      role1,
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
		Role:      role1,
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
		Role:      role1,
		Password:  string(password),
	}
	db.Model(&DormAtten{}).Create(&dorm_atten3)

	//------------Carrier-------------------------
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
	carrier5 := Carrier{
		CarrierName: "อื่นๆ",
		Initials:    "etc",
	}
	db.Model(&Carrier{}).Create(&carrier5)
	//------------DormTenant-------------------------
	dorm_tenant1 := DormTenant{
		Pid:                  "1234567890123",
		DormTenant_FirstName: "John",
		DormTenant_LastName:  "Cena",
		Email:                "Johnny@gmail.com",
		Gender:               "Male",
		Age:                  23,
		Role:                 role2,
		Tel:                  "0800000000",
		Password:             string(password2),
	}
	db.Model(&DormTenant{}).Create(&dorm_tenant1)
	dorm_tenant2 := DormTenant{
		Pid:                  "1236196196199",
		DormTenant_FirstName: "Ray",
		DormTenant_LastName:  "Mysterio",
		Email:                "Rayyy@gmail.com",
		Gender:               "Male",
		Age:                  21,
		Role:                 role2,
		Tel:                  "0877777777",

		Password: string(password2),
	}
	db.Model(&DormTenant{}).Create(&dorm_tenant2)
	dorm_tenant3 := DormTenant{
		Pid:                  "1212312121234",
		DormTenant_FirstName: "Jamie",
		DormTenant_LastName:  "Vardy",
		Email:                "JamieVardy@gmail.com",
		Gender:               "Male",
		Age:                  25,
		Role:                 role2,
		Tel:                  "0999999999",
		Password:             string(password2),
	}
	db.Model(&DormTenant{}).Create(&dorm_tenant3)

	dorm_tenant4 := DormTenant{
		Pid:                  "5649231579458",
		DormTenant_FirstName: "Johan",
		DormTenant_LastName:  "Cruff",
		Email:                "Cruff@gmail.com",
		Gender:               "Male",
		Age:                  50,
		Role:                 role2,
		Tel:                  "0812345678",
		Password:             string(password2),
	}
	db.Model(&DormTenant{}).Create(&dorm_tenant4)

	//------------Postal-------------------------
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
	postal6 := Postal{
		Type: "อื่นๆ",
	}
	db.Model(&Postal{}).Create(&postal6)
	//------------Roomtypes-------------------------

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

	//------------Room-------------------------
	room1 := Room{
		Number:    "A01",
		Roomtypes: roomtype1,
	}
	db.Model(&Room{}).Create(&room1)
	room2 := Room{
		Number:    "A02",
		Roomtypes: roomtype1,
	}
	db.Model(&Room{}).Create(&room2)
	room3 := Room{
		Number:    "A03",
		Roomtypes: roomtype1,
	}
	db.Model(&Room{}).Create(&room3)
	room4 := Room{
		Number:    "A04",
		Roomtypes: roomtype1,
	}
	db.Model(&Room{}).Create(&room4)
	room5 := Room{
		Number:    "A05",
		Roomtypes: roomtype1,
	}
	db.Model(&Room{}).Create(&room5)
	room6 := Room{
		Number:    "A06",
		Roomtypes: roomtype2,
	}
	db.Model(&Room{}).Create(&room6)
	room7 := Room{
		Number:    "A07",
		Roomtypes: roomtype2,
	}
	db.Model(&Room{}).Create(&room7)
	room8 := Room{
		Number:    "A08",
		Roomtypes: roomtype2,
	}
	db.Model(&Room{}).Create(&room8)
	room9 := Room{
		Number:    "A09",
		Roomtypes: roomtype2,
	}
	db.Model(&Room{}).Create(&room9)
	room10 := Room{
		Number:    "A10",
		Roomtypes: roomtype2,
	}
	db.Model(&Room{}).Create(&room10)
	room11 := Room{
		Number:    "B01",
		Roomtypes: roomtype3,
	}
	db.Model(&Room{}).Create(&room11)
	room12 := Room{
		Number:    "B02",
		Roomtypes: roomtype3,
	}
	db.Model(&Room{}).Create(&room12)
	room13 := Room{
		Number:    "B03",
		Roomtypes: roomtype3,
	}
	db.Model(&Room{}).Create(&room13)
	room14 := Room{
		Number:    "B04",
		Roomtypes: roomtype3,
	}
	db.Model(&Room{}).Create(&room14)
	room15 := Room{
		Number:    "B05",
		Roomtypes: roomtype3,
	}
	db.Model(&Room{}).Create(&room15)
	room16 := Room{
		Number:    "B06",
		Roomtypes: roomtype4,
	}
	db.Model(&Room{}).Create(&room16)
	room17 := Room{
		Number:    "B07",
		Roomtypes: roomtype4,
	}
	db.Model(&Room{}).Create(&room17)
	room18 := Room{
		Number:    "B08",
		Roomtypes: roomtype4,
	}
	db.Model(&Room{}).Create(&room18)
	room19 := Room{
		Number:    "B09",
		Roomtypes: roomtype4,
	}
	db.Model(&Room{}).Create(&room19)
	room20 := Room{
		Number:    "B10",
		Roomtypes: roomtype4,
	}
	db.Model(&Room{}).Create(&room20)
	//------------RoomAllocate-------------------------
	roomallocate1 := RoomAllocate{
		EntryTime:            time.Now(),
		DormAtten:            dorm_atten1,
		DormTenant:           dorm_tenant1,
		DormTenant_FirstName: dorm_tenant1.DormTenant_FirstName,
		DormTenant_LastName:  dorm_tenant1.DormTenant_LastName,
		Room:                 room1,
		Number:               room1.Number,
		People:               1,
		Note:                 "เลี้ยงแมว",
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
		People:               2,
		Note:                 "-",
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
		People:               1,
		Note:                 "-",
	}
	db.Model(&RoomAllocate{}).Create(&roomallocate3)
	roomallocate4 := RoomAllocate{
		EntryTime:            time.Now(),
		DormAtten:            dorm_atten1,
		DormTenant:           dorm_tenant4,
		DormTenant_FirstName: dorm_tenant4.DormTenant_FirstName,
		DormTenant_LastName:  dorm_tenant4.DormTenant_LastName,
		Room:                 room9,
		Number:               room9.Number,
		People:               3,
		Note:                 "ขอส่งเสียงดังในตอนเที่ยงของวันจันทร์",
	}
	db.Model(&RoomAllocate{}).Create(&roomallocate4)

	roomallocate5 := RoomAllocate{
		EntryTime:            time.Now(),
		DormAtten:            dorm_atten1,
		DormTenant:           dorm_tenant4,
		DormTenant_FirstName: dorm_tenant4.DormTenant_FirstName,
		DormTenant_LastName:  dorm_tenant4.DormTenant_LastName,
		Room:                 room11,
		Number:               room11.Number,
		People:               3,
		Note:                 "ขอส่งเสียงดังในตอนเที่ยงของวันจันทร์",
	}
	db.Model(&RoomAllocate{}).Create(&roomallocate5)

	//----------------- ประเภททำความสะอาด -------------------
	cleaningtype1 := Cleaningtype{
		Type:  "กวาดห้อง + ถูห้อง",
		Price: 50.00,
	}
	db.Model(&Cleaningtype{}).Create(&cleaningtype1)

	cleaningtype2 := Cleaningtype{
		Type:  "กวาดห้อง + ถูห้อง + ล้างห้องน้ำ",
		Price: 100.00,
	}
	db.Model(&Cleaningtype{}).Create(&cleaningtype2)

	cleaningtype3 := Cleaningtype{
		Type:  "กวาดห้อง + ถูห้อง + ล้างห้องน้ำ + ล้างตู้เย็น",
		Price: 150.00,
	}
	db.Model(&Cleaningtype{}).Create(&cleaningtype3)

	cleaningtype4 := Cleaningtype{
		Type:  "กวาดห้อง + ถูห้อง + ล้างห้องน้ำ + ล้างระเบียง",
		Price: 200.00,
	}
	db.Model(&Cleaningtype{}).Create(&cleaningtype4)

	cleaningtype5 := Cleaningtype{
		Type:  "กวาดห้อง + ถูห้อง + ล้างห้องน้ำ + ล้างระเบียง + ล้างแอร์",
		Price: 400,
	}
	db.Model(&Cleaningtype{}).Create(&cleaningtype5)
	//----------------- ช่วงเวลาทำความสะอาด -------------------
	timerequrest1 := Timerequrest{
		Period: "08:00 - 10:00",
	}
	db.Model(&Timerequrest{}).Create(&timerequrest1)

	timerequrest2 := Timerequrest{
		Period: "10:00 - 12:00",
	}
	db.Model(&Timerequrest{}).Create(&timerequrest2)

	timerequrest3 := Timerequrest{
		Period: "13:00 - 15:00",
	}
	db.Model(&Timerequrest{}).Create(&timerequrest3)

	timerequrest4 := Timerequrest{
		Period: "15:00 - 17:00",
	}
	db.Model(&Timerequrest{}).Create(&timerequrest4)

	//----------------- ช่วงเวลาทำความสะอาด -------------------
	Cleaning1 := Cleaningrequrest{
		RoomAllocate: roomallocate1,
		Cleaningtype: cleaningtype3,
		Timerequrest: timerequrest4,
		Day:          time.Now(),
		Tel:          "0817745023",
		Note:         "ห้องน้ำมีคาบที่กระจก",
	}
	db.Model(&Cleaningrequrest{}).Create(&Cleaning1)

	Cleaning2 := Cleaningrequrest{
		RoomAllocate: roomallocate2,
		Cleaningtype: cleaningtype4,
		Timerequrest: timerequrest2,
		Day:          time.Now(),
		Tel:          "0932561432",
		Note:         "มีหนูตายหลังตู้เย็น",
	}
	db.Model(&Cleaningrequrest{}).Create(&Cleaning2)
	Cleaning3 := Cleaningrequrest{
		RoomAllocate: roomallocate2,
		Cleaningtype: cleaningtype4,
		Timerequrest: timerequrest2,
		Day:          time.Now(),
		Tel:          "0932561432",
		Note:         "มีเศษอาหารหล่นหลังตู้เย็น",
	}
	db.Model(&Cleaningrequrest{}).Create(&Cleaning3)
	Cleaning4 := Cleaningrequrest{
		RoomAllocate: roomallocate1,
		Cleaningtype: cleaningtype3,
		Timerequrest: timerequrest4,
		Day:          time.Now(),
		Tel:          "0817745023",
		Note:         "น้ำหวานหกบริเวณหน้าห้องน้ำ",
	}
	db.Model(&Cleaningrequrest{}).Create(&Cleaning4)

	//------------MeterRecord-------------------------

	Unitprice1 := Unitprice{
		Unitname: "test",
		Uperbath: 8.45,
	}
	db.Model(&Unitprice{}).Create(&Unitprice1)

	MeterRecord1 := MeterRecord{
		Uele:         8.39,
		Uwat:         12.14,
		Sum:          145.64,
		Date:         time.Now(),
		Unitprice:    Unitprice1,
		DormAtten:    dorm_atten1,
		RoomAllocate: roomallocate1,
	}
	db.Model(&MeterRecord{}).Create(&MeterRecord1)

	MeterRecord2 := MeterRecord{
		Uele:         8.39,
		Uwat:         12.14,
		Sum:          245.64,
		Date:         time.Now(),
		Unitprice:    Unitprice1,
		DormAtten:    dorm_atten1,
		RoomAllocate: roomallocate2,
	}
	db.Model(&MeterRecord{}).Create(&MeterRecord2)

	MeterRecord3 := MeterRecord{
		Uele:         8.39,
		Uwat:         12.14,
		Sum:          345.64,
		Date:         time.Now(),
		Unitprice:    Unitprice1,
		DormAtten:    dorm_atten1,
		RoomAllocate: roomallocate3,
	}
	db.Model(&MeterRecord{}).Create(&MeterRecord3)

	MeterRecord4 := MeterRecord{
		Uele:         8.39,
		Uwat:         12.14,
		Sum:          445.64,
		Date:         time.Now(),
		Unitprice:    Unitprice1,
		DormAtten:    dorm_atten1,
		RoomAllocate: roomallocate4,
	}
	db.Model(&MeterRecord{}).Create(&MeterRecord4)

	MeterRecord5 := MeterRecord{
		Uele:         8.39,
		Uwat:         12.14,
		Sum:          545.64,
		Date:         time.Now(),
		Unitprice:    Unitprice1,
		DormAtten:    dorm_atten1,
		RoomAllocate: roomallocate1,
	}
	db.Model(&MeterRecord{}).Create(&MeterRecord5)

	MeterRecord6 := MeterRecord{
		Uele:         8.39,
		Uwat:         12.14,
		Sum:          645.64,
		Date:         time.Now(),
		Unitprice:    Unitprice1,
		DormAtten:    dorm_atten1,
		RoomAllocate: roomallocate5,
	}
	db.Model(&MeterRecord{}).Create(&MeterRecord6)

	//------------DormInventoryType-------------------------
	InventType1 := DormInventoryType{
		InvenType: "เครื่องใช้ไฟฟ้า",
	}
	db.Model(&DormInventoryType{}).Create(&InventType1)
	InventType2 := DormInventoryType{
		InvenType: "ระบบน้ำ",
	}
	db.Model(&DormInventoryType{}).Create(&InventType2)
	InventType3 := DormInventoryType{
		InvenType: "เฟอร์นิเจอร์",
	}
	db.Model(&DormInventoryType{}).Create(&InventType3)
	//------------DormInventory-------------------------
	DormInventory1 := DormInventory{
		FurnitureName:     "พัดลม",
		Amount:            100,
		DormInventoryType: InventType1,
	}
	db.Model(&DormInventory{}).Create(&DormInventory1)

	DormInventory11 := DormInventory{
		FurnitureName:     "หลอดไฟ",
		Amount:            200,
		DormInventoryType: InventType1,
	}
	db.Model(&DormInventory{}).Create(&DormInventory11)

	DormInventory12 := DormInventory{
		FurnitureName:     "แอร์",
		Amount:            100,
		DormInventoryType: InventType1,
	}
	db.Model(&DormInventory{}).Create(&DormInventory12)

	DormInventory2 := DormInventory{
		FurnitureName:     "โต๊ะ",
		Amount:            150,
		DormInventoryType: InventType3,
	}
	db.Model(&DormInventory{}).Create(&DormInventory2)
	DormInventory7 := DormInventory{
		FurnitureName:     "เก้าอี้",
		Amount:            150,
		DormInventoryType: InventType3,
	}
	db.Model(&DormInventory{}).Create(&DormInventory7)

	DormInventory8 := DormInventory{
		FurnitureName:     "มุ้งลวด",
		Amount:            150,
		DormInventoryType: InventType3,
	}
	db.Model(&DormInventory{}).Create(&DormInventory8)

	DormInventory10 := DormInventory{
		FurnitureName:     "ตู้เสื้อผ้า",
		Amount:            150,
		DormInventoryType: InventType3,
	}
	db.Model(&DormInventory{}).Create(&DormInventory10)
	DormInventory9 := DormInventory{
		FurnitureName:     "เตียง",
		Amount:            100,
		DormInventoryType: InventType3,
	}
	db.Model(&DormInventory{}).Create(&DormInventory9)

	DormInventory4 := DormInventory{
		FurnitureName:     "อ่างล้างหน้า",
		Amount:            2,
		DormInventoryType: InventType2,
	}
	db.Model(&DormInventory{}).Create(&DormInventory4)

	DormInventory5 := DormInventory{
		FurnitureName:     "ฝักบัว",
		Amount:            40,
		DormInventoryType: InventType2,
	}
	db.Model(&DormInventory{}).Create(&DormInventory5)

	DormInventory6 := DormInventory{
		FurnitureName:     "เครื่องทำน้ำอุ่น",
		Amount:            100,
		DormInventoryType: InventType2,
	}
	db.Model(&DormInventory{}).Create(&DormInventory6)
	//---------repairType--------------------

	Normal := RepairType{
		TypeName: "ปกติ",
		Cost:     250.00,
	}
	db.Model(&RepairType{}).Create(&Normal)

	Urgen := RepairType{
		TypeName: "ด่วน",
		Cost:     500.00,
	}
	db.Model(&RepairType{}).Create(&Urgen)

	//--------Boolean-------------------
	t := true
	f := false

	//--------RepairRequest-------------------

	repair1 := RepairRequest{
		DormTenant:      dorm_tenant1,
		RecordDate:      time.Now(),
		EntryPermission: &t,
		RequestDate:     time.Now(),
		TelNumber:       "0879456123",
		RepairType:      Urgen,
		DormInventory:   DormInventory2,
		RoomAllocate:    roomallocate1,
		ProblemNote:     "-",
	}
	db.Model(&RepairRequest{}).Create(&repair1)

	repair2 := RepairRequest{
		DormTenant:      dorm_tenant2,
		RecordDate:      time.Now(),
		EntryPermission: &t,
		RequestDate:     time.Now(),
		TelNumber:       "0879456123",
		RepairType:      Normal,
		DormInventory:   DormInventory1,
		RoomAllocate:    roomallocate2,
		ProblemNote:     "-",
	}
	db.Model(&RepairRequest{}).Create(&repair2)

	repair3 := RepairRequest{
		DormTenant:      dorm_tenant2,
		RecordDate:      time.Now(),
		EntryPermission: &t,
		RequestDate:     time.Now(),
		TelNumber:       "0879456123",
		RepairType:      Urgen,
		DormInventory:   DormInventory1,
		RoomAllocate:    roomallocate2,
		ProblemNote:     "-",
	}
	db.Model(&RepairRequest{}).Create(&repair3)

	//------------Bill-------------------------

	bill1 := Bill{
		BillDateTime: time.Now(),
		DormAtten:    dorm_atten1,
		RoomAllocate: roomallocate1,
		Room:         roomallocate1.Room,
		MeterRecord:  MeterRecord1,
		//RepairRequest:    nil,
		Cleaningrequrest: Cleaning1,
		PayByCash:        &t,
		AmountPaid:       roomallocate1.Room.Roomtypes.Price + MeterRecord1.Sum + Cleaning1.Cleaningtype.Price,
	}
	db.Model(&Bill{}).Create(&bill1)
	bill2 := Bill{
		BillDateTime:  time.Now(),
		DormAtten:     dorm_atten1,
		RoomAllocate:  roomallocate2,
		Room:          roomallocate2.Room,
		MeterRecord:   MeterRecord2,
		RepairRequest: repair2,
		//Cleaningrequrest: nil,
		PayByCash:  &f,
		AmountPaid: roomallocate2.Room.Roomtypes.Price + MeterRecord2.Sum + repair2.RepairType.Cost,
	}
	db.Model(&Bill{}).Create(&bill2)

}
