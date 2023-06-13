import { ServerError } from "./ServerError";

export interface LoginData extends ServerError{
  
   
    email: string,
    password: string,

}
