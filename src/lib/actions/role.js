'use server'

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const requireRole = async(role) =>{
    const user = await auth.api.getSession({
        headers: await headers(),
    })

    console.log(user)

    if (user.role !== role){
        return redirect('/unauthorized')
    }
}