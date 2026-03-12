// src/types/common.types.ts

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        codigo: string;
        mensaje: string;
        detalles?: string;
    };
    mensaje?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export interface ValidationError {
    field: string;
    message: string;
}
