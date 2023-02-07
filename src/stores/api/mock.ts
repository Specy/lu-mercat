import type { Category, Product } from "$stores/products";
import { UserRole, type User } from "$stores/user";

function createProduct(name: string, price: number, description: string, categoriesIds: string[], id: string, imageUrl?: string): Product {
    return {
        name,
        price,
        id,
        description,
        categoriesIds,
        imageUrl
    }
}
function createCategory(name: string, description: string, id: string, imageUrl?: string): Category {
    return {
        name,
        id,
        imageUrl,
        description
    }
}
function createUser(username: string, password: string, id: string, role: UserRole): User {
    return {
        username,
        password,
        id,
        role
    }
}
export const MOCK_CATEGORIES: Category[] = [
    createCategory('Fruits & Vegtables', 'Fruits description', '1'),
    createCategory('Meat & Fish', 'Meat description', '2'),
    createCategory('Bakery', 'Bakery description', '3'),
    createCategory('Dairy', 'Dairy description', '4'),
    createCategory('Drinks', 'Drinks description', '5'),
    createCategory('Household', 'Household description', '6'),
]

export const MOCK_PRODUCTS: Product[] = [
    createProduct('Apple', 1.5, 'Apple description', ['1'], '1'),
    createProduct('Orange', 1.5, 'Orange description', ['1'], '2'),
    createProduct('Banana', 1.5, 'Banana description', ['1'], '3'),
    createProduct('Carrot', 1.5, 'Carrot description', ['1'], '4'),
    createProduct('Tomato', 1.5, 'Tomato description', ['1'], '5'),
    createProduct('Potato', 1.5, 'Potato description', ['1'], '6'),
    createProduct('Onion', 1.5, 'Onion description', ['1'], '7'),
    createProduct('Pork', 1.5, 'Pork description', ['2'], '4'),
    createProduct('Beef', 1.5, 'Beef description', ['2'], '5'),
    createProduct('Chicken', 1.5, 'Chicken description', ['2'], '6'),
    createProduct('Tuna', 1.5, 'Fish description', ['2'], '7'),
    createProduct('Salmon', 1.5, 'Salmon description', ['2'], '8'),
    createProduct('Eggs', 1.5, 'Eggs description', ['2'], '9'),
    createProduct('Bread', 1.5, 'Bread description', ['3'], '8'),
    createProduct('Cake', 1.5, 'Cake description', ['3'], '9'),
    createProduct('Milk', 1.5, 'Milk description', ['4'], '10'),
    createProduct('Cheese', 1.5, 'Cheese description', ['4'], '11'),
    createProduct('Water', 1.5, 'Water description', ['5'], '12'),
    createProduct('Juice', 1.5, 'Juice description', ['5'], '13'),
    createProduct('Soap', 1.5, 'Soap description', ['6'], '14'),
    createProduct('Toilet Paper', 1.5, 'Toilet Paper description', ['6'], '15'),
    createProduct('Detergent', 1.5, 'Detergent description', ['6'], '16'),
]

export const MOCK_USERS: User[] = [
    createUser('admin', 'admin', '1', UserRole.Admin),
    createUser('customer', 'customer', '2', UserRole.Customer),
    createUser('appointee', 'appointee', '3', UserRole.Appointee),
    createUser('delegate', 'delegate', '4', UserRole.Delegate),
]
