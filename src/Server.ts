import express, { Application, Request, Response } from "express";
import * as searchController from "./controllers/SearchController";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTAS EXISTENTES

app.get("/", (_req: Request, res: Response) => {
    res.send("Servidor del módulo E-Commerce funcionando 🚀");
});

app.get("/api/test", (_req: Request, res: Response) => {
    res.json({ mensaje: "API funcionando correctamente" });
});

// RUTAS DE BÚSQUEDA AVANZADA

/**
 * GET /api/busqueda?q=termino
 * Búsqueda avanzada de productos
 */
app.get("/api/busqueda", searchController.buscarProductos);

/**
 * GET /api/busqueda/sugerencias?q=termino
 * Obtener sugerencias para autocompletado
 */
app.get("/api/busqueda/sugerencias", searchController.obtenerSugerencias);

/**
 * GET /api/busqueda/estadisticas
 * Obtener estadísticas del catálogo
 */
app.get("/api/busqueda/estadisticas", searchController.obtenerEstadisticas);

// MANEJO DE ERRORES 404

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        ruta: req.path,
        metodo: req.method,
        rutas_disponibles: {
            busqueda: "GET /api/busqueda?q=termino",
            sugerencias: "GET /api/busqueda/sugerencias?q=termino",
            estadisticas: "GET /api/busqueda/estadisticas",
        },
    });
});

// INICIAR SERVIDOR

const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`\nEndpoints disponibles:`);
    console.log(` Búsqueda: http://localhost:${PORT}/api/busqueda?q=dragon`);
    console.log(
        ` Sugerencias: http://localhost:${PORT}/api/busqueda/sugerencias?q=dra`,
    );
    console.log(
        ` Estadísticas: http://localhost:${PORT}/api/busqueda/estadisticas`,
    );
});

export default app;
