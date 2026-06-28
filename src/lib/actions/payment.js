'use server'

import { headers } from "next/headers";
import { auth } from "../auth";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const subscription = async (data) => {
    const res = await fetch(`${baseURL}/subcription`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),
    })

    const resData = await res.json()
    return resData;
}

export const paymentData = async (data) => {
    const res = await fetch(`${baseURL}/payment`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })

    const resData = await res.json()
    return resData;
}


export const showPaymentData = async() =>{
    const {token} = await auth.api.getToken({
        headers: await headers(),
    })
    const res = await fetch(`${baseURL}/payment`,{
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
    const data = await res.json();
    console.log(data)
    return data;
}