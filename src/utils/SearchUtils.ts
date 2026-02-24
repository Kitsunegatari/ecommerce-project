import {
    Producto,
    ProductoConRelevancia,
    ResultadoValidacion,
} from "../types/producto.types";

/**
 * Normaliza texto para búsqueda insensible a mayúsculas/minúsculas y acentos
 */
export const normalizeText = (text: string | undefined | null): string => {
    if (!text) return "";
    return text
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

/**
 * Verifica si una palabra parcial coincide en un texto
 */
export const matchesPartialWord = (
    text: string,
    searchTerm: string,
): boolean => {
    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(searchTerm);
    return normalizedText.includes(normalizedSearch);
};

/**
 * Convierte objeto de habilidades a texto buscable
 */
export const habilidadesToText = (
    habilidades: Producto["habilidades"],
): string => {
    if (!habilidades || typeof habilidades !== "object") return "";

    let texto = "";

    if (habilidades.principal) {
        texto += habilidades.principal + " ";
    }

    if (Array.isArray(habilidades.secundarias)) {
        texto += habilidades.secundarias.join(" ") + " ";
    }

    if (Array.isArray(habilidades.efectos)) {
        texto += habilidades.efectos.join(" ");
    }

    return texto;
};

/**
 * Calcula score de relevancia basado en coincidencias
 */
export const calculateRelevanceScore = (
    producto: Producto,
    searchTerm: string,
): number => {
    const normalizedSearch = normalizeText(searchTerm);
    let score = 0;

    // 1. Coincidencia exacta en nombre +100
    if (normalizeText(producto.nombre) === normalizedSearch) {
        score += 100;
    }
    // Coincidencia parcial en nombre +50
    else if (matchesPartialWord(producto.nombre, searchTerm)) {
        score += 50;

        // Bonus si está al inicio +25
        if (normalizeText(producto.nombre).startsWith(normalizedSearch)) {
            score += 25;
        }
    }

    // 2. Coincidencia en tipo +40
    if (matchesPartialWord(producto.tipo, searchTerm)) {
        score += 40;
    }

    // 3. Coincidencia en descripción +30
    if (matchesPartialWord(producto.descripcion, searchTerm)) {
        score += 30;
    }

    // 4. Coincidencia en habilidades +25
    const habilidadesText = habilidadesToText(producto.habilidades);
    if (matchesPartialWord(habilidadesText, searchTerm)) {
        score += 25;

        if (
            producto.habilidades?.principal &&
            matchesPartialWord(producto.habilidades.principal, searchTerm)
        ) {
            score += 10;
        }
    }

    // 5. Bonus por estado
    if (producto.estado === "unico") {
        score += 15;
    }
    if (producto.tipo === "epica") {
        score += 10;
    }

    // 6. Bonus por disponibilidad
    if (producto.cantidad_inventario < 10 && producto.cantidad_inventario > 0) {
        score += 5;
    }

    return score;
};

/**
 * Filtra productos que coincidan con el término de búsqueda
 */
export const searchProducts = (
    productos: Producto[],
    searchTerm: string,
): ProductoConRelevancia[] => {
    if (!searchTerm || searchTerm.trim().length === 0) {
        return productos.map((p) => ({ ...p, relevanceScore: 0 }));
    }

    if (!Array.isArray(productos) || productos.length === 0) {
        return [];
    }

    const normalizedSearch = normalizeText(searchTerm.trim());

    const matchedProducts = productos
        .filter((producto: Producto) => {
            if (producto.estado === "suspendido") return false;
            if (producto.cantidad_inventario <= 0) return false;

            if (matchesPartialWord(producto.nombre, normalizedSearch))
                return true;
            if (matchesPartialWord(producto.descripcion, normalizedSearch))
                return true;
            if (matchesPartialWord(producto.tipo, normalizedSearch))
                return true;

            const habilidadesText = habilidadesToText(producto.habilidades);
            if (matchesPartialWord(habilidadesText, normalizedSearch))
                return true;

            return false;
        })
        .map(
            (producto: Producto): ProductoConRelevancia => ({
                ...producto,
                relevanceScore: calculateRelevanceScore(
                    producto,
                    normalizedSearch,
                ),
            }),
        )
        .sort((a, b) => {
            if (b.relevanceScore !== a.relevanceScore) {
                return b.relevanceScore - a.relevanceScore;
            }
            return a.cantidad_inventario - b.cantidad_inventario;
        });

    return matchedProducts;
};

/**
 * Valida si un término de búsqueda es válido
 */
export const validateSearchTerm = (searchTerm: string): ResultadoValidacion => {
    if (!searchTerm || typeof searchTerm !== "string") {
        return { valid: false, error: "Término de búsqueda requerido" };
    }

    const trimmed = searchTerm.trim();

    if (trimmed.length === 0) {
        return {
            valid: false,
            error: "Término de búsqueda no puede estar vacío",
        };
    }

    if (trimmed.length < 2) {
        return {
            valid: false,
            error: "Término de búsqueda debe tener al menos 2 caracteres",
        };
    }

    if (trimmed.length > 100) {
        return {
            valid: false,
            error: "Término de búsqueda demasiado largo (máximo 100 caracteres)",
        };
    }

    return { valid: true };
};
