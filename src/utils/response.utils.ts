// src/utils/response.utils.ts
import { ApiResponse } from "../types/common.types";

export function success<T>(data: T, mensaje?: string): ApiResponse<T> {
    return {
        success: true,
        data,
        mensaje,
    };
}

export function error(
    codigo: string,
    mensaje: string,
    detalles?: string,
): ApiResponse {
    return {
        success: false,
        error: {
            codigo,
            mensaje,
            detalles,
        },
    };
}
