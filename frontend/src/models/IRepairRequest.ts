
import { DormTenantInterface } from "./IDormTenant";
import { RoomAllocateInterface } from "./IRoomAllocate";
import { DormInventoryinterface } from "./IDormInventory";
import { RepairTypeInterface } from "./IRepairtype";

export interface RepairRequestinterface {
    ID: number,
    TelNumber : string,
    RecordDate: Date,
    RequestDate: Date,
    EntryPermissin: Boolean,
    
    DormTenantID: number,
    DormTenant: DormTenantInterface,
 
    RoomAllocateID: number,
    RoomAllocate: RoomAllocateInterface,

    DormInventoryID: number,
    DormInventory: DormInventoryinterface

    RepairTypeID: number,
    RepairType: RepairTypeInterface
    
   }
   