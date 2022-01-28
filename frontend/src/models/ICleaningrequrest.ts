import { CleaningtypesInterface } from "./ICleaningtype";
import { TimerequrestsInterface } from "./ITimerequrest";
import { RoomAllocateInterface } from "./IRoomAllocate";


export interface CleaningrequrestInterface {
  ID: number,

  CleaningtypeID: number,
  Cleaningtype: CleaningtypesInterface,
  TimerequrestID: number,
  Timerequrest: TimerequrestsInterface,
  RoomAllocateID: number,
  RoomAllocate: RoomAllocateInterface,
  
  Day:  Date,
  Tel: string,
  Note: string,


}