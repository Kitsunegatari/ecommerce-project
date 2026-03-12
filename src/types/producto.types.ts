// src/types/producto.types.ts
import { TIPOS_PRODUCTO, ESTADOS_PRODUCTO, MONEDAS } from "../config/constants";

export type TipoProducto = (typeof TIPOS_PRODUCTO)[number];
export type EstadoProducto = (typeof ESTADOS_PRODUCTO)[number];
export type Moneda = (typeof MONEDAS)[number];

export interface Habilidades {
    principal: string;
    secundarias: string[];
    efectos: string[];
}

export interface Producto {
    id: string;
    nombre: string;
    imagen_url: string;
    descripcion: string;
    habilidades: Habilidades;
    tipo: TipoProducto;
    cantidad_inventario: number;
    precio_creditos: number;
    precio_real: number;
    precio_real_moneda: Moneda;
    estado: EstadoProducto;
}

export interface ProductoConRelevancia extends Producto {
    relevanceScore: number;
}

export interface FiltrosBusqueda {
    tipo?: string;
    estado?: string;
    precio_min?: number;
    precio_max?: number;
}
