// src/domain/pagos/pasarela.service.ts
import { v4 as uuidv4 } from "uuid";
import { DatosTarjeta, RespuestaPasarela } from "../../types/pago.types";
import { TARJETAS_PRUEBA } from "../../config/constants";
import {
    validarNumeroTarjeta,
    validarFechaVencimiento,
    validarCVV,
} from "../../utils/validation.utils";

export function validarTarjeta(datos: DatosTarjeta): {
    valida: boolean;
    errores: string[];
} {
    const errores: string[] = [];

    if (!validarNumeroTarjeta(datos.numero)) {
        errores.push("Número de tarjeta inválido");
    }

    if (!datos.nombre_titular || datos.nombre_titular.trim().length < 3) {
        errores.push("Nombre del titular inválido");
    }

    const validacionFecha = validarFechaVencimiento(datos.fecha_vencimiento);
    if (!validacionFecha.valida) {
        errores.push(validacionFecha.mensaje!);
    }

    if (!validarCVV(datos.cvv)) {
        errores.push("CVV inválido");
    }

    return {
        valida: errores.length === 0,
        errores,
    };
}

export async function procesarPago(
    monto: number,
    moneda: string,
    datosTarjeta: DatosTarjeta,
    referencia: string,
): Promise<RespuestaPasarela> {
    console.log(`\n🔒 ==========================================`);
    console.log(`   PROCESANDO PAGO - PASARELA SIMULADA`);
    console.log(`==========================================`);
    console.log(`💰 Monto: ${monto} ${moneda}`);
    console.log(`💳 Tarjeta: ****${datosTarjeta.numero.slice(-4)}`);
    console.log(`📝 Referencia: ${referencia}`);
    console.log(`==========================================\n`);

    // Validar tarjeta
    const validacion = validarTarjeta(datosTarjeta);
    if (!validacion.valida) {
        console.log(`❌ Validación fallida\n`);
        return crearRespuestaRechazada(
            "VALIDACION_FALLIDA",
            validacion.errores.join(", "),
        );
    }

    // Simular latencia
    const latencia = Math.random() * 1500 + 500;
    await sleep(latencia);

    // Determinar resultado
    const numeroLimpio = datosTarjeta.numero.replace(/\s/g, "");
    const resultado = determinarResultado(numeroLimpio);

    console.log(`${resultado.exitoso ? "✅" : "❌"} ${resultado.mensaje}\n`);

    return resultado;
}

function determinarResultado(numeroLimpio: string): RespuestaPasarela {
    // Tarjeta exitosa (por defecto)
    if (
        numeroLimpio === TARJETAS_PRUEBA.EXITOSA ||
        !(Object.values(TARJETAS_PRUEBA) as string[]).includes(numeroLimpio)
    ) {
        return crearRespuestaExitosa();
    }

    // Fondos insuficientes
    if (numeroLimpio === TARJETAS_PRUEBA.FONDOS_INSUFICIENTES) {
        return crearRespuestaRechazada(
            "FONDOS_INSUFICIENTES",
            "Fondos insuficientes",
        );
    }

    // Tarjeta robada
    if (numeroLimpio === TARJETAS_PRUEBA.TARJETA_ROBADA) {
        return crearRespuestaRechazada(
            "TARJETA_REPORTADA",
            "Tarjeta reportada",
        );
    }

    // Tarjeta vencida
    if (numeroLimpio === TARJETAS_PRUEBA.TARJETA_VENCIDA) {
        return crearRespuestaRechazada("TARJETA_VENCIDA", "Tarjeta vencida");
    }

    // CVV incorrecto
    if (numeroLimpio === TARJETAS_PRUEBA.CVV_INCORRECTO) {
        return crearRespuestaRechazada("CVV_INVALIDO", "CVV incorrecto");
    }

    // Error sistema
    if (numeroLimpio === TARJETAS_PRUEBA.ERROR_SISTEMA) {
        return crearRespuestaError("ERROR_SISTEMA", "Error del sistema");
    }

    return crearRespuestaExitosa();
}

function crearRespuestaExitosa(): RespuestaPasarela {
    return {
        exitoso: true,
        codigo_transaccion: generarCodigoTransaccion(),
        codigo_autorizacion: generarCodigoAutorizacion(),
        estado: "exitoso",
        mensaje: "Pago procesado exitosamente",
        fecha_procesamiento: new Date(),
        referencia_pasarela: `REF-${uuidv4().substring(0, 8).toUpperCase()}`,
    };
}

function crearRespuestaRechazada(
    codigo: string,
    mensaje: string,
): RespuestaPasarela {
    return {
        exitoso: false,
        estado: "rechazado",
        mensaje: "Pago rechazado",
        fecha_procesamiento: new Date(),
        codigo_error: codigo,
        detalles_error: mensaje,
    };
}

function crearRespuestaError(
    codigo: string,
    mensaje: string,
): RespuestaPasarela {
    return {
        exitoso: false,
        estado: "error",
        mensaje: "Error al procesar pago",
        fecha_procesamiento: new Date(),
        codigo_error: codigo,
        detalles_error: mensaje,
    };
}

function generarCodigoTransaccion(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `TXN-${timestamp}-${random}`.toUpperCase();
}

function generarCodigoAutorizacion(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function obtenerTarjetasPrueba() {
    return {
        exitosa: {
            numero: "4111 1111 1111 1111",
            nombre: "Juan Perez",
            vencimiento: "12/25",
            cvv: "123",
            tipo: "visa" as const,
            descripcion: "✅ Pago exitoso",
        },
        fondos_insuficientes: {
            numero: "4000 0000 0000 0002",
            nombre: "Maria Lopez",
            vencimiento: "12/25",
            cvv: "123",
            tipo: "visa" as const,
            descripcion: "❌ Fondos insuficientes",
        },
        tarjeta_robada: {
            numero: "4000 0000 0000 0069",
            nombre: "Carlos Ruiz",
            vencimiento: "12/25",
            cvv: "123",
            tipo: "visa" as const,
            descripcion: "❌ Tarjeta reportada",
        },
    };
}
