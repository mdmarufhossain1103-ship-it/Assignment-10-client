'use server'

import { auth } from "@/lib/auth";
import { headers } from "next/headers";



const baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const userEditProfile = async(userId,updatedUser) =>{
    const {token} = await auth.api.getToken({
           headers: await headers(),
    })
    const res = await fetch(`${baseURL}/user/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
    });

    const data = await res.json();
    return data;
}