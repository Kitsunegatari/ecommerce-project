// src/api/productos.routes.ts
import { Router, Request, Response } from "express";
import * as productosService from "../domain/productos/productos.service";
import { success, error } from "../utils/response.utils";

const router = Router();

/**
 * GET /api/productos
 * Obtener todos los productos activos
 */
router.get("/", (req: Request, res: Response) => {
    try {
        const productos = productosService.obtenerActivos();
        res.json(success(productos));
    } catch (err) {
        res.status(500).json(
            error("ERROR_INTERNO", "Error al obtener productos"),
        );
    }
});

/**
 * GET /api/productos/:id
 * Obtener un producto por ID
 */
router.get("/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const producto = productosService.obtenerPorId(id);

        if (!producto) {
            return res
                .status(404)
                .json(
                    error("PRODUCTO_NO_ENCONTRADO", "Producto no encontrado"),
                );
        }

        res.json(success(producto));
    } catch (err) {
        res.status(500).json(
            error("ERROR_INTERNO", "Error al obtener producto"),
        );
    }
});

/**
 * GET /api/productos/tipos/disponibles
 * Obtener tipos de productos disponibles
 */
router.get("/tipos/disponibles", (req: Request, res: Response) => {
    try {
        const tipos = productosService.obtenerTiposDisponibles();
        res.json(success(tipos));
    } catch (err) {
        res.status(500).json(error("ERROR_INTERNO", "Error al obtener tipos"));
    }
});

export default router;
