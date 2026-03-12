// src/api/pagos.routes.ts
import { Router, Request, Response } from "express";
import * as pagosService from "../domain/pagos/pagos.service";
import * as pasarelaService from "../domain/pagos/pasarela.service";
import * as ordenService from "../domain/pagos/orden.service";
import { SolicitudPago } from "../types/pago.types";
import { success, error } from "../utils/response.utils";
import { validarEmail } from "../utils/validation.utils";

const router = Router();

/**
 * POST /api/pagos/procesar
 * Procesar pago
 *
 * Body: {
 *   usuario_id: string,
 *   metodo_pago: 'tarjeta_credito',
 *   datos_tarjeta: {
 *     numero: string,
 *     nombre_titular: string,
 *     fecha_vencimiento: string,
 *     cvv: string,
 *     tipo: 'visa' | 'mastercard' | 'amex' | 'diners'
 *   },
 *   datos_comprador: {
 *     nombre: string,
 *     email: string,
 *     telefono?: string,
 *     documento?: string,
 *     direccion?: {
 *       calle: string,
 *       ciudad: string,
 *       departamento: string,
 *       codigo_postal?: string
 *     }
 *   }
 * }
 */
router.post("/procesar", async (req: Request, res: Response) => {
    try {
        const solicitud: SolicitudPago = req.body;

        // Validaciones básicas
        if (!solicitud.usuario_id) {
            return res
                .status(400)
                .json(error("USUARIO_REQUERIDO", "usuario_id es requerido"));
        }

        if (!solicitud.datos_tarjeta) {
            return res
                .status(400)
                .json(error("TARJETA_REQUERIDA", "datos_tarjeta es requerido"));
        }

        if (!solicitud.datos_comprador) {
            return res
                .status(400)
                .json(
                    error(
                        "COMPRADOR_REQUERIDO",
                        "datos_comprador es requerido",
                    ),
                );
        }

        if (
            !solicitud.datos_comprador.nombre ||
            !solicitud.datos_comprador.email
        ) {
            return res
                .status(400)
                .json(
                    error(
                        "DATOS_INCOMPLETOS",
                        "nombre y email del comprador son requeridos",
                    ),
                );
        }

        if (!validarEmail(solicitud.datos_comprador.email)) {
            return res
                .status(400)
                .json(error("EMAIL_INVALIDO", "El email es inválido"));
        }

        // Procesar pago
        const resultado = await pagosService.procesarPago(solicitud);

        if (resultado.exitoso) {
            res.json(success(resultado, "Pago procesado exitosamente"));
        } else {
            res.status(400).json({
                success: false,
                ...resultado,
            });
        }
    } catch (err) {
        console.error("Error en POST /api/pagos/procesar:", err);
        res.status(500).json(error("ERROR_INTERNO", "Error al procesar pago"));
    }
});

/**
 * GET /api/pagos/tarjetas-prueba
 * Obtener tarjetas de prueba para testing
 */
router.get("/tarjetas-prueba", (req: Request, res: Response) => {
    try {
        const tarjetas = pasarelaService.obtenerTarjetasPrueba();
        res.json(success(tarjetas));
    } catch (err) {
        res.status(500).json(
            error("ERROR_INTERNO", "Error al obtener tarjetas de prueba"),
        );
    }
});

/**
 * GET /api/pagos/ordenes/:usuario_id
 * Obtener órdenes de un usuario
 */
router.get("/ordenes/:usuario_id", (req: Request, res: Response) => {
    try {
        const { usuario_id } = req.params;
        const ordenes = ordenService.obtenerOrdenesPorUsuario(usuario_id);
        res.json(success(ordenes));
    } catch (err) {
        res.status(500).json(
            error("ERROR_INTERNO", "Error al obtener órdenes"),
        );
    }
});

/**
 * GET /api/pagos/ordenes/:usuario_id/:orden_id
 * Obtener una orden específica
 */
router.get("/ordenes/:usuario_id/:orden_id", (req: Request, res: Response) => {
    try {
        const { orden_id } = req.params;
        const orden = ordenService.obtenerOrden(orden_id);

        if (!orden) {
            return res
                .status(404)
                .json(error("ORDEN_NO_ENCONTRADA", "Orden no encontrada"));
        }

        res.json(success(orden));
    } catch (err) {
        res.status(500).json(error("ERROR_INTERNO", "Error al obtener orden"));
    }
});

/**
 * GET /api/pagos/transacciones/:usuario_id
 * Obtener transacciones de un usuario
 */
router.get("/transacciones/:usuario_id", (req: Request, res: Response) => {
    try {
        const { usuario_id } = req.params;
        const transacciones =
            pagosService.obtenerTransaccionesPorUsuario(usuario_id);
        res.json(success(transacciones));
    } catch (err) {
        res.status(500).json(
            error("ERROR_INTERNO", "Error al obtener transacciones"),
        );
    }
});

export default router;
