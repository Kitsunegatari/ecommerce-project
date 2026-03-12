// src/api/busqueda.routes.ts
import { Router, Request, Response } from "express";
import * as busquedaService from "../domain/busqueda/busqueda.service";
import { FiltrosBusqueda } from "../types/producto.types";
import { success, error } from "../utils/response.utils";

const router = Router();

/**
 * GET /api/busqueda?q=termino&tipo=heroe&precio_max=5000
 * Búsqueda avanzada de productos
 */
router.get("/", (req: Request, res: Response) => {
    try {
        const { q, tipo, estado, precio_min, precio_max } = req.query;

        if (!q || typeof q !== "string") {
            return res
                .status(400)
                .json(
                    error("QUERY_REQUERIDO", 'El parámetro "q" es requerido'),
                );
        }

        const filtros: FiltrosBusqueda = {};

        if (tipo && typeof tipo === "string") filtros.tipo = tipo;
        if (estado && typeof estado === "string") filtros.estado = estado;
        if (precio_min) filtros.precio_min = parseFloat(precio_min as string);
        if (precio_max) filtros.precio_max = parseFloat(precio_max as string);

        const resultado = busquedaService.buscar(q, filtros);

        if (!resultado.success) {
            return res
                .status(400)
                .json(
                    error(
                        "BUSQUEDA_INVALIDA",
                        resultado.error || "Error en búsqueda",
                    ),
                );
        }

        res.json(success(resultado));
    } catch (err) {
        res.status(500).json(
            error("ERROR_INTERNO", "Error al realizar búsqueda"),
        );
    }
});

/**
 * GET /api/busqueda/sugerencias?q=dra&limit=5
 * Obtener sugerencias para autocompletado
 */
router.get("/sugerencias", (req: Request, res: Response) => {
    try {
        const { q, limit } = req.query;

        if (!q || typeof q !== "string") {
            return res.json(success([]));
        }

        const limitNum = limit ? parseInt(limit as string, 10) : 5;
        const sugerencias = busquedaService.obtenerSugerencias(q, limitNum);

        res.json(
            success({
                query: q,
                cantidad: sugerencias.length,
                sugerencias,
            }),
        );
    } catch (err) {
        res.status(500).json(
            error("ERROR_INTERNO", "Error al obtener sugerencias"),
        );
    }
});

export default router;
