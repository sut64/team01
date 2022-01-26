import { DormAttenInterface } from "./IDormAtten";
import { RoomAllocateInterface } from "./IRoomAllocate";
//import { MeterRecordInterface } from "./IMeterRecord";
//import { CleaningRequestInterface } from "./ICleaningRequest";

export interface BillInterface {
    BillDateTime: Date,

	DormAttentID: number,
	DormAtten: DormAttenInterface,

    RoomAllocateID: number,
    RoomAllocate:   RoomAllocateInterface, //น่าจะต้องแก้
    RoomNumber:     string,

    /* รอแก้ไข
    MeterRecordID: number,
	MeterRecord:   MeterRecordInterface,

	CleaningRequestID: number,
	CleaningRequest:   CleaningRequestInterface,
    */

    PayByCash:  Boolean,
	AmountPaid: Float64Array,
}