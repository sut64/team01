import { DormAttenInterface } from "./IDormAtten";
import { DormTenantInterface } from "./IDormTenant";
import { CarrierInterface } from "./ICarrier";
import { PostalInterface } from "./IPostal";
import { RoomAllocateInterface } from "./IRoomAllocate";

export interface Postal_RecordInterface {
    ID: number,
    Amount: number,
    RecordTime: Date,
    DormAttenID: number,
    DormAtten: DormAttenInterface,
    DormTenantID: number,
    DormTenant: DormTenantInterface,
    PostalID: number,
    Postal: PostalInterface,
    CarrierID: number,
    Carrier: CarrierInterface,
    Tracking: string,
    RoomAllocateID: number,
    RoomAllocate: RoomAllocateInterface,
    
   }
   