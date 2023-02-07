
import type { Order, ProductToOrder } from "$stores/orders";
import type { Category, Product } from "$stores/products";
import type { User, UserRole } from "$stores/user";
import { Db } from "./db";

class Api{
    db = new Db()


    login = async (username: string, password: string) => {
        const user = await this.db.getUser(username)
        if(!user) throw new Error('User not found')
        if(user.password !== password) throw new Error('Wrong password')
        return user
    }

    registerUser = async (username: string, password: string, role: UserRole) => {
        return await this.db.registerUser(username, password, role)
    }


    getProducts = async () => {
        return this.db.getProducts()
    }
    getCategories = async () => {
        return this.db.getCategories()
    }
    getOrders = async (user: User) => {
        return this.db.getOrdersOfUser(user.id)
    }
    getUser = async (userName: string) => {
        return this.db.getUser(userName)
    }
    getUserCart = async (userId: string) => {
        return this.db.getUserCart(userId)
    }
    addProduct = async (product: Product) => {
        return this.db.addProduct(product)
    }
    addCategory = async (category: Category) => {
        return this.db.addCategory(category)
    }
    addOrder = async (order: Order) => {
        return this.db.addOrder(order)
    }
    addUser = async (user: User) => {
        return this.db.addUser(user)
    }
    addProductToCart = async (product: ProductToOrder) => {
        return this.db.addProductToCart(product)
    }
    removeProductFromCart = async (product: string | ProductToOrder) => {
        return this.db.removeProductFromCart(typeof product === 'string' ? product : product.product.id)
    }
    removeProduct = async (productId: string) => {
        return this.db.removeProduct(productId)
    }
    removeCategory = async (categoryId: string) => {
        return this.db.removeCategory(categoryId)
    }
    removeOrder = async (orderId: string) => {
        return this.db.removeOrder(orderId)
    }
    removeUser = async (userId: string) => {
        return this.db.removeUser(userId)
    }
    updateProduct = async (product: Product) => {
        return this.db.updateProduct(product)
    }
    updateCategory = async (category: Category) => {
        return this.db.updateCategory(category)
    }
    updateOrder = async (order: Order) => {
        return this.db.updateOrder(order)
    }
    updateUser = async (user: User) => {
        return this.db.updateUser(user)
    }
    updateProductInCart = async (product: ProductToOrder) => {
        return this.db.updateProductInCart(product)
    }
}


export const api = new Api()