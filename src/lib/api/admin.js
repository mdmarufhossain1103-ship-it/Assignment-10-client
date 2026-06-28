'use server'

import { headers } from "next/headers";
import { auth } from "../auth";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;


export const getUsers = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${baseURL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
    const data = res.json();
    return data;
}


export const updateRole = async (id, data) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${baseURL}/user/role/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })

    const Updatedata = await res.json();
    return Updatedata;
}

export const allArtwork = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${baseURL}/all/artworks`,{
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
    const data = await res.json();
    return data;
}

export const getAllPaymentHistory = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${baseURL}/admin/payment`,{
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
    const data = await res.json();
    return data;
}