package entity

import (
	"time"

	"gorm.io/gorm"
)

type Doctor struct {
	gorm.Model
	Doctor_id        string
	Password         string
	Doctor_name      string
	Pid              string            `gorm:"uniqueIndex"`
	TreatmentRecords []TreatmentRecord `gorm:"foreignKey:DoctorID"`
}
type Equipment struct {
	gorm.Model
	Equipment_id     string
	Equipment_name   string
	Equipment_type   string
	Equipment_cost   float32
	TreatmentRecords []TreatmentRecord `gorm:"foreignKey:EquipmentID"`
}

type Admission struct {
	gorm.Model
	PatientID       string
	Patient_Name    string
	RoomID          string
	Right_Treatment string
	AdmitTime       time.Time

	TreatmentRecords []TreatmentRecord `gorm:"foreignKey:AdmissionID"`
}

type Medicine struct {
	gorm.Model
	Name  string
	Type  string
	Price uint

	TreatmentRecords []TreatmentRecord `gorm:"foreignKey:MedID"`
}

type TreatmentRecord struct {
	gorm.Model
	DoctorID    *uint
	Doctor      Doctor `gorm:"references:id"`
	RecordDate  time.Time
	Treatment   string
	Food_type   string
	Med_amount  uint
	Cost        uint
	EquipmentID *uint
	Equipment   Equipment `gorm:"references:id"`

	MedID *uint
	Med   Medicine `gorm:"references:id"`

	AdmissionID *uint
	Admission   Admission `gorm:"references:id"`
}
