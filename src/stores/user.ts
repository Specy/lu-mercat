import { writable } from "svelte/store";
import { api } from "./api/api";



export enum UserRole {
    Admin = "admin",
    Delegate = "delegate",
    Appointee = "appointee",
    Customer = "customer",
}

export type User = {
    username: string
    password: string
    id: string
    role: UserRole
}


function createUser(){
    const { subscribe, set, update } = writable<User | null>(null)

    async function login(username: string, password: string) {
        set(await api.login(username, password))
    }

    async function register(username: string, password: string, role: UserRole) {
        set(await api.registerUser(username, password, role))
    }
    function logout(){
        set(null)
    }

    return {
        subscribe,
        login,
        register,
        logout
    }
}