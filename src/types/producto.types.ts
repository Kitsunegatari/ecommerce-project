
/**
 * Tipos válidos de producto
 */
export type TipoProducto =
    | "heroe"
    | "habilidad"
    | "arma"
    | "armadura"
    | "item"
    | "epica";

/**
 * Estados posibles de un producto
 */
export type EstadoProducto = "activo" | "unico" | "suspendido";

/**
 * Monedas soportadas para precios reales
 */
export type Moneda = "USD" | "EUR" | "COP";

/**
 * Estructura de habilidades de un producto
 */
export interface Habilidades {
    principal: string;
    secundarias: string[];
    efectos: string[];
}

/**
 * Interfaz principal del Producto
 */
export interface Producto {
    id: string;
    nombre: string;
    imagen_url: string;
    descripcion: string;
    habilidades: Habilidades;
    tipo: TipoProducto;
    cantidad_inventario: number;
    precio_creditos: number;
    precio_real: number;
    precio_real_moneda: Moneda;
    estado: EstadoProducto;
}

/**
 * Producto con score de relevancia (uso interno)
 */
export interface ProductoConRelevancia extends Producto {
    relevanceScore: number;
}

/**
 * Filtros para búsqueda de productos
 */
export interface FiltrosBusqueda {
    tipo?: string;
    estado?: string;
    precio_min?: number;
    precio_max?: number;
}

/**
 * Respuesta de búsqueda
 */
export interface RespuestaBusqueda {
    success: boolean;
    query: string;
    resultados: number;
    filtros_aplicados?: FiltrosBusqueda;
    productos: Producto[];
    error?: string;
    mensaje?: string;
}

/**
 * Sugerencia de búsqueda
 */
export interface Sugerencia {
    id: string;
    nombre: string;
    tipo: TipoProducto;
    precio_creditos: number;
    imagen_url: string;
}

/**
 * Respuesta de sugerencias
 */
export interface RespuestaSugerencias {
    success: boolean;
    query: string;
    cantidad: number;
    sugerencias: Sugerencia[];
}

/**
 * Estadísticas del catálogo
 */
export interface Estadisticas {
    total_productos: number;
    por_tipo: Record<TipoProducto, number>;
    por_estado: Record<EstadoProducto, number>;
    rango_precios: {
        min_creditos: number;
        max_creditos: number;
        min_real: number;
        max_real: number;
    };
    stock_total: number;
}

/**
 * Respuesta de estadísticas
 */
export interface RespuestaEstadisticas {
    success: boolean;
    estadisticas: Estadisticas;
}

/**
 * Resultado de validación
 */
export interface ResultadoValidacion {
    valid: boolean;
    error?: string;
}
