import { User } from "./User";

export interface Comment{
    user:User;
    rating:number;
    message:string;
    date:Date;
}