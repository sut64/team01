

import { DormTenantInterface } from "./IDormTenant";
import { RepairTypeInterface } from "./IRepairType";
import { DormInventoryInterface } from "./IDormInventory";
import { RoomAllocateInterface } from "./IRoomAllocate";


export interface RepairRequestinterface {
    ID : number,
    TelNumber : string,
    RecordDate : Date,
    EntryPermission : Boolean,
    RequestDate : Date,
    
    RepairTypeID: number,
    RepairType : RepairTypeInterface,

    DormInventoryID: number,
    DormInventory : DormInventoryInterface,

	DormTenantID: number,
	DormTenant: DormTenantInterface,

    RoomAllocateID: number,
    RoomAllocate: RoomAllocateInterface,



}