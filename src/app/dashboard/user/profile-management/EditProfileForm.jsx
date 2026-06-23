'use client';

import { useState, useEffect } from "react";
import { Card, Input, Button } from "@heroui/react";
import { userEditProfile } from "@/lib/api/user/edit";
import toast from "react-hot-toast";


export default function EditProfileForm({user}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const result = await userEditProfile(user.id, {
                name: name,
                email: email,
            });

            console.log(result)

            if (result) {
                toast.success("Profile updated succssfully!");
            } else {
                toast.error("No changes made!");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <>
            <Card className="p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Edit Profile
                </h2>

                <form
                    onSubmit={handleUpdate}
                    className="space-y-4"
                >
                    <Input
                        label="Full Name"
                        value={name}
                        className={'mr-2'}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        color="primary"
                        type="submit"
                        className="w-full"
                    >
                        Save Changes
                    </Button>
                </form>
            </Card>
        </>
    );
}