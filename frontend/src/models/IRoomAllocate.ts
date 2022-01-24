import { DormAttenInterface } from "./IDormAtten";
import { DormTenantInterface } from "./IDormTenant";
import { RoomInterface } from "./IRoom";


export interface RoomAllocateInterface {
    ID: number,
    EntryTime: Date,
    DormAttenID: number,
    DormAtten: DormAttenInterface,
    RoomID: number,
    Room: RoomInterface,
    Number: string,
    DormTenantID: number,
    DormTenant: DormTenantInterface
    DormTenant_FirstName: string,
    DormTenant_LastName: string,
    
    
    
   }
   