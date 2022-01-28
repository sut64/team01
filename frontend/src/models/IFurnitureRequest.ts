import { DormAttenInterface } from "./IDormAtten";
import { RoomAllocateInterface } from "./IRoomAllocate";
import { DormInventoryInterface } from "./IDormInventory";

export interface FurnitureRequestInterface {

    ID: number,
    DormAttenID:        number,
    DormAtten:          DormAttenInterface,
    DormInventoryID:    number,
    DormInventory:      DormInventoryInterface,
    FurAmount:          number,            
    RoomAllocateID:     number,
    RoomAllocate:    RoomAllocateInterface,
    PhoneNo:         string,       
    DateRequest:     Date,
    
	
   }