// src/domain/carrito/carrito.service.ts
import { Carrito, ItemCarrito } from "../../types/carrito.types";
import * as carritoRepo from "./carrito.repository";
import * as productosService from "../productos/productos.service";

export function obtenerCarrito(usuarioId: string): Carrito {
    let carrito = carritoRepo.findByUsuarioId(usuarioId);

    if (!carrito) {
        carrito = carritoRepo.create(usuarioId);
    }

    return carrito;
}

export function agregarProducto(
    usuarioId: string,
    productoId: string,
    cantidad: number,
): { success: boolean; carrito?: Carrito; error?: string } {
    // Verificar disponibilidad
    const verificacion = productosService.verificarDisponibilidad(
        productoId,
        cantidad,
    );

    if (!verificacion.disponible) {
        return {
            success: false,
            error: verificacion.mensaje,
        };
    }

    // Obtener producto
    const producto = productosService.obtenerPorId(productoId);

    if (!producto) {
        return {
            success: false,
            error: "Producto no encontrado",
        };
    }

    // Crear item
    const item: ItemCarrito = {
        producto_id: producto.id,
        nombre: producto.nombre,
        cantidad,
        precio_unitario: producto.precio_creditos,
        subtotal: cantidad * producto.precio_creditos,
    };

    // Agregar al carrito
    carritoRepo.addItem(usuarioId, item);
    const carritoActualizado = carritoRepo.findByUsuarioId(usuarioId)!;

    return {
        success: true,
        carrito: carritoActualizado,
    };
}

export function eliminarProducto(
    usuarioId: string,
    productoId: string,
): Carrito {
    carritoRepo.removeItem(usuarioId, productoId);
    return carritoRepo.findByUsuarioId(usuarioId)!;
}

export function actualizarCantidad(
    usuarioId: string,
    productoId: string,
    cantidad: number,
): { success: boolean; carrito?: Carrito; error?: string } {
    if (cantidad <= 0) {
        const carrito = eliminarProducto(usuarioId, productoId);
        return { success: true, carrito };
    }

    // Verificar disponibilidad
    const verificacion = productosService.verificarDisponibilidad(
        productoId,
        cantidad,
    );

    if (!verificacion.disponible) {
        return {
            success: false,
            error: verificacion.mensaje,
        };
    }

    carritoRepo.updateItemQuantity(usuarioId, productoId, cantidad);
    const carrito = carritoRepo.findByUsuarioId(usuarioId)!;

    return { success: true, carrito };
}

export function vaciarCarrito(usuarioId: string): void {
    carritoRepo.clear(usuarioId);
}

export function verificarStock(carrito: Carrito): {
    valido: boolean;
    errores: string[];
} {
    const errores: string[] = [];

    for (const item of carrito.items) {
        const verificacion = productosService.verificarDisponibilidad(
            item.producto_id,
            item.cantidad,
        );

        if (!verificacion.disponible) {
            errores.push(`${item.nombre}: ${verificacion.mensaje}`);
        }
    }

    return {
        valido: errores.length === 0,
        errores,
    };
}
