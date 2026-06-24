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

export const deleteArtwork = async(id) =>{
    const res = await fetch(`${baseURL}/artist/artworks/${id}`,{
        method: 'DELETE',
    })

    const data = await res.json();
    return data;
}

export const updateArtwork = async(id,artworksData) =>{
    const res = await fetch(`${baseURL}/artist/artworks/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
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