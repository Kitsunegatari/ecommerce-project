// src/controllers/searchController.ts
import { Request, Response } from "express";
import searchService from "../services/SearchService";
import { FiltrosBusqueda } from "../types/producto.types";

/**
 * GET /api/busqueda
 * Endpoint principal de búsqueda de productos
 */
export const buscarProductos = (req: Request, res: Response): Response => {
    try {
        const { q, tipo, estado, precio_min, precio_max } = req.query;

        // Validar que exista término de búsqueda
        if (!q || typeof q !== "string") {
            return res.status(400).json({
                success: false,
                error: 'Parámetro de búsqueda "q" es requerido',
                ejemplo: "/api/busqueda?q=dragon",
                parametros_opcionales: {
                    tipo: "heroe | habilidad | arma | armadura | item | epica",
                    estado: "activo | unico",
                    precio_min: "número",
                    precio_max: "número",
                },
            });
        }

        // Preparar filtros opcionales
        const filters: FiltrosBusqueda = {};

        if (tipo && typeof tipo === "string") {
            filters.tipo = tipo;
        }

        if (estado && typeof estado === "string") {
            filters.estado = estado;
        }

        if (precio_min && typeof precio_min === "string") {
            const parsed = parseFloat(precio_min);
            if (!isNaN(parsed)) filters.precio_min = parsed;
        }

        if (precio_max && typeof precio_max === "string") {
            const parsed = parseFloat(precio_max);
            if (!isNaN(parsed)) filters.precio_max = parsed;
        }

        // Ejecutar búsqueda
        const resultado = searchService.buscarProductos(q, filters);

        // Determinar código de estado
        const statusCode = resultado.success ? 200 : 400;

        return res.status(statusCode).json(resultado);
    } catch (error) {
        console.error("Error en buscarProductos:", error);
        return res.status(500).json({
            success: false,
            error: "Error interno del servidor",
            mensaje:
                error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

/**
 * GET /api/busqueda/sugerencias
 * Endpoint para autocompletado de búsqueda
 */
export const obtenerSugerencias = (req: Request, res: Response): Response => {
    try {
        const { q, limit } = req.query;

        if (!q || typeof q !== "string" || q.trim().length < 2) {
            return res.json({
                success: true,
                query: q || "",
                cantidad: 0,
                sugerencias: [],
            });
        }

        const limitNum =
            limit && typeof limit === "string" ? parseInt(limit) : 5;

        const resultado = searchService.obtenerSugerencias(q, limitNum);

        return res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en obtenerSugerencias:", error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener sugerencias",
            mensaje:
                error instanceof Error ? error.message : "Error desconocido",
        });
    }
};

/**
 * GET /api/busqueda/estadisticas
 * Endpoint para obtener estadísticas del catálogo
 */
export const obtenerEstadisticas = (_req: Request, res: Response): Response => {
    try {
        const resultado = searchService.obtenerEstadisticas();
        return res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en obtenerEstadisticas:", error);
        return res.status(500).json({
            success: false,
            error: "Error al obtener estadísticas",
            mensaje:
                error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
