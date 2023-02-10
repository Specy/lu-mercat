import { writable } from "svelte/store";
import { api } from "./api/api";
import { browser } from "$app/environment";


export enum UserRole {
    Admin = "Admin",
    Delegate = "Delegate",
    Appointee = "Appointee",
    Customer = "Customer",
}



export type User = {
    username: string
    password: string
    id: string
    role: UserRole
    address: string
}

function createUser() {
    const { subscribe, set, update } = writable<User | null>(null)


    async function login(username: string, password: string) {
        const user = await api.login(username, password)
        set(user)
        localStorage.setItem("lu_mercat_user", JSON.stringify(user))
    }

    async function register(username: string, password: string, role: UserRole, address: string) {
        set(await api.registerUser(username, password, role, address))
    }
    
    async function getAllConsumers(){
        return api.getAllConsumers()
    }
    async function findById(id: string) {
        return api.getUser(id)
    }
    function logout() {
        set(null)
        localStorage.removeItem("lu_mercat_user")
    }

    if (browser) {
        const user = localStorage.getItem("lu_mercat_user")
        set(JSON.parse(user ?? "null"))
    }
    return {
        subscribe,
        login,
        register,
        logout,
        findById,
        getAllConsumers
    }
}


export const userStore = createUser()
