import type { Order, ProductToOrder } from "$stores/orders";
import type { Category, Product } from "$stores/products";
import type { User } from "$stores/user";
import Dexie from "dexie"
import type { Table } from 'dexie'
function id(length = 7) {
    let result = '';
    for(let i = 0; i < length; i++) {
        const random = Math.random();
        result += String.fromCharCode(Math.floor(random * 26) + (random < .5 ? 65 : 97));
    }
    return result;
}

export class Db extends Dexie{
    products!: Table<Product, string>
    categories!: Table<Category, string>
    orders!: Table<Order, string>
    users!: Table<User, string>
    userCart!: Table<ProductToOrder, string>
    constructor(){
        super('lu-mercat-db')
        this.version(1).stores({
            products: 'id, categoriesIds',
            categories: 'id',
            orders: 'id',
            users: 'id',
            userCart: 'id'
        })
    }
}