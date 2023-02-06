import type { Product } from "./products"


enum OrderStatus {
    Pending = "pending",
    Accepted = "accepted",
    Delivered = "delivered",
}

export type ProductToOrder = Product & {
    quantity: number
}

export type Order = {
    id: string
    userId: string
    products: ProductToOrder[]
    status: OrderStatus
}