// src/data/productos.data.ts
import { Producto } from "../types/producto.types";

export const PRODUCTOS_MOCK: Producto[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        nombre: "Dragón de Fuego Ancestral",
        imagen_url:
            "https://via.placeholder.com/300x400/FF6B6B/fff?text=Dragon",
        descripcion:
            "Un poderoso dragón ancestral que domina las llamas del infierno. Criatura legendaria capaz de reducir a cenizas ejércitos enteros.",
        habilidades: {
            principal: "Aliento de Fuego Infernal",
            secundarias: [
                "Vuelo Rápido",
                "Garras Devastadoras",
                "Cola Destructora",
            ],
            efectos: [
                "+50% daño de fuego",
                "Resistencia al fuego: 100%",
                "Intimidación: -20% ataque enemigo",
            ],
        },
        tipo: "heroe",
        cantidad_inventario: 15,
        precio_creditos: 5000,
        precio_real: 25.99,
        precio_real_moneda: "USD",
        estado: "activo",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440002",
        nombre: "Hechizo de Congelación Masiva",
        imagen_url: "https://via.placeholder.com/300x400/4ECDC4/fff?text=Hielo",
        descripcion:
            "Hechizo de nivel avanzado que congela a todos los enemigos en el campo de batalla.",
        habilidades: {
            principal: "Congelación Total",
            secundarias: ["Ralentización Extrema", "Escudo de Escarcha"],
            efectos: [
                "Congela enemigos por 2 turnos",
                "Reduce velocidad en 60%",
                "Daño área: 200",
            ],
        },
        tipo: "habilidad",
        cantidad_inventario: 50,
        precio_creditos: 3000,
        precio_real: 15.99,
        precio_real_moneda: "USD",
        estado: "activo",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440003",
        nombre: "Espada Legendaria Excalibur",
        imagen_url:
            "https://via.placeholder.com/300x400/FFD93D/333?text=Excalibur",
        descripcion:
            "La espada más poderosa jamás forjada. Solo los héroes más dignos pueden empuñarla.",
        habilidades: {
            principal: "Corte Dimensional",
            secundarias: ["Aura de Justicia", "Escudo de Luz"],
            efectos: [
                "Daño físico: +500",
                "Ignora armadura",
                "+100% crítico vs oscuridad",
            ],
        },
        tipo: "epica",
        cantidad_inventario: 1,
        precio_creditos: 15000,
        precio_real: 99.99,
        precio_real_moneda: "USD",
        estado: "unico",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440004",
        nombre: "Armadura del Paladín Divino",
        imagen_url:
            "https://via.placeholder.com/300x400/95E1D3/333?text=Armadura",
        descripcion:
            "Armadura sagrada forjada con acero celestial y bendecida por los dioses.",
        habilidades: {
            principal: "Escudo Divino",
            secundarias: ["Aura de Protección", "Purificación"],
            efectos: [
                "Defensa física: +200",
                "Resistencia mágica: +150",
                "Inmunidad a maldiciones",
            ],
        },
        tipo: "armadura",
        cantidad_inventario: 12,
        precio_creditos: 6000,
        precio_real: 29.99,
        precio_real_moneda: "USD",
        estado: "activo",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440005",
        nombre: "Poción de Inmortalidad Temporal",
        imagen_url:
            "https://via.placeholder.com/300x400/A8E6CF/333?text=Pocion",
        descripcion:
            "Elixir místico que otorga invulnerabilidad temporal al consumidor.",
        habilidades: {
            principal: "Invulnerabilidad Temporal",
            secundarias: ["Regeneración Acelerada", "Aumento de Velocidad"],
            efectos: [
                "Inmune a daño por 3 turnos",
                "Regenera 100% vida",
                "+50% velocidad",
            ],
        },
        tipo: "item",
        cantidad_inventario: 30,
        precio_creditos: 2500,
        precio_real: 12.99,
        precio_real_moneda: "USD",
        estado: "activo",
    },
];
