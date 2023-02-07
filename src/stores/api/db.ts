import type { Order, ProductToOrder } from "$stores/orders";
import type { Category, Product } from "$stores/products";
import type { User } from "$stores/user";
import Dexie from "dexie"
import type { Table } from 'dexie'
import { MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_USERS } from "./mock";

function id(length = 7) {
    let result = '';
    for(let i = 0; i < length; i++) {
        const random = Math.random();
        result += String.fromCharCode(Math.floor(random * 26) + (random < .5 ? 65 : 97));
    }
    return result;
}

type SerializedProductToOrder = {
    id: string
    quantity: number
    productId: string
}

export class Db extends Dexie{
    products!: Table<Product, string>
    categories!: Table<Category, string>
    orders!: Table<Order, string>
    users!: Table<User, string>
    userCart!: Table<SerializedProductToOrder, string>
    constructor(){
        super('lu-mercat-db')
        this.version(1).stores({
            products: 'id, categoriesIds',
            categories: 'id',
            orders: 'id, deliveratorId',
            users: 'id, username',
            userCart: 'id, productId'
        })
        this.on('populate', async () => {
            const c = MOCK_CATEGORIES.map (category => this.categories.add(category))
            const p = MOCK_PRODUCTS.map (product => this.products.add(product))
            const u = MOCK_USERS.map (user => this.users.add(user))
            await Promise.all([...c, ...p, ...u])
        })
    }
    static generateId(){
        return id()
    }
    async addProduct(product: Product){
        await this.products.add(product)
    }
    async addCategory(category: Category){
        await this.categories.add(category)
    }
    async addOrder(order: Order){
        await this.orders.add(order)
    }
    async addUser(user: User){
        await this.users.add(user)
    }
    async registerUser(username: string, password: string, role: User['role']){
        const user = await this.users.get({username})
        if(user) throw new Error('User already exists')
        const newUser = {
            username,
            password,
            role,
            id: Db.generateId()
        }
        await this.users.add(newUser)
        return newUser
    }
    async addProductToCart(product: ProductToOrder){
        await this.userCart.add({
            id: Db.generateId(),
            productId: product.product.id,
            quantity: product.quantity
        })
    }    
    async getProducts(){
        return await this.products.toArray()
    }
    async getCategories(){
        return await this.categories.toArray()
    }
    async getOrders(){
        return await this.orders.toArray()
    }
    async getOrdersOfUser(userId: string){
        const ownOrders = await this.orders.where({userId}).toArray()
        const ordersOfDeliverator = await this.orders.where({deliveratorId: userId}).toArray()
        return [...ownOrders, ...ordersOfDeliverator]
    }
    async getUser(userName: string){
        return await this.users.get({username: userName})
    }
    async getUserCart(userId: string){
        const products = await this.userCart.where({userId}).toArray()
        return products.map(async product => {
            return {
                quantity: product.quantity,
                product: await this.products.get(product.productId)
            }
        })
    }
    async removeProduct(productId: string){
        await this.products.delete(productId)
    }
    async removeCategory(categoryId: string){
        await this.categories.delete(categoryId)
    }
    async removeOrder(orderId: string){
        await this.orders.delete(orderId)
    }
    async removeUser(userId: string){
        await this.users.delete(userId)
    }
    async removeProductFromCart(productId: string){
        await this.userCart.where({productId}).delete()
    }
    async updateProduct(product: Product){
        await this.products.update(product.id, product)
    }
    async updateCategory(category: Category){
        await this.categories.update(category.id, category)
    }
    async updateOrder(order: Order){
        await this.orders.update(order.id, order)
    }
    async updateUser(user: User){
        await this.users.update(user.id, user)
    }
    async updateProductInCart(product: ProductToOrder){
        await this.userCart.where({ productId: product.product.id}).modify(product)
    }
}