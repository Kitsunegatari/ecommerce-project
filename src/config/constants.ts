// src/config/constants.ts

export const TARJETAS_PRUEBA = {
    EXITOSA: "4111111111111111",
    FONDOS_INSUFICIENTES: "4000000000000002",
    TARJETA_ROBADA: "4000000000000069",
    TARJETA_VENCIDA: "4000000000000044",
    CVV_INCORRECTO: "4000000000000127",
    ERROR_SISTEMA: "4000000000000101",
} as const;

export const MONEDAS = ["COP", "USD", "EUR"] as const;

export const TIPOS_PRODUCTO = [
    "heroe",
    "habilidad",
    "arma",
    "armadura",
    "item",
    "epica",
] as const;

export const ESTADOS_PRODUCTO = ["activo", "unico", "suspendido"] as const;

export const ESTADOS_PAGO = [
    "exitoso",
    "rechazado",
    "pendiente",
    "error",
] as const;

export const METODOS_PAGO = [
    "tarjeta_credito",
    "tarjeta_debito",
    "pse",
    "efecty",
] as const;

export const ESTADOS_ORDEN = [
    "pendiente",
    "pagada",
    "rechazada",
    "cancelada",
] as const;

export const TIPOS_TARJETA = ["visa", "mastercard", "amex", "diners"] as const;
