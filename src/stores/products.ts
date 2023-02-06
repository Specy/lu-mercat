
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