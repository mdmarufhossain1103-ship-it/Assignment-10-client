'use server'

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const AddArtData = async(art) =>{
    const res = await fetch(`${baseURL}/artist/arts`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(art)
    })

    const data = await res.json();
    return data;
}

export const ShowArtistArt = async() =>{
    const res = await fetch(`${baseURL}/artist/artworks`)
    const data = await res.json();
    return data;
}