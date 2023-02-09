
import { userStore } from "$stores/user";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

export const prerender = false
export const ssr = false

/** @type {import('./$types').LayoutLoad} */
export async function load() {
    const user = get(userStore)
    if(user){
        return {
            props: {
                user
            }
        }
    }
    console.log("Redirecting to login")
    throw redirect(302, '/user')
}