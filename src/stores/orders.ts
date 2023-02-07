import { writable } from "svelte/store"
import type { Product } from "./products"
import { api } from "./api/api"
import type { User } from "./user"


enum OrderStatus {
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
    products: ProductToOrder[]
} & (
    {
        status: OrderStatus.Pending
    } | {
        status: OrderStatus.Accepted | OrderStatus.Delivered
        deliveratorId: string
    }
)

export function createOrdersStore(){
    const { subscribe, set, update } = writable<Order[]>([])

    function placeOrder(userId: string, products: ProductToOrder[]){
        update(orders => {
            const newOrder: Order = {
                id: Math.random().toString(),
                userId,
                products,
                status: OrderStatus.Pending
            }
            
            return [...orders, newOrder]
        })
    }

    function setOrderStatus(orderId: string, status: OrderStatus){
        update(orders => {
            const orderIndex = orders.findIndex(order => order.id === orderId)
            if(orderIndex === -1) return orders
            orders[orderIndex].status = status
            return orders
        })
    }

    function deleteOrder(orderId: string){
        update(orders => {
            const orderIndex = orders.findIndex(order => order.id === orderId)
            if(orderIndex === -1) return orders
            orders.splice(orderIndex, 1)
            return orders
        })
    }

    function setOrders(orders: Order[]){
        set(orders)
    }

    
    async function fetch(user: User){
        setOrders(await api.getOrders(user))
    }
    return {
        subscribe,
        placeOrder,
        setOrderStatus,
        deleteOrder,
        setOrders,
        fetch
    }
}


export const orders = createOrdersStore()



