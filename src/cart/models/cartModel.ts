import cartItem from "../types/cartItem";
import Product from "../types/Product";

export default class cartModel {
    
    private items: cartItem[] = []

    agregarProducto(product: Product): void{

        const existingItem = this.items.find(
            item => item.product.id === product.id
        )

        if(existingItem){
            existingItem.quantity += 1
        }else{
            this.items.push({ product, quantity: 1 })
        }
    }

    obtenerItems(): cartItem[] {
        return this.items
    }

    obtenerTotalItems(): number {
        return this.items.reduce(
            (total, item) => total + item.quantity,
            0
        )
    }

    obtenerTotalPrecio(): number {
        return this.items.reduce((total, item) => {

            const precio = item.product.enPromocion
                ? item.product.precio - (item.product.precio * item.product.descuento/100)
                : item.product.precio

            return total + (precio * item.quantity)
        }, 0)
    }

    vaciarCarrito(): void {
        this.items = []
    }
}