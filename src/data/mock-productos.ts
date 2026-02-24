// src/data/productos-mock.ts
import { Producto } from "../types/producto.types";

export const productosMock: Producto[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        nombre: "Dragón de Fuego Ancestral",
        imagen_url: "https://placeholder.com/dragon-fuego.jpg",
        descripcion:
            "Un poderoso dragón ancestral que domina las llamas del infierno. Criatura legendaria capaz de reducir a cenizas ejércitos enteros con su aliento de fuego. Su presencia en el campo de batalla inspira terror en sus enemigos y valor en sus aliados.",
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
                "Intimidación: reduce ataque enemigo en 20%",
                "Regeneración de vida: 5% por turno",
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
        imagen_url: "https://placeholder.com/hechizo-hielo.jpg",
        descripcion:
            "Hechizo de nivel avanzado que congela a todos los enemigos en el campo de batalla, dejándolos vulnerables durante varios turnos. El poder del hielo eterno se manifiesta en forma de cristales que atrapan a los adversarios.",
        habilidades: {
            principal: "Congelación Total",
            secundarias: [
                "Ralentización Extrema",
                "Escudo de Escarcha",
                "Explosión de Hielo",
            ],
            efectos: [
                "Congela a todos los enemigos por 2 turnos",
                "Reduce velocidad en 60%",
                "Daño de área: 200 puntos",
                "Inmunidad a fuego durante el hechizo",
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
        nombre: "Arco Élfico del Bosque Sagrado",
        imagen_url: "https://placeholder.com/arco-elfico.jpg",
        descripcion:
            "Arco legendario forjado por los maestros artesanos élficos del bosque milenario. Sus flechas nunca fallan y pueden atravesar las armaduras más resistentes. Bendecido por los espíritus del bosque.",
        habilidades: {
            principal: "Disparo Certero",
            secundarias: [
                "Flecha Perforante",
                "Lluvia de Flechas",
                "Sigilo Élfico",
            ],
            efectos: [
                "Precisión: 100%",
                "Ignora 40% de armadura",
                "+30% daño crítico",
                "Visión nocturna perfecta",
            ],
        },
        tipo: "arma",
        cantidad_inventario: 8,
        precio_creditos: 4500,
        precio_real: 22.99,
        precio_real_moneda: "USD",
        estado: "unico",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440007",
        nombre: "Espada Legendaria Excalibur",
        imagen_url: "https://placeholder.com/excalibur.jpg",
        descripcion:
            "La espada más poderosa jamás forjada, creada en las profundidades de Avalon por el mismísimo Merlín. Solo los héroes más dignos pueden empuñarla. Su filo nunca se desafila y puede cortar cualquier material conocido.",
        habilidades: {
            principal: "Corte Dimensional",
            secundarias: [
                "Aura de Justicia",
                "Escudo de Luz",
                "Teletransportación",
            ],
            efectos: [
                "Daño físico: +500",
                "Ignora toda armadura",
                "Daño sagrado adicional: +300",
                "+100% daño crítico contra enemigos oscuros",
                "Durabilidad infinita",
                "Aumenta todas las estadísticas del héroe en 50%",
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
        id: "550e8400-e29b-41d4-a716-446655440005",
        nombre: "Mago Oscuro del Abismo",
        imagen_url: "https://placeholder.com/mago-oscuro.jpg",
        descripcion:
            "Invocador supremo de las sombras y maestro de la magia negra. Ha dominado los secretos prohibidos del abismo y puede manipular la energía oscura a voluntad.",
        habilidades: {
            principal: "Rayo de Oscuridad Absoluta",
            secundarias: [
                "Invocar Sombras",
                "Drenaje de Vida",
                "Portal al Vacío",
            ],
            efectos: [
                "Daño oscuro: 500 puntos",
                "Drena 30% de vida del enemigo",
                "Invoca 3 sombras aliadas",
                "Regeneración mágica: +50 mana por turno",
                "Reduce defensa enemiga en 25%",
            ],
        },
        tipo: "heroe",
        cantidad_inventario: 20,
        precio_creditos: 5500,
        precio_real: 27.99,
        precio_real_moneda: "USD",
        estado: "activo",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440008",
        nombre: "Habilidad: Invocar Fénix",
        imagen_url: "https://placeholder.com/invocar-fenix.jpg",
        descripcion:
            "Habilidad suprema de invocación que materializa un fénix inmortal en el campo de batalla. Esta criatura mítica puede renacer de sus cenizas infinitas veces durante el combate.",
        habilidades: {
            principal: "Invocación del Fénix Inmortal",
            secundarias: [
                "Renacimiento Automático",
                "Fuego Purificador",
                "Vuelo Etéreo",
            ],
            efectos: [
                "Invoca Fénix con 5000 HP",
                "Renace automáticamente al morir",
                "Daño de fuego de área: 300/turno",
                "Cura aliados cercanos: 200 HP/turno",
                "Inmune a control mental",
                "Duración: hasta el final de la batalla",
            ],
        },
        tipo: "habilidad",
        cantidad_inventario: 25,
        precio_creditos: 7000,
        precio_real: 35.99,
        precio_real_moneda: "USD",
        estado: "activo",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440004",
        nombre: "Armadura del Paladín Divino",
        imagen_url: "https://placeholder.com/armadura-paladin.jpg",
        descripcion:
            "Armadura sagrada forjada con acero celestial y bendecida por los dioses. Protege a su portador no solo del daño físico, sino también de maldiciones y hechizos oscuros.",
        habilidades: {
            principal: "Escudo Divino",
            secundarias: [
                "Aura de Protección",
                "Purificación",
                "Regeneración Sagrada",
            ],
            efectos: [
                "Defensa física: +200",
                "Resistencia mágica: +150",
                "Inmunidad a maldiciones",
                "Regenera 10% vida por turno",
                "Refleja 20% del daño recibido",
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
        id: "550e8400-e29b-41d4-a716-446655440006",
        nombre: "Poción de Inmortalidad Temporal",
        imagen_url: "https://placeholder.com/pocion-inmortalidad.jpg",
        descripcion:
            "Elixir místico preparado con ingredientes raros del plano astral. Otorga invulnerabilidad temporal al consumidor.",
        habilidades: {
            principal: "Invulnerabilidad Temporal",
            secundarias: [
                "Regeneración Acelerada",
                "Aumento de Velocidad",
                "Escudo Mágico",
            ],
            efectos: [
                "Inmune a todo daño por 3 turnos",
                "Regenera 100% de vida",
                "+50% velocidad de movimiento",
                "No puede ser objetivo de hechizos",
                "Un solo uso por batalla",
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
