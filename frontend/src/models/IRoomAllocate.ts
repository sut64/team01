import { RoomInterface } from "./IRoom";
import { DormAttenInterface } from "./IDormAtten";
import { DormTenantInterface } from "./IDormTenant";
import { RoomTypesInterface } from "./IRoomTypes";


export interface RoomAllocateInterface {
    ID : number,
	EntryTime: Date,
	Note:    string,    //`valid:"required~Note can not be blank"`
	People:   number,    //`valid:"range(1|3)~People must be in 1-3,required~People must be in 1-3"`

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