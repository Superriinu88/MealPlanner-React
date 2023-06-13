
import { AxiosError, isAxiosError } from "axios";
import { JWTResponse } from "../dto/JWTResponse";

import { RegisterData } from "../dto/RegisterData";
import { ErrorResponse } from "../dto/ErrorResponse";
import { BaseService } from "./BaseService";

import { LoginData } from "../dto/LoginData";


let errorM = ({error: ""} as ErrorResponse);


export class IdentityService extends BaseService {

    constructor() {
        super('identity/account/');
    }


    async register(data: RegisterData): Promise<JWTResponse | ErrorResponse> {

        try {
            const response = await this.axios.post<JWTResponse>('register', data);
            if (response.status === 200) {
                return response.data;
            }
            return errorM;
        } catch (err) {
            if (isAxiosError(err)) {

                let axiosError = err as AxiosError;
                if (axiosError.response) {
                    
                    errorM = (err.response?.data as ErrorResponse)

                    if (axiosError.response?.status === 404) {
                        return errorM
                    }
                    else if (axiosError.response?.status === 401) {
                        return errorM
                    }
                    else if (axiosError.response?.status === 400) {
                        return errorM;
                    }
                }
            }
            return errorM;
        }
    }

    async login(loginData: LoginData): Promise<JWTResponse | ErrorResponse> {

        try {
            const response = await this.axios.post<JWTResponse>('login', loginData);
            if (response.status === 200) {
                return response.data;
            }
            return errorM

        } catch (err) {
     
            if (isAxiosError(err)) {
        
                let axiosError = err as AxiosError;
                if (axiosError.response) {
            
                    if (axiosError.response?.status === 404) {
                        errorM = (axiosError.response?.data as ErrorResponse)
                        return errorM;
                    }
                    if (axiosError.response?.status === 401) {
                        errorM = (axiosError.response?.data as ErrorResponse)
                        return errorM
                    }
                }
            }

        }
        return errorM
    }


    async logout(data: JWTResponse): Promise<true | ErrorResponse> {
    
        try {
            const response = await this.axios.post(
                'logout',
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + data.jwt
                    }
                }
            );
            if (response.status === 200) {
                return true;
            }
            return errorM;
        } catch (err) {
            if (isAxiosError(err)) {

                let axiosError = err as AxiosError;
                if (axiosError.response) {
                    errorM = (err.response?.data as ErrorResponse)
                    if (axiosError.response?.status === 404) {
                        return errorM;
                    }
                    if (axiosError.response?.status === 401) {
                        return errorM;

                    }
                    if (axiosError.response?.status === 400) {
                        return errorM;
                    }
                }
            }
        }
        return errorM
    }


    async refreshToken(data: JWTResponse): Promise<JWTResponse | undefined> {
        try {
            const response = await this.axios.post<JWTResponse>('refreshtoken', data);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }
}