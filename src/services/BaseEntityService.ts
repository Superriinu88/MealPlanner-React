import { AxiosError, isAxiosError } from "axios";
import { IBaseEntity } from "../domain/IBaseEntity";
import { JWTResponse } from "../dto/JWTResponse";
import { BaseService } from "./BaseService";
import { IdentityService } from "./IdentityService";
import { ErrorResponse } from "../dto/ErrorResponse";
import { isErrorResponse } from "../helper";


let errorM = ({
    error: ""
} as ErrorResponse);


export abstract class BaseEntityService<TEntity extends IBaseEntity> extends BaseService {
    constructor(baseUrl: string, private setJwtResponse: ((data: JWTResponse | null) => void)) {
        super(baseUrl);
    }


    async getAll(jwtData?: JWTResponse, apiEndpoint = '',): Promise<TEntity[] | ErrorResponse> {

        try {
            const response = await this.axios.get<TEntity[]>(apiEndpoint,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwtData?.jwt
                    }
                }
            );

            if (response.status === 200) {
                return response.data;
            }
            return response.data;

        } catch (e) {

            let axiosError = e as AxiosError;

            if ((e as AxiosError).response?.status === 401) {
                // errorM = (e.response?.data as IErrorResponse)
                let identityService = new IdentityService();

                let refreshedJwt = await identityService.refreshToken(jwtData!);
                if (refreshedJwt && !isErrorResponse(refreshedJwt)) {
                    this.setJwtResponse(refreshedJwt);

                    const response = await this.axios.get<TEntity[]>('',
                        {
                            headers: {
                                'Authorization': 'Bearer ' + refreshedJwt.jwt
                            }
                        }
                    );
                    if (response.status === 200) {
                        return response.data;
                    }
                }
            }
            if (axiosError.response?.status === 404) {
                return errorM
            }
            //todo: intercept
            return errorM;
        }
    }



    async getById(id: string, jwtData?: JWTResponse, apiEndpoint = ''): Promise<TEntity | ErrorResponse> {
        try {
            const response = await this.axios.get<TEntity>(apiEndpoint + id,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwtData?.jwt
                    }
                }
            );
            console.log('response', response);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (e) {
            let axiosError = e as AxiosError;


            if (isAxiosError(e)) {
                if ((e as AxiosError).response?.status === 401) {
                    // errorM = (e.response?.data as IErrorResponse)
                    let identityService = new IdentityService();
                    let refreshedJwt = await identityService.refreshToken(jwtData!);

                    if (refreshedJwt && !isErrorResponse(refreshedJwt)) {
                        this.setJwtResponse(refreshedJwt);

                        const response = await this.axios.get<TEntity>(apiEndpoint + id,
                            {
                                headers: {
                                    'Authorization': 'Bearer ' + refreshedJwt.jwt,
                                }
                            }
                        );
                        if (response.status === 200) {
                            return response.data;
                        }
                    }
                }
                if (axiosError.response?.status === 404) {

                    return errorM
                }
            }



            //todo: intercept
            return errorM;
        }
    }

    async getRecipesId(id: string, jwtData?: JWTResponse): Promise<TEntity[] | ErrorResponse> {
        try {
            const response = await this.axios.get<TEntity[]>('/findRecipes?ingredient=' + id,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwtData?.jwt
                    }
                }
            );
            console.log('response', response);
            if(response.status === 200) {
    return response.data;
}
return response.data;
        } catch (e) {
    let axiosError = e as AxiosError;


    if (isAxiosError(e)) {
        if ((e as AxiosError).response?.status === 401) {
            // errorM = (e.response?.data as IErrorResponse)
            let identityService = new IdentityService();
            let refreshedJwt = await identityService.refreshToken(jwtData!);

            if (refreshedJwt && !isErrorResponse(refreshedJwt)) {
                this.setJwtResponse(refreshedJwt);

                const response = await this.axios.get<TEntity[]>('/findRecipes?ingredient=' + id,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + refreshedJwt.jwt,
                        }
                    }
                );
                if (response.status === 200) {
                    return response.data;
                }
            }
        }
        if (axiosError.response?.status === 404) {

            return errorM
        }
    }



    //todo: intercept
    return errorM;
}
    }





    async create<TEntity>(apinEndPoint: string, dataJSON: TEntity, jwtData: JWTResponse): Promise < TEntity | ErrorResponse > {
    try {
        let response = await this.axios.post<TEntity>(apinEndPoint, dataJSON,
            {
                headers: {
                    'Authorization': 'Bearer ' + jwtData.jwt,
                }
            }
        );
        if(response.status === 201) {
    return response.data;
}
return errorM;

        }
        catch (err) {

    let axiosError = err as AxiosError;


    if (isAxiosError(err)) {

        if (axiosError.response?.status === 401) {
            errorM = (err.response?.data as ErrorResponse)
            console.error("JWT expired, refreshing!");

            let identityService = new IdentityService();
            let refreshedJwt = await identityService.refreshToken(jwtData!);

            if (refreshedJwt) {
                this.setJwtResponse(refreshedJwt);
                let response = await this.axios.post<TEntity>('', dataJSON,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + refreshedJwt.jwt,
                        },
                    }
                );
                if (response.status === 201) {
                    errorM = (response.data as ErrorResponse)
                    return errorM;
                }
                else if (response?.status === 400) {
                    errorM = (response.data as ErrorResponse)
                    return response.data
                }
            }
        }
        else if (axiosError.response?.status === 400) {

            errorM = (axiosError.response?.data as ErrorResponse)
            return errorM
        }
        else if (axiosError.response?.status === 404) {

            console.log("kas olen siin")
            errorM = (axiosError.response?.data as ErrorResponse)
            return errorM
        }

        else if (axiosError.response?.status === 409) {

            console.log("kas olen siin")
            errorM = (axiosError.response?.data as ErrorResponse)
            return errorM
        }
    }

}
console.log("kas jõudsin 400")
return errorM;
    }



    async update<TEntity>(id: string, dataJSON: TEntity, jwtData: JWTResponse): Promise < TEntity | ErrorResponse > {
    try {
        //if (!apiEndpoint.endsWith("/")) { apiEndpoint += "/" }
        let response = await this.axios.put<TEntity>("/" + id, dataJSON, {
            headers: {
                'Authorization': 'Bearer ' + jwtData.jwt,
            }
        }
        );

        if(response.status < 299) {
    return response.data;
}
return errorM;
        }
        catch (err) {
    console.log("kus sa oled")
    let axiosError = err as AxiosError;
    if (isAxiosError(err)) {
        console.log("kus sa oled 1")
        if (axiosError.response?.status === 401) {
            errorM = (err.response?.data as ErrorResponse)
            console.log("kus sa oled 2")
            let identityService = new IdentityService();
            let refreshedJwt = await identityService.refreshToken(jwtData!);

            if (refreshedJwt) {
                this.setJwtResponse(refreshedJwt);
                let response = await this.axios.post<TEntity>('', dataJSON,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + refreshedJwt.jwt,
                        },
                    }
                );
                if (response.status === 201) {
                    errorM = (response.data as ErrorResponse)
                    return errorM;
                }
                else if (response?.status === 400) {
                    errorM = (response.data as ErrorResponse)
                    return response.data
                }

                else if (response?.status === 409) {
                    errorM = (response.data as ErrorResponse)
                    return response.data
                }
            }
        }

        else if (axiosError.response?.status === 409) {
            console.log("kus sa oled 5")
            errorM = (axiosError.response.data as ErrorResponse)
            console.log(errorM)
            console.log(errorM.status)
            console.log(errorM.error)
            return errorM
        }

        else if (axiosError.response !== undefined) {
            errorM = (axiosError.response.data as ErrorResponse)
            return errorM
        }
    }

}

return errorM;
    }





    async delete <TEntity>(id: string, jwtData: JWTResponse): Promise < TEntity | ErrorResponse > {
    try {
        let response = await this.axios.delete<TEntity>(id, {
            headers: {
                'Authorization': 'Bearer ' + jwtData.jwt,
            }
        }
        );
        if(response.status < 299) {
    return response.data;
}
return errorM;
        }
        catch (err) {

    let axiosError = err as AxiosError;

    if (axiosError.response?.status === 409) {
        console.log("kus sa oled 5")
        errorM = (axiosError.response.data as ErrorResponse)
        console.log(errorM)
        console.log(errorM.status)
        console.log(errorM.error)
        return errorM
    }


}

return errorM;

    }



}
