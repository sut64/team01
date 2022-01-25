import { RoomTypesInterface } from "./IRoomTypes";

export interface RoomInterface {
    ID : string,
    Number : string,

    RoomtypesID : number,
	Roomtypes  : RoomTypesInterface
}