// src/domain/pagos/orden.service.ts
import { v4 as uuidv4 } from "uuid";
import { Orden } from "../../types/pago.types";
import { Carrito } from "../../types/carrito.types";
import { DatosComprador } from "../../types/pago.types";
import { DB_STORAGE } from "../../data/storage.data";

export function crearOrden(
    carrito: Carrito,
    datosComprador: DatosComprador,
): Orden {
    const orden: Orden = {
        id: uuidv4(),
        numero_orden: generarNumeroOrden(),
        usuario_id: carrito.usuario_id,
        items: [...carrito.items],
        total: carrito.total,
        moneda: carrito.moneda,
        estado: "pendiente",
        datos_comprador: datosComprador,
        fecha_creacion: new Date(),
        fecha_actualizacion: new Date(),
    };

    DB_STORAGE.ordenes.set(orden.id, orden);

    console.log(`📝 Orden creada: ${orden.numero_orden}`);

    return orden;
}

export function actualizarEstadoOrden(
    ordenId: string,
    nuevoEstado: Orden["estado"],
): void {
    const orden = DB_STORAGE.ordenes.get(ordenId);

    if (orden) {
        orden.estado = nuevoEstado;
        orden.fecha_actualizacion = new Date();
        DB_STORAGE.ordenes.set(ordenId, orden);

        console.log(
            `📋 Orden ${orden.numero_orden} actualizada a: ${nuevoEstado}`,
        );
    }
}

export function obtenerOrden(ordenId: string): Orden | undefined {
    return DB_STORAGE.ordenes.get(ordenId);
}

export function obtenerOrdenesPorUsuario(usuarioId: string): Orden[] {
    return Array.from(DB_STORAGE.ordenes.values())
        .filter((o) => o.usuario_id === usuarioId)
        .sort(
            (a, b) => b.fecha_creacion.getTime() - a.fecha_creacion.getTime(),
        );
}

function generarNumeroOrden(): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0");

    return `ORD-${año}${mes}${dia}-${random}`;
}
