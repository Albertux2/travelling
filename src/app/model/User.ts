import { ResponseToken } from "../services/UserAuthentication.service";

export interface User{
    id:number;
    username:string;
    imgUrl:string;
    responseToken:ResponseToken
}