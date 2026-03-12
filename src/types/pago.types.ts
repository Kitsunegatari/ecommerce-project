// src/types/pago.types.ts
import {
    ESTADOS_PAGO,
    METODOS_PAGO,
    ESTADOS_ORDEN,
    TIPOS_TARJETA,
} from "../config/constants";
import { ItemCarrito } from "./carrito.types";

export type EstadoPago = (typeof ESTADOS_PAGO)[number];
export type MetodoPago = (typeof METODOS_PAGO)[number];
export type EstadoOrden = (typeof ESTADOS_ORDEN)[number];
export type TipoTarjeta = (typeof TIPOS_TARJETA)[number];

export interface DatosTarjeta {
    numero: string;
    nombre_titular: string;
    fecha_vencimiento: string;
    cvv: string;
    tipo: TipoTarjeta;
}

export interface Direccion {
    calle: string;
    ciudad: string;
    departamento: string;
    codigo_postal?: string;
}

export interface DatosComprador {
    nombre: string;
    email: string;
    telefono?: string;
    documento?: string;
    direccion?: Direccion;
}

export interface SolicitudPago {
    usuario_id: string;
    metodo_pago: MetodoPago;
    datos_tarjeta: DatosTarjeta;
    datos_comprador: DatosComprador;
}

export interface RespuestaPasarela {
    exitoso: boolean;
    codigo_transaccion?: string;
    codigo_autorizacion?: string;
    estado: EstadoPago;
    mensaje: string;
    fecha_procesamiento: Date;
    referencia_pasarela?: string;
    codigo_error?: string;
    detalles_error?: string;
}

export interface Transaccion {
    id: string;
    orden_id: string;
    usuario_id: string;
    metodo_pago: MetodoPago;
    monto: number;
    moneda: string;
    estado: EstadoPago;
    codigo_transaccion?: string;
    codigo_autorizacion?: string;
    ultimos_4_digitos?: string;
    tipo_tarjeta?: TipoTarjeta;
    mensaje: string;
    codigo_error?: string;
    fecha_creacion: Date;
    fecha_procesamiento?: Date;
}

export interface Orden {
    id: string;
    numero_orden: string;
    usuario_id: string;
    items: ItemCarrito[];
    total: number;
    moneda: string;
    estado: EstadoOrden;
    datos_comprador: DatosComprador;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}

export interface ComprobantePago {
    orden: Orden;
    transaccion: Transaccion;
    productos: ItemCarrito[];
    total_pagado: number;
    moneda: string;
    fecha_pago: Date;
}
