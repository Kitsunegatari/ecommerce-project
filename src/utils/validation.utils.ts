// src/utils/validation.utils.ts

export function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function validarTelefono(telefono: string): boolean {
    const regex = /^\+?[\d\s-()]{7,15}$/;
    return regex.test(telefono);
}

export function validarNumeroTarjeta(numero: string): boolean {
    const limpio = numero.replace(/\s/g, "");
    return /^\d{13,19}$/.test(limpio);
}

export function validarFechaVencimiento(fecha: string): {
    valida: boolean;
    mensaje?: string;
} {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

    if (!regex.test(fecha)) {
        return { valida: false, mensaje: "Formato inválido (use MM/YY)" };
    }

    const [mes, año] = fecha.split("/");
    const mesNum = parseInt(mes, 10);
    const añoNum = parseInt(`20${año}`, 10);

    const ahora = new Date();
    const mesActual = ahora.getMonth() + 1;
    const añoActual = ahora.getFullYear();

    if (añoNum < añoActual || (añoNum === añoActual && mesNum < mesActual)) {
        return { valida: false, mensaje: "Tarjeta vencida" };
    }

    return { valida: true };
}

export function validarCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
}

export function enmascarar(numero: string): string {
    const limpio = numero.replace(/\s/g, "");
    return `****${limpio.slice(-4)}`;
}
