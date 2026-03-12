// src/types/carrito.types.ts
import { Moneda } from "./producto.types";

export interface ItemCarrito {
    producto_id: string;
    nombre: string;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

export interface Carrito {
    usuario_id: string;
    items: ItemCarrito[];
    total: number;
    moneda: Moneda;
}

export interface ActualizarCarritoDTO {
    producto_id: string;
    cantidad: number;
}
