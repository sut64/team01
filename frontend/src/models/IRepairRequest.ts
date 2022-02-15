

import { DormTenantInterface } from "./IDormTenant";
import { RepairTypeInterface } from "./IRepairType";
import { DormInventoryInterface } from "./IDormInventory";
import { DormInventoryTypeInterface } from "./IDormInventoryType";
import { RoomAllocateInterface } from "./IRoomAllocate";



export interface RepairRequestinterface {
    ID : number,
    TelNumber : string,
    RecordDate : Date,
    EntryPermission : Boolean,
    RequestDate : Date,
    ProblemNote :string,
    
    RepairTypeID: number,
    RepairType : RepairTypeInterface,

    DormInventoryID: number,
    DormInventory : DormInventoryInterface,

    DormInventoryTypeID: number,
    DormInventoryType : DormInventoryTypeInterface,

	DormTenantID: number,
	DormTenant: DormTenantInterface,

    RoomAllocateID: number,
    RoomAllocate: RoomAllocateInterface,



}