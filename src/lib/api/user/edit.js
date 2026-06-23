'use server'

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const userEditProfile = async(userId,updatedIdea) =>{
    const res = await fetch(`${baseURL}/user/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIdea),
    });

    const data = await res.json();
    return data;
}