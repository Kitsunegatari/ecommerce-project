// src/server.ts
import express, { Application, Request, Response } from "express";
import productosRoutes from "./api/productos.routes";
import busquedaRoutes from "./api/busqueda.routes";
import carritoRoutes from "./api/carrito.routes";
import pagosRoutes from "./api/pagos.routes";

const app: Application = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

// ==========================================
// MIDDLEWARES
// ==========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req: Request, res: Response, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// ==========================================
// ROUTES
// ==========================================

// Health check
app.get("/", (req: Request, res: Response) => {
    res.json({
        status: "ok",
        message: "E-Commerce API v1.0",
        timestamp: new Date().toISOString(),
        endpoints: {
            productos: "/api/productos",
            busqueda: "/api/busqueda",
            carrito: "/api/carrito/:usuario_id",
            pagos: "/api/pagos",
            docs: "/api/docs",
        },
    });
});

// API Documentation
app.get("/api/docs", (req: Request, res: Response) => {
    res.json({
        version: "1.0.0",
        endpoints: {
            productos: {
                "GET /api/productos": "Obtener todos los productos activos",
                "GET /api/productos/:id": "Obtener producto por ID",
                "GET /api/productos/tipos/disponibles":
                    "Obtener tipos de productos",
            },
            busqueda: {
                "GET /api/busqueda?q=termino": "Búsqueda avanzada de productos",
                "GET /api/busqueda/sugerencias?q=termino":
                    "Obtener sugerencias",
            },
            carrito: {
                "GET /api/carrito/:usuario_id": "Obtener carrito",
                "POST /api/carrito/:usuario_id/items":
                    "Agregar producto al carrito",
                "PATCH /api/carrito/:usuario_id/items/:producto_id":
                    "Actualizar cantidad",
                "DELETE /api/carrito/:usuario_id/items/:producto_id":
                    "Eliminar producto",
                "DELETE /api/carrito/:usuario_id": "Vaciar carrito",
            },
            pagos: {
                "POST /api/pagos/procesar": "Procesar pago",
                "GET /api/pagos/tarjetas-prueba": "Obtener tarjetas de prueba",
                "GET /api/pagos/ordenes/:usuario_id":
                    "Obtener órdenes del usuario",
                "GET /api/pagos/transacciones/:usuario_id":
                    "Obtener transacciones del usuario",
            },
        },
        tarjetas_prueba: {
            exitosa: "4111 1111 1111 1111",
            fondos_insuficientes: "4000 0000 0000 0002",
            tarjeta_robada: "4000 0000 0000 0069",
        },
    });
});

// API Routes
app.use("/api/productos", productosRoutes);
app.use("/api/busqueda", busquedaRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/pagos", pagosRoutes);

// ==========================================
// ERROR HANDLERS
// ==========================================

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: {
            codigo: "RUTA_NO_ENCONTRADA",
            mensaje: `Ruta ${req.method} ${req.url} no encontrada`,
        },
    });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: any) => {
    console.error("Error global:", err);
    res.status(500).json({
        success: false,
        error: {
            codigo: "ERROR_INTERNO",
            mensaje: "Error interno del servidor",
        },
    });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log("\n🚀 ==========================================");
    console.log("   E-COMMERCE API - SERVIDOR INICIADO");
    console.log("==========================================");
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`Docs: http://localhost:${PORT}/api/docs`);
    console.log(`Búsqueda: http://localhost:${PORT}/api/busqueda?q=dragon`);
    console.log(`Carrito: http://localhost:${PORT}/api/carrito/:usuario_id`);
    console.log(`Pagos: http://localhost:${PORT}/api/pagos/procesar`);
    console.log("==========================================\n");
});

export default app;
