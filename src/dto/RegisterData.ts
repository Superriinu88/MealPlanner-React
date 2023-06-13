import { ServerError } from "./ServerError";

export interface RegisterData extends ServerError{
    password: string,
    confirmPassword: string,
    email: string,
    firstName: string,
    lastName: string,
}
