'use server'

import { revalidatePath } from "next/cache";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL


export const createComment = async (commentData) => {
    const res = await fetch(`${baseURL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
    });

    const data = await res.json();

    if (data._id) {
        revalidatePath("/users");
    }

    return data;
};

export const getUserByComments = async (email) => {
    const res = await fetch(`${baseURL}/comments?email=${email}`);
    const data = await res.json();

    return data;
}


export const getCommentsByIdeaId = async (ideaId) => {
    const res = await fetch(`${baseURL}/comments/${ideaId}`);
    const data = await res.json();
    return data;
};


export const updateComment = async (commentId, updatedText) => {
    const res = await fetch(`${baseURL}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: updatedText,
        }),
    });

    const data = await res.json();
    if (data.modifiedCount > 0) {
        revalidatePath("/users");
    }
    return data;
};



export const deleteComment = async (commentId) => {
    const res = await fetch(`${baseURL}/comments/${commentId}`, {
        method: "DELETE",
    });
    const data = await res.json();

    if (data.deletedCount > 0) {
        revalidatePath("/users");
    }
    return data;
};