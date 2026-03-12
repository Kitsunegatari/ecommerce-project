// src/utils/search.utils.ts
import { Producto, ProductoConRelevancia } from "../types/producto.types";

export function normalizeText(text: string | undefined | null): string {
    if (!text) return "";
    return text
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export function matchesPartialWord(text: string, searchTerm: string): boolean {
    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(searchTerm);
    return normalizedText.includes(normalizedSearch);
}

export function habilidadesToText(
    habilidades: Producto["habilidades"],
): string {
    if (!habilidades) return "";

    let texto = "";
    if (habilidades.principal) texto += habilidades.principal + " ";
    if (habilidades.secundarias)
        texto += habilidades.secundarias.join(" ") + " ";
    if (habilidades.efectos) texto += habilidades.efectos.join(" ");

    return texto;
}

export function calculateRelevanceScore(
    producto: Producto,
    searchTerm: string,
): number {
    const normalizedSearch = normalizeText(searchTerm);
    let score = 0;

    if (normalizeText(producto.nombre) === normalizedSearch) score += 100;
    else if (matchesPartialWord(producto.nombre, searchTerm)) {
        score += 50;
        if (normalizeText(producto.nombre).startsWith(normalizedSearch))
            score += 25;
    }

    if (matchesPartialWord(producto.tipo, searchTerm)) score += 40;
    if (matchesPartialWord(producto.descripcion, searchTerm)) score += 30;

    const habilidadesText = habilidadesToText(producto.habilidades);
    if (matchesPartialWord(habilidadesText, searchTerm)) score += 25;

    if (producto.estado === "unico") score += 15;
    if (producto.tipo === "epica") score += 10;
    if (producto.cantidad_inventario < 10 && producto.cantidad_inventario > 0)
        score += 5;

    return score;
}

export function searchProducts(
    productos: Producto[],
    searchTerm: string,
): ProductoConRelevancia[] {
    if (!searchTerm || searchTerm.trim().length === 0) {
        return productos.map((p) => ({ ...p, relevanceScore: 0 }));
    }

    const normalizedSearch = normalizeText(searchTerm.trim());

    return productos
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
}
