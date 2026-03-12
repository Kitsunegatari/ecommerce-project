// src/domain/pagos/pagos.service.ts
import { v4 as uuidv4 } from "uuid";
import {
    SolicitudPago,
    Transaccion,
    ComprobantePago,
} from "../../types/pago.types";
import { DB_STORAGE } from "../../data/storage.data";
import * as carritoService from "../carrito/carrito.service";
import * as ordenService from "./orden.service";
import * as pasarelaService from "./pasarela.service";
import * as productosRepo from "../productos/productos.repository";
import { enmascarar } from "../../utils/validation.utils";

export async function procesarPago(solicitud: SolicitudPago) {
    console.log(`\n💳 ==========================================`);
    console.log(`   INICIANDO PROCESO DE PAGO`);
    console.log(`==========================================`);

    try {
        // 1. Obtener carrito
        const carrito = carritoService.obtenerCarrito(solicitud.usuario_id);

        if (carrito.items.length === 0) {
            return {
                exitoso: false,
                estado: "error" as const,
                mensaje: "El carrito está vacío",
                error: {
                    codigo: "CARRITO_VACIO",
                    mensaje: "No hay productos en el carrito",
                },
            };
        }

        // 2. Verificar stock
        console.log(`📦 Verificando stock...`);
        const verificacionStock = carritoService.verificarStock(carrito);

        if (!verificacionStock.valido) {
            return {
                exitoso: false,
                estado: "error" as const,
                mensaje: "Problemas con el stock",
                error: {
                    codigo: "STOCK_INSUFICIENTE",
                    mensaje: verificacionStock.errores.join(", "),
                },
            };
        }

        // 3. Crear orden
        const orden = ordenService.crearOrden(
            carrito,
            solicitud.datos_comprador,
        );

        // 4. Procesar pago con pasarela
        const respuestaPasarela = await pasarelaService.procesarPago(
            carrito.total,
            carrito.moneda,
            solicitud.datos_tarjeta,
            orden.numero_orden,
        );

        // 5. Crear transacción
        const transaccion = crearTransaccion(
            orden.id,
            solicitud,
            respuestaPasarela,
        );

        // 6. Si pago exitoso
        if (respuestaPasarela.exitoso) {
            // Actualizar orden
            ordenService.actualizarEstadoOrden(orden.id, "pagada");

            // Actualizar stock
            actualizarStockProductos(carrito);

            // Vaciar carrito
            carritoService.vaciarCarrito(solicitud.usuario_id);

            // Crear comprobante
            const comprobante = crearComprobante(orden, transaccion);

            console.log(`✅ PAGO COMPLETADO EXITOSAMENTE`);
            console.log(`==========================================\n`);

            return {
                exitoso: true,
                estado: "exitoso" as const,
                mensaje: "Pago procesado exitosamente",
                orden: ordenService.obtenerOrden(orden.id),
                transaccion,
                comprobante,
            };
        } else {
            // Pago rechazado
            ordenService.actualizarEstadoOrden(orden.id, "rechazada");

            console.log(`❌ PAGO RECHAZADO`);
            console.log(`==========================================\n`);

            return {
                exitoso: false,
                estado: respuestaPasarela.estado,
                mensaje: respuestaPasarela.mensaje,
                orden: ordenService.obtenerOrden(orden.id),
                transaccion,
                error: {
                    codigo: respuestaPasarela.codigo_error || "PAGO_RECHAZADO",
                    mensaje:
                        respuestaPasarela.detalles_error ||
                        "El pago fue rechazado",
                },
            };
        }
    } catch (error) {
        console.error("❌ Error procesando pago:", error);
        console.log(`==========================================\n`);

        return {
            exitoso: false,
            estado: "error" as const,
            mensaje: "Error al procesar el pago",
            error: {
                codigo: "ERROR_INTERNO",
                mensaje:
                    error instanceof Error
                        ? error.message
                        : "Error desconocido",
            },
        };
    }
}

function crearTransaccion(
    ordenId: string,
    solicitud: SolicitudPago,
    respuestaPasarela: any,
): Transaccion {
    const transaccion: Transaccion = {
        id: uuidv4(),
        orden_id: ordenId,
        usuario_id: solicitud.usuario_id,
        metodo_pago: solicitud.metodo_pago,
        monto: carritoService.obtenerCarrito(solicitud.usuario_id).total,
        moneda: "USD",
        estado: respuestaPasarela.estado,
        codigo_transaccion: respuestaPasarela.codigo_transaccion,
        codigo_autorizacion: respuestaPasarela.codigo_autorizacion,
        ultimos_4_digitos: solicitud.datos_tarjeta.numero.slice(-4),
        tipo_tarjeta: solicitud.datos_tarjeta.tipo,
        mensaje: respuestaPasarela.mensaje,
        codigo_error: respuestaPasarela.codigo_error,
        fecha_creacion: new Date(),
        fecha_procesamiento: respuestaPasarela.fecha_procesamiento,
    };

    DB_STORAGE.transacciones.set(transaccion.id, transaccion);

    return transaccion;
}

function crearComprobante(
    orden: any,
    transaccion: Transaccion,
): ComprobantePago {
    return {
        orden,
        transaccion,
        productos: orden.items,
        total_pagado: orden.total,
        moneda: orden.moneda,
        fecha_pago: transaccion.fecha_procesamiento || new Date(),
    };
}

function actualizarStockProductos(carrito: any): void {
    console.log(`📦 Actualizando stock...`);

    for (const item of carrito.items) {
        productosRepo.actualizarStock(item.producto_id, item.cantidad);
        console.log(`   ✓ ${item.nombre}: -${item.cantidad}`);
    }

    console.log(`✅ Stock actualizado`);
}

export function obtenerTransaccionesPorUsuario(
    usuarioId: string,
): Transaccion[] {
    return Array.from(DB_STORAGE.transacciones.values())
        .filter((t) => t.usuario_id === usuarioId)
        .sort(
            (a, b) => b.fecha_creacion.getTime() - a.fecha_creacion.getTime(),
        );
}
