import { DormAttenInterface } from "./IDormAtten";
import { RoomAllocateInterface } from "./IRoomAllocate";
import { MeterRecordInterface } from "./IMeterRecord";

export interface BillInterface {
    ID: number,
    BillDateTime: Date,

	DormAttenID: number,
	DormAtten: DormAttenInterface,

    RoomAllocateID: number,
    RoomAllocate:   RoomAllocateInterface,
    RoomNumber:     string,

    MeterRecordID: number,
	MeterRecord:   MeterRecordInterface,

    PayByCash:  boolean,
	AmountPaid: number,
}