// src/api/carrito.routes.ts
import { Router, Request, Response } from "express";
import * as carritoService from "../domain/carrito/carrito.service";
import { success, error } from "../utils/response.utils";

const router = Router();

/**
 * GET /api/carrito/:usuario_id
 * Obtener carrito de un usuario
 */
router.get("/:usuario_id", (req: Request, res: Response) => {
    try {
        const { usuario_id } = req.params;
        const carrito = carritoService.obtenerCarrito(usuario_id);
        res.json(success(carrito));
    } catch (err) {
        res.status(500).json(
            error("ERROR_INTERNO", "Error al obtener carrito"),
        );
    }
});

/**
 * POST /api/carrito/:usuario_id/items
 * Agregar producto al carrito
 * Body: { producto_id: string, cantidad: number }
 */
router.post("/:usuario_id/items", (req: Request, res: Response) => {
    try {
        const { usuario_id } = req.params;
        const { producto_id, cantidad } = req.body;

        if (!producto_id || !cantidad) {
            return res
                .status(400)
                .json(
                    error(
                        "DATOS_INCOMPLETOS",
                        "producto_id y cantidad son requeridos",
                    ),
                );
        }

        if (cantidad <= 0) {
            return res
                .status(400)
                .json(
                    error(
                        "CANTIDAD_INVALIDA",
                        "La cantidad debe ser mayor a 0",
                    ),
                );
        }

        const resultado = carritoService.agregarProducto(
            usuario_id,
            producto_id,
            cantidad,
        );

        if (!resultado.success) {
            return res
                .status(400)
                .json(
                    error(
                        "ERROR_AGREGAR",
                        resultado.error || "Error al agregar producto",
                    ),
                );
        }

        res.json(success(resultado.carrito, "Producto agregado al carrito"));
    } catch (err) {
        res.status(500).json(
            error("ERROR_INTERNO", "Error al agregar producto"),
        );
    }
});

/**
 * PATCH /api/carrito/:usuario_id/items/:producto_id
 * Actualizar cantidad de un producto
 * Body: { cantidad: number }
 */
router.patch(
    "/:usuario_id/items/:producto_id",
    (req: Request, res: Response) => {
        try {
            const { usuario_id, producto_id } = req.params;
            const { cantidad } = req.body;

            if (cantidad === undefined) {
                return res
                    .status(400)
                    .json(
                        error("CANTIDAD_REQUERIDA", "La cantidad es requerida"),
                    );
            }

            const resultado = carritoService.actualizarCantidad(
                usuario_id,
                producto_id,
                cantidad,
            );

            if (!resultado.success) {
                return res
                    .status(400)
                    .json(
                        error(
                            "ERROR_ACTUALIZAR",
                            resultado.error || "Error al actualizar cantidad",
                        ),
                    );
            }

            res.json(success(resultado.carrito, "Cantidad actualizada"));
        } catch (err) {
            res.status(500).json(
                error("ERROR_INTERNO", "Error al actualizar cantidad"),
            );
        }
    },
);

/**
 * DELETE /api/carrito/:usuario_id/items/:producto_id
 * Eliminar producto del carrito
 */
router.delete(
    "/:usuario_id/items/:producto_id",
    (req: Request, res: Response) => {
        try {
            const { usuario_id, producto_id } = req.params;
            const carrito = carritoService.eliminarProducto(
                usuario_id,
                producto_id,
            );
            res.json(success(carrito, "Producto eliminado del carrito"));
        } catch (err) {
            res.status(500).json(
                error("ERROR_INTERNO", "Error al eliminar producto"),
            );
        }
    },
);

/**
 * DELETE /api/carrito/:usuario_id
 * Vaciar carrito completo
 */
router.delete("/:usuario_id", (req: Request, res: Response) => {
    try {
        const { usuario_id } = req.params;
        carritoService.vaciarCarrito(usuario_id);
        const carritoVacio = carritoService.obtenerCarrito(usuario_id);
        res.json(success(carritoVacio, "Carrito vaciado"));
    } catch (err) {
        res.status(500).json(error("ERROR_INTERNO", "Error al vaciar carrito"));
    }
});

export default router;
