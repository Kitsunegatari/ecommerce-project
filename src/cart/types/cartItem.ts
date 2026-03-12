import Product, { NullProduct } from "./Product";

export default interface cartItem {
    product: Product
    quantity: number
}

export const NullcartItem: cartItem = {
    product: NullProduct,
    quantity: 0
}