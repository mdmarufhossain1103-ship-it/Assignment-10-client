'use server'

import { headers } from "next/headers"

import { redirect } from "next/navigation"
import { auth } from "../auth"

export const requireRole = async (role) => {
    const user = await auth.api.getSession({
        headers: await headers(),
    })
    if (user?.user.role !== role) {
        return redirect('/unauthorized')
    }
}