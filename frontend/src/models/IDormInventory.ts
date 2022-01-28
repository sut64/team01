import { DormInventoryTypeInterface } from "./IDormInventoryType";
export interface DormInventoryInterface {

    ID: string,
    FurnitureName: string,
    Amount: number,
    DormInventoryTypeID: number,
    DormInventoryType: DormInventoryTypeInterface,
	
   }