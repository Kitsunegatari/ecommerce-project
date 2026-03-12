export default interface Product {
    id: number
    nombre: string
    descripcion: string
    habilidades: string[]
    precio: number
    enPromocion: boolean
    descuento: number
}

export const NullProduct: Product = {
    id: 0,
    nombre: ' ',
    descripcion: ' ',
    habilidades: [],
    precio: 0,
    enPromocion: false,
    descuento: 0
}