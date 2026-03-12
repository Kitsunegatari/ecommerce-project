// src/domain/productos/productos.repository.ts
import { Producto } from "../../types/producto.types";
import { PRODUCTOS_MOCK } from "../../data/productos.data";

/**
 * Repositorio de productos
 * Abstrae el acceso a datos (mock por ahora, BD en producción)
 */

export function findAll(): Producto[] {
    return [...PRODUCTOS_MOCK];
}

export function findById(id: string): Producto | undefined {
    return PRODUCTOS_MOCK.find((p) => p.id === id);
}

export function findActivos(): Producto[] {
    return PRODUCTOS_MOCK.filter(
        (p) => p.estado !== "suspendido" && p.cantidad_inventario > 0,
    );
}

export function actualizarStock(productoId: string, cantidad: number): void {
    const producto = PRODUCTOS_MOCK.find((p) => p.id === productoId);
    if (producto) {
        producto.cantidad_inventario -= cantidad;
    }
}

export function getTiposDisponibles(): string[] {
    const tipos = new Set(PRODUCTOS_MOCK.map((p) => p.tipo));
    return Array.from(tipos);
}
