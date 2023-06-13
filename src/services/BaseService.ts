import Axios, { AxiosInstance } from 'axios';

export abstract class BaseService {

    private static hostBaseURL = "http://localhost:5009/api/";
    protected axios: AxiosInstance;

    constructor(baseUrl: string) {

        this.axios = Axios.create(
            {
                baseURL: BaseService.hostBaseURL + baseUrl,
                headers: {
                    common: {
                        'Content-Type': 'application/json'

                    }
                }
            }
        )


        // authorization in here, expired, refresh in here, Interceptors.response

        this.axios.interceptors.request.use(request => {
            return request
        })
    }

}