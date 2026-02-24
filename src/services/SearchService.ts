import { productosMock } from "../data/mock-productos";
import { searchProducts, validateSearchTerm } from "../utils/SearchUtils";
import {
    Producto,
    FiltrosBusqueda,
    RespuestaBusqueda,
    RespuestaSugerencias,
    RespuestaEstadisticas,
    Sugerencia,
    TipoProducto,
    EstadoProducto,
} from "../types/producto.types";

class SearchService {
    /**
     * Tipos válidos de producto
     */
    private readonly TIPOS_VALIDOS: TipoProducto[] = [
        "heroe",
        "habilidad",
        "arma",
        "armadura",
        "item",
        "epica",
    ];

    /**
     * Estados válidos de producto
     */
    private readonly ESTADOS_VALIDOS: EstadoProducto[] = ["activo", "unico"];

    /**
     * Buscar productos con término de búsqueda avanzada
     */
    buscarProductos(
        query: string,
        filters: FiltrosBusqueda = {},
    ): RespuestaBusqueda {
        try {
            // 1. Validar término de búsqueda
            const validation = validateSearchTerm(query);
            if (!validation.valid) {
                return {
                    success: false,
                    error: validation.error,
                    query: query || "",
                    resultados: 0,
                    productos: [],
                };
            }

            // 2. Obtener productos disponibles
            let productos: Producto[] = productosMock.filter(
                (p: Producto) =>
                    p.estado !== "suspendido" && p.cantidad_inventario > 0,
            );

            // 3. Aplicar búsqueda de texto
            const productosConScore = searchProducts(productos, query);
            productos = productosConScore.map(
                ({ relevanceScore, ...producto }) => producto,
            );

            // 4. Aplicar filtros adicionales
            if (filters.tipo) {
                const tipoFiltro = filters.tipo.toLowerCase() as TipoProducto;
                if (this.TIPOS_VALIDOS.includes(tipoFiltro)) {
                    productos = productos.filter(
                        (p: Producto) => p.tipo.toLowerCase() === tipoFiltro,
                    );
                }
            }

            if (filters.estado) {
                const estadoFiltro =
                    filters.estado.toLowerCase() as EstadoProducto;
                if (this.ESTADOS_VALIDOS.includes(estadoFiltro)) {
                    productos = productos.filter(
                        (p: Producto) =>
                            p.estado.toLowerCase() === estadoFiltro,
                    );
                }
            }

            if (filters.precio_max !== undefined) {
                productos = productos.filter(
                    (p: Producto) => p.precio_creditos <= filters.precio_max!,
                );
            }

            if (filters.precio_min !== undefined) {
                productos = productos.filter(
                    (p: Producto) => p.precio_creditos >= filters.precio_min!,
                );
            }

            // 5. Preparar respuesta
            return {
                success: true,
                query: query.trim(),
                resultados: productos.length,
                filtros_aplicados: filters,
                productos,
            };
        } catch (error) {
            console.error("Error en búsqueda de productos:", error);
            return {
                success: false,
                error: "Error al buscar productos",
                mensaje:
                    error instanceof Error
                        ? error.message
                        : "Error desconocido",
                query: query || "",
                resultados: 0,
                productos: [],
            };
        }
    }

    /**
     * Obtener sugerencias de búsqueda
     */
    obtenerSugerencias(query: string, limit: number = 5): RespuestaSugerencias {
        if (!query || query.trim().length < 2) {
            return {
                success: true,
                query,
                cantidad: 0,
                sugerencias: [],
            };
        }

        const productosDisponibles = productosMock.filter(
            (p: Producto) =>
                p.estado !== "suspendido" && p.cantidad_inventario > 0,
        );

        const productosConScore = searchProducts(productosDisponibles, query);

        const sugerencias: Sugerencia[] = productosConScore.slice(0, limit).map(
            (p): Sugerencia => ({
                id: p.id,
                nombre: p.nombre,
                tipo: p.tipo,
                precio_creditos: p.precio_creditos,
                imagen_url: p.imagen_url,
            }),
        );

        return {
            success: true,
            query: query.trim(),
            cantidad: sugerencias.length,
            sugerencias,
        };
    }

    /**
     * Obtener estadísticas del catálogo
     */
    obtenerEstadisticas(): RespuestaEstadisticas {
        const productosActivos = productosMock.filter(
            (p: Producto) =>
                p.estado !== "suspendido" && p.cantidad_inventario > 0,
        );

        const estadisticas: RespuestaEstadisticas["estadisticas"] = {
            total_productos: productosActivos.length,
            por_tipo: {} as Record<TipoProducto, number>,
            por_estado: {} as Record<EstadoProducto, number>,
            rango_precios: {
                min_creditos: Math.min(
                    ...productosActivos.map((p) => p.precio_creditos),
                ),
                max_creditos: Math.max(
                    ...productosActivos.map((p) => p.precio_creditos),
                ),
                min_real: Math.min(
                    ...productosActivos.map((p) => p.precio_real),
                ),
                max_real: Math.max(
                    ...productosActivos.map((p) => p.precio_real),
                ),
            },
            stock_total: productosActivos.reduce(
                (sum, p) => sum + p.cantidad_inventario,
                0,
            ),
        };

        // Inicializar contadores
        this.TIPOS_VALIDOS.forEach((tipo) => {
            estadisticas.por_tipo[tipo] = 0;
        });
        this.ESTADOS_VALIDOS.forEach((estado) => {
            estadisticas.por_estado[estado] = 0;
        });

        // Contar por tipo y estado
        productosActivos.forEach((p: Producto) => {
            estadisticas.por_tipo[p.tipo] =
                (estadisticas.por_tipo[p.tipo] || 0) + 1;

            if (p.estado === "activo" || p.estado === "unico") {
                estadisticas.por_estado[p.estado] =
                    (estadisticas.por_estado[p.estado] || 0) + 1;
            }
        });

        return {
            success: true,
            estadisticas,
        };
    }
}

export default new SearchService();
