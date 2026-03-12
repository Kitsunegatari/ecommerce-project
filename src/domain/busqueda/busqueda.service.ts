// src/domain/busqueda/busqueda.service.ts
import { Producto, FiltrosBusqueda } from "../../types/producto.types";
import * as productosRepo from "../productos/productos.repository";
import { searchProducts } from "../../utils/search.utils";

export function buscar(query: string, filtros: FiltrosBusqueda = {}) {
    // Validar query
    if (!query || query.trim().length < 2) {
        return {
            success: false,
            error: "El término de búsqueda debe tener al menos 2 caracteres",
            productos: [],
        };
    }

    let productos = productosRepo.findActivos();

    // Aplicar búsqueda de texto
    const productosConScore = searchProducts(productos, query);
    productos = productosConScore.map(
        ({ relevanceScore, ...producto }) => producto,
    );

    // Aplicar filtros
    if (filtros.tipo) {
        productos = productos.filter(
            (p) => p.tipo.toLowerCase() === filtros.tipo!.toLowerCase(),
        );
    }

    if (filtros.estado) {
        productos = productos.filter(
            (p) => p.estado.toLowerCase() === filtros.estado!.toLowerCase(),
        );
    }

    if (filtros.precio_min !== undefined) {
        productos = productos.filter(
            (p) => p.precio_creditos >= filtros.precio_min!,
        );
    }

    if (filtros.precio_max !== undefined) {
        productos = productos.filter(
            (p) => p.precio_creditos <= filtros.precio_max!,
        );
    }

    return {
        success: true,
        query: query.trim(),
        resultados: productos.length,
        filtros_aplicados: filtros,
        productos,
    };
}

export function obtenerSugerencias(query: string, limit: number = 5) {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const productos = productosRepo.findActivos();
    const productosConScore = searchProducts(productos, query);

    return productosConScore.slice(0, limit).map((p) => ({
        id: p.id,
        nombre: p.nombre,
        tipo: p.tipo,
        precio_creditos: p.precio_creditos,
        imagen_url: p.imagen_url,
    }));
}
