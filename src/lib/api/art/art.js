'use server'

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const browseArts = async() =>{
    const res = await fetch(`${baseURL}/artworks`)
    const data = await res.json();
    return data;
}

export const artDetails = async(id) => {
    const res = await fetch(`${baseURL}/artworks/${id}`)
    const data = await res.json();
    return data;
}