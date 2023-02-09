import { writable, get } from "svelte/store"
import type { Product } from "./products"
import { api } from "./api/api"
import type { User } from "./user"
import { userStore } from "./user"
import { Db } from "./api/db"
export enum OrderStatus {
    Pending = "pending",
    Accepted = "accepted",
    Delivered = "delivered",
}

export type ProductToOrder = {
    quantity: number
    product: Product
}

export type Order = {
    id: string
    userId: string
    ordererId: string
    products: ProductToOrder[]
} & (
        {
            status: OrderStatus.Pending
            deliveratorId: "self"
        } | {
            status: OrderStatus.Accepted | OrderStatus.Delivered
            deliveratorId: string
        }
    )

export function createOrdersStore() {
    const { subscribe, set, update } = writable<Order[]>([])

    userStore.subscribe(user => {
        if (user) fetchData(user)
    })
    function placeOrder(userId: string, ordererId: string, products: ProductToOrder[]) {
        update(orders => {
            const newOrder: Order = {
                id: Db.generateId(),
                userId,
                ordererId,
                products,
                deliveratorId: null,
                status: OrderStatus.Pending
            }
            api.addOrder(newOrder)
            return [...orders, newOrder]
        })
    }

    function findByOrderId(orderId: string) {
        const orders = get({ subscribe })
        return orders.find(order => order.id === orderId)
    }


    function setOrderStatus(orderId: string, status: OrderStatus) {
        update(orders => {
            const orderIndex = orders.findIndex(order => order.id === orderId)
            if (orderIndex === -1) return orders
            orders[orderIndex].status = status
            api.updateOrder(orders[orderIndex])
            return orders
        })
    }

    async function acceptOrderByDeliverator(order: Order, deliverator: User) {
        order.deliveratorId = deliverator.id
        order.status = OrderStatus.Accepted
        await api.updateOrder(order)
        update(orders => {
            const orderIndex = orders.findIndex(order => order.id === orderId)
            if (orderIndex === -1) return orders
            orders[orderIndex] = order
            return orders
        })
    }
    function deleteOrder(orderId: string) {
        update(orders => {
            const orderIndex = orders.findIndex(order => order.id === orderId)
            if (orderIndex === -1) return orders
            orders.splice(orderIndex, 1)
            api.removeOrder(orderId)
            return orders
        })
    }

    function setOrders(orders: Order[]) {
        set(orders)
    }


    async function fetchData(user: User) {
        setOrders(await api.getOrders(user))
    }
    return {
        subscribe,
        placeOrder,
        setOrderStatus,
        deleteOrder,
        setOrders,
        findByOrderId,
        fetchData,
        acceptOrderByDeliverator
    }
}


export const ordersStore = createOrdersStore()


