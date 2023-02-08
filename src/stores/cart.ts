import { writable } from "svelte/store"
import type { ProductToOrder } from "./orders"
import { api } from "./api/api"
import { browser } from "$app/environment"





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
    function reduceProductToCart(productId: string | ProductToOrder){
        update(cart => {
            const id = typeof productId === 'string' ? productId : productId.product.id
            const productIndex = cart.findIndex(p => p.product.id === id)
            if(productIndex === -1) return cart
            if(cart[productIndex].quantity === 1){
                const elements = cart.splice(productIndex, 1)
                elements.map(api.removeProductFromCart)
                return cart
            }
            cart[productIndex].quantity -= 1
            api.updateProductInCart(cart[productIndex])
            return cart
        })

    }
    function removeProductFromCart(productId: string | ProductToOrder){
        update(cart => {
            const id = typeof productId === 'string' ? productId : productId.product.id
            const productIndex = cart.findIndex(p => p.product.id === id)
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

    async function sync(){
        const products = await api.getUserCart()
        set(products)
    }
    return {
        subscribe,
        addProductToCart,
        reduceProductToCart,
        removeProductFromCart,
        setCart,
        updateProductQuantity, 
        sync
    }
}

export const cart = createCartStore()
if(browser) cart.sync()