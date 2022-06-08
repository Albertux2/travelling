import { Travel } from "./Travel";
import { User } from "./User";

export interface Booking{
    user:User;
    travel:Travel;
    startDate:Date;
    endDate:Date;
    price:number;
    doubleBed:boolean;
    persons:number;
}