import { ErrorResponse } from "./dto/ErrorResponse";



export function isErrorResponse(item: any): item is ErrorResponse {
    return typeof item.error === 'string';
}

