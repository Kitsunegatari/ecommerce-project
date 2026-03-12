// src/domain/carrito/carrito.repository.ts
import { Carrito, ItemCarrito } from "../../types/carrito.types";
import { DB_STORAGE } from "../../data/storage.data";

/**
 * Repositorio de carritos
 */

export function findByUsuarioId(usuarioId: string): Carrito | undefined {
    return DB_STORAGE.carritos.get(usuarioId);
}

export function create(usuarioId: string): Carrito {
    const nuevoCarrito: Carrito = {
        usuario_id: usuarioId,
        items: [],
        total: 0,
        moneda: "USD",
    };
    DB_STORAGE.carritos.set(usuarioId, nuevoCarrito);
    return nuevoCarrito;
}

export function save(carrito: Carrito): void {
    DB_STORAGE.carritos.set(carrito.usuario_id, carrito);
}

export function deleteByUsuarioId(usuarioId: string): void {
    DB_STORAGE.carritos.delete(usuarioId);
}

export function addItem(usuarioId: string, item: ItemCarrito): void {
    const carrito = findByUsuarioId(usuarioId);
    if (!carrito) return;

    const existingItem = carrito.items.find(
        (i) => i.producto_id === item.producto_id,
    );

    if (existingItem) {
        existingItem.cantidad += item.cantidad;
        existingItem.subtotal =
            existingItem.cantidad * existingItem.precio_unitario;
    } else {
        carrito.items.push(item);
    }

    recalcularTotal(carrito);
    save(carrito);
}

export function removeItem(usuarioId: string, productoId: string): void {
    const carrito = findByUsuarioId(usuarioId);
    if (!carrito) return;

    carrito.items = carrito.items.filter((i) => i.producto_id !== productoId);
    recalcularTotal(carrito);
    save(carrito);
}

export function updateItemQuantity(
    usuarioId: string,
    productoId: string,
    cantidad: number,
): void {
    const carrito = findByUsuarioId(usuarioId);
    if (!carrito) return;

    const item = carrito.items.find((i) => i.producto_id === productoId);
    if (item) {
        item.cantidad = cantidad;
        item.subtotal = item.cantidad * item.precio_unitario;
        recalcularTotal(carrito);
        save(carrito);
    }
}

export function clear(usuarioId: string): void {
    const carritoVacio: Carrito = {
        usuario_id: usuarioId,
        items: [],
        total: 0,
        moneda: "USD",
    };
    save(carritoVacio);
}

function recalcularTotal(carrito: Carrito): void {
    carrito.total = carrito.items.reduce((sum, item) => sum + item.subtotal, 0);
}
