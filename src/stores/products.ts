import { get, writable } from "svelte/store"
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "./api/mock"
import { api } from "./api/api"
import { browser } from "$app/environment"

export type Category = {
    name: string
    id: string
    imageUrl?: string
    description: string
}

export type Product = {
    name: string
    price: number
    id: string
    description: string
    categoriesIds: string[]
    imageUrl?: string
}


export function createProductsStore(){
    const { subscribe, set, update } = writable<Product[]>([])

    function setProducts(products: Product[]){
        set(products)
    }
    async function sync(){
        set(await api.getProducts())
    }
    return {
        subscribe,
        setProducts,
        sync
    }
}
export const products = createProductsStore()
products.setProducts(MOCK_PRODUCTS)
if(browser) products.sync()
export function createCategoriesStore(){
    const { subscribe, set, update } = writable<Category[]>([])
    function setCategories(categories: Category[]){
        set(categories)
    }
    function getproductsOfCategory(categoryId: string){
        const _products = get(products)
        return _products.filter(product => product.categoriesIds.includes(categoryId))
    }
    async function sync(){
        set(await api.getCategories())
    }
    return {
        subscribe,
        setCategories,
        getproductsOfCategory,
        sync
    }
}

export const categories = createCategoriesStore()
categories.setCategories(MOCK_CATEGORIES)
if(browser) categories.sync()