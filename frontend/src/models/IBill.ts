import { DormAttenInterface } from "./IDormAtten";
import { RoomAllocateInterface } from "./IRoomAllocate";
import { RoomInterface } from "./IRoom";
import { MeterRecordInterface } from "./IMeterRecord";
import { RepairRequestinterface } from "./IRepairRequest";
import { CleaningrequrestInterface } from "./ICleaningrequrest";

export interface BillInterface {
    ID: number,
    BillDateTime: Date,

	DormAttenID: number,
	DormAtten: DormAttenInterface,

    RoomAllocateID: number,
    RoomAllocate:   RoomAllocateInterface,

    RoomID: number,
	Room: RoomInterface,

    MeterRecordID: number,
	MeterRecord:   MeterRecordInterface,

    RepairRequestID: number,
	RepairRequest:   RepairRequestinterface,

    CleaningrequrestID: number,
	Cleaningrequrest:   CleaningrequrestInterface,

    PayByCash:  boolean,
	AmountPaid: number,
}