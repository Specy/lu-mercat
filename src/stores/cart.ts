import { writable } from "svelte/store"
import type { ProductToOrder } from "./orders"
import { api } from "./api/api"





export function createCartStore(){
    const { subscribe, set, update } = writable<ProductToOrder[]>([])

    function addProductToCart(product: ProductToOrder){
        update(cart => {
            const productIndex = cart.findIndex(p => p.product.id === product.product.id)
            if(productIndex === -1){
                api.addProductToCart(product)
                return [...cart, product]
            }
            cart[productIndex].quantity += product.quantity
            api.updateProductInCart(cart[productIndex])
            return cart
        })
    }
    function removeProductFromCart(productId: string){
        update(cart => {
            const productIndex = cart.findIndex(p => p.product.id === productId)
            if(productIndex === -1) return cart
            const elements = cart.splice(productIndex, 1)
            elements.map(api.removeProductFromCart)
            return cart
        })
    }
    function updateProductQuantity(productId: string, quantity: number){
        update(cart => {
            const productIndex = cart.findIndex(p => p.product.id === productId)
            if(productIndex === -1) return cart
            cart[productIndex].quantity = quantity
            api.updateProductInCart(cart[productIndex])
            return cart
        })
    }
    function setCart(cart: ProductToOrder[]){
        set(cart)
    }
    return {
        subscribe,
        addProductToCart,
        removeProductFromCart,
        setCart,
        updateProductQuantity
    }
}

export const cart = createCartStore()