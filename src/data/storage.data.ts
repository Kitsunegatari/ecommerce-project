// src/data/storage.data.ts
import { Carrito } from "../types/carrito.types";
import { Orden, Transaccion } from "../types/pago.types";

/**
 * Simulador de base de datos en memoria
 * En producción: PostgreSQL, MongoDB, etc.
 */
export const DB_STORAGE = {
    carritos: new Map<string, Carrito>(),
    ordenes: new Map<string, Orden>(),
    transacciones: new Map<string, Transaccion>(),
};
