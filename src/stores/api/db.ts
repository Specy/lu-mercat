import type { Order, ProductToOrder } from "$stores/orders";
import type { Category, Product } from "$stores/products";
import { UserRole, type User } from "$stores/userStore";
import Dexie from "dexie"
import type { Table } from 'dexie'
import { MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_USERS } from "./mock";

function id(length = 7) {
    let result = '';
    for (let i = 0; i < length; i++) {
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

export class Db extends Dexie {
    products!: Table<Product, string>
    categories!: Table<Category, string>
    orders!: Table<Order, string>
    users!: Table<User, string>
    userCart!: Table<SerializedProductToOrder, string>
    constructor() {
        super('lu-mercat-db')
        this.version(6).stores({
            products: 'id, categoriesIds',
            categories: 'id',
            orders: 'id, deliveratorId, userId, ordererId',
            users: 'id, username, role',
            userCart: 'id, productId'
        })
        this.on('populate', async () => {
            const c = MOCK_CATEGORIES.map(category => this.categories.add(category))
            const p = MOCK_PRODUCTS.map(product => this.products.add(product))
            const u = MOCK_USERS.map(user => this.users.add(user))
            await Promise.all([...c, ...p, ...u])
        })
    }
    static generateId() {
        return id()
    }
    async addProduct(product: Product) {
        await this.products.add(product)
    }
    async addCategory(category: Category) {
        await this.categories.add(category)
    }
    async addOrder(order: Order) {
        await this.orders.add(order)
    }
    async addUser(user: User) {
        await this.users.add(user)
    }
    async registerUser(username: string, password: string, role: User['role'], address: string) {
        const user = await this.users.get({ username })
        if (user) throw new Error('User already exists')
        const newUser = {
            username,
            password,
            role,
            address,
            id: Db.generateId()
        }
        await this.users.add(newUser)
        return newUser
    }
    async addProductToCart(product: ProductToOrder) {
        await this.userCart.add({
            id: Db.generateId(),
            productId: product.product.id,
            quantity: product.quantity
        })
    }
    async getProducts() {
        return await this.products.toArray()
    }
    async getOrder(id: string) {
        return await this.orders.get(id)
    }
    async getCategories() {
        return await this.categories.toArray()
    }
    async getOrders() {
        return await this.orders.toArray()
    }
    async getOrdersOfUser(user: User) {
        const ownOrders = await this.orders.where({ userId: user.id }).toArray()
        const ordersOfDeliverator = await this.orders.where({ deliveratorId: user.id }).toArray()
        const result = [...ownOrders, ...ordersOfDeliverator]
        if (user.role === UserRole.Appointee) {
            const accessibleOrders = await this.getFreeOrders()
            result.push(...accessibleOrders)
        }
        if (user.role === UserRole.Delegate){
            const delegatedOrders = await this.orders.where({ ordererId: user.id }).toArray()
            result.push(...delegatedOrders)
        }
        //remove duplicates
        const ids = new Set()
        const filtered = result.filter(order => {
            if (ids.has(order.id)) return false
            ids.add(order.id)
            return true
        })
        return filtered
    }
    async getAllConsumers() {
        return await this.users.where({ role: UserRole.Customer }).toArray()
    }
    async getFreeOrders() {
        return await this.orders.where({ deliveratorId: "self" }).toArray()
    }
    async getUser(id: string) {
        return await this.users.get({ id })
    }
    async getUserByUsername(username: string) {
        return await this.users.get({ username })
    }
    async getUserCart() {
        const products = await this.userCart.toArray()
        const parsed = await Promise.all(products.map(async product => {
            return {
                quantity: product.quantity,
                product: await this.products.get(product.productId) as Product,
                finalPrice: 0,
            }
        }))
        return parsed
    }
    async removeProduct(productId: string) {
        await this.products.delete(productId)
    }
    async removeCategory(categoryId: string) {
        await this.categories.delete(categoryId)
    }
    async removeOrder(orderId: string) {
        await this.orders.delete(orderId)
    }
    async removeUser(userId: string) {
        await this.users.delete(userId)
    }
    async removeProductFromCart(productId: string) {
        await this.userCart.where({ productId }).delete()
    }
    async updateProduct(product: Product) {
        await this.products.update(product.id, product)
    }
    async updateCategory(category: Category) {
        await this.categories.update(category.id, category)
    }
    async updateOrder(order: Order) {
        await this.orders.update(order.id, order)
    }
    async updateUser(user: User) {
        await this.users.update(user.id, user)
    }
    async updateProductInCart(product: ProductToOrder) {
        await this.userCart.where({ productId: product.product.id }).modify(product)
    }
}