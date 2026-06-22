'use server'

const baseURL = process.env.SERVER_URL

export const subscription = async (data) => {
    const res = await fetch(`${baseURL}/subcription`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data),
    })

    const resData = await res.json()
    return resData;
}