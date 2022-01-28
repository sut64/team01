import { DormAttenInterface } from "./IDormAtten";
import { RoomAllocateInterface } from "./IRoomAllocate";
import { UnitpriceInterface } from "./IUnitprice";

export interface MeterRecordInterface{
    ID : number
    Uele : number
    Uwat : number
    Date : Date
    Sum : number
    UnitpriceID : number
    Unitprice : UnitpriceInterface
    DormAttenID : number
    DormAtten : DormAttenInterface
    RoomAllocateID : number
    RoomAllocate : RoomAllocateInterface

}