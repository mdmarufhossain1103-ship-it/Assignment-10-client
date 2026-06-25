'use server'

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;


export const getUsers = async() =>{
    const res = await fetch(`${baseURL}/users`)
    const data = res.json();
    return data;
}


export const updateRole = async(id,data) =>{
    const res = await fetch(`${baseURL}/user/role/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const Updatedata = await res.json();
    return Updatedata;
}

export const allArtwork = async() =>{
    const res = await fetch(`${baseURL}/all/artworks`)
    const data = await res.json();
    return data;
}

export const getAllPaymentHistory = async() =>{
    const res = await fetch(`${baseURL}/admin/payment`)
    const data = await res.json();
    return data;
}