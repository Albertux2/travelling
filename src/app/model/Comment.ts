import { User } from "./User";

export interface Comment{
    user:User;
    travel:Travel;
    rating:number;
    message:string;
    date:Date;
}

interface Travel{
    hotelName:string;
}