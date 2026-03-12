// src/domain/productos/productos.service.ts
import { Producto } from "../../types/producto.types";
import * as productosRepo from "./productos.repository";

export function obtenerTodos(): Producto[] {
    return productosRepo.findAll();
}

export function obtenerPorId(id: string): Producto | null {
    const producto = productosRepo.findById(id);
    return producto || null;
}

export function obtenerActivos(): Producto[] {
    return productosRepo.findActivos();
}

export function obtenerTiposDisponibles(): string[] {
    return productosRepo.getTiposDisponibles();
}

export function verificarDisponibilidad(
    productoId: string,
    cantidad: number,
): { disponible: boolean; mensaje?: string } {
    const producto = productosRepo.findById(productoId);

    if (!producto) {
        return { disponible: false, mensaje: "Producto no encontrado" };
    }

    if (producto.estado === "suspendido") {
        return { disponible: false, mensaje: "Producto no disponible" };
    }

    if (producto.cantidad_inventario < cantidad) {
        return {
            disponible: false,
            mensaje: `Stock insuficiente. Disponible: ${producto.cantidad_inventario}`,
        };
    }

    return { disponible: true };
}
