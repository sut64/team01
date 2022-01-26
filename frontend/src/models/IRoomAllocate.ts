import { RoomInterface } from "./IRoom";
import { DormAttenInterface } from "./IDormAtten";
import { DormTenantInterface } from "./IDormTenant";
import { RoomTypesInterface } from "./IRoomTypes";


export interface RoomAllocateInterface {
    ID : number,
	EntryTime: Date,

	DormAttenID: number,
	DormAtten: DormAttenInterface,

	RoomID: number,
	Room: RoomInterface,
	Number: string,

	RoomtypesID: number,
	Roomtypes: RoomTypesInterface,

	DormTenantID: number,
	DormTenant: DormTenantInterface,
	DormTenant_FirstName: string,
	DormTenant_LastName: string,
}