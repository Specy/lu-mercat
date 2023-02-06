import { writable } from "svelte/store";



enum UserRole {
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
    const { subscribe, set, update } = writable<User | null>(null);



    function login(username: string, password: string) {

    }
}