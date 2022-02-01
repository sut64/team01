import { DormInventoryTypeInterface } from "./IDormInventoryType";
export interface DormInventoryInterface {

    ID: string,
    FurnitureName: string,
    Amount: number,
    InvenType :string,
    DormInventoryTypeID: number,
    DormInventoryType: DormInventoryTypeInterface,
	
   }