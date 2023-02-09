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

    function getById(productId: string){
        const _products = get(productsStore)
        return _products.find(product => product.id === productId)
    }
    async function sync(){
        set(await api.getProducts())
    }
    return {
        subscribe,
        setProducts,
        sync,
        getById
    }
}
export const productsStore = createProductsStore()
productsStore.setProducts(MOCK_PRODUCTS)
if(browser) productsStore.sync()

export function createCategoriesStore(){
    const { subscribe, set, update } = writable<Category[]>([])
    function setCategories(categories: Category[]){
        set(categories)
    }
    function getproductsOfCategory(categoryId: string){
        const _products = get(productsStore)
        return _products.filter(product => product.categoriesIds.includes(categoryId))
    }


    function getCategoryById(categoryId: string){
        const _categories = get(categoriesStore)
        return _categories.find(category => category.id === categoryId)
    }
    async function sync(){
        set(await api.getCategories())
    }
    return {
        subscribe,
        setCategories,
        getproductsOfCategory,
        getCategoryById,
        sync
    }
}

export const categoriesStore = createCategoriesStore()
categoriesStore.setCategories(MOCK_CATEGORIES)
if(browser) categoriesStore.sync()