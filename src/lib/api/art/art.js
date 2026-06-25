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


export const getdata = async ({ email = "", search = "", minPrice = "", maxPrice = "", sort = "newest",page=1} = {}) => {
    const params = new URLSearchParams();
    if(!page){
        page=1
    }

    params.append("page", page);

    if (email) params.append("email", email);
    if (search) params.append("search", search);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (sort) params.append("sort", sort);

    const res = await fetch(`${baseURL}/arts?${params.toString()}`, {
        cache: "no-store"
    });
    const data = await res.json();
    return data;
};