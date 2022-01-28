import { DormInventoryTypeInterface } from "./IDormInventoryType";

export interface DormInventoryinterface {
    ID: number,
    FurnitureName: string,
    Amount: number,

    DormInventoryTypeID : number,
	DormInventoryType  : DormInventoryTypeInterface
   }
