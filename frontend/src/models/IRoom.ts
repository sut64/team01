import { RoomTypesInterface } from "./IRoomTypes";

export interface RoomInterface {
    ID : number,
    Number : string,

    RoomtypesID : number,
	Roomtypes  : RoomTypesInterface
}