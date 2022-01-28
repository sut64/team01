import { DormAttenInterface } from "./IDormAtten";
import { RoomAllocateInterface } from "./IRoomAllocate";
//import { MeterRecordInterface } from "./IMeterRecord";
import { CleaningrequrestInterface } from "./ICleaningrequrest";

export interface BillInterface {
    ID: number,
    BillDateTime: Date,

	DormAttenID: number,
	DormAtten: DormAttenInterface,

    RoomAllocateID: number,
    RoomAllocate:   RoomAllocateInterface, //น่าจะต้องแก้
    RoomNumber:     string,

    /* รอแก้ไข
    MeterRecordID: number,
	MeterRecord:   MeterRecordInterface,
    */
    CleaningrequrestID: number,
	Cleaningrequrest:   CleaningrequrestInterface,

    PayByCash:  boolean,
	AmountPaid: number,
}