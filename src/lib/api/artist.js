'use server'

import { headers } from "next/headers";
import { auth } from "../auth";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const AddArtData = async(art) =>{
    const { token } = await auth.api.getToken({
        headers: await headers(),
    }) 
    const res = await fetch(`${baseURL}/artist/arts`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(art)
    })

    const data = await res.json();
    return data;
}

export const ShowArtistArt = async() =>{
    const {token} = await auth.api.getToken({
        headers: await headers(),
    }) 
    const res = await fetch(`${baseURL}/artist/artworks`,{
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            authorization: `Bearer ${token}`,
        }
    })
    const data = await res.json();
    return data;
}

export const deleteArtwork = async(id) =>{
    const { token } = await auth.api.getToken({
        headers: await headers(),
    }) 
    const res = await fetch(`${baseURL}/artist/artworks/${id}`,{
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
            authorization: `Bearer ${token}`,
        }
    })

    const data = await res.json();
    return data;
}

export const updateArtwork = async(id,artworksData) =>{
    const { token } = await auth.api.getToken({
        headers: await headers(),
    }) 
    const res = await fetch(`${baseURL}/artist/artworks/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(artworksData)
    })

    const data = await res.json();
    return data;
}


export const getAnalytics = async() => {
    const res = await fetch(`${baseURL}/admin/analytics`)
    const data = await res.json();
    return data;
}