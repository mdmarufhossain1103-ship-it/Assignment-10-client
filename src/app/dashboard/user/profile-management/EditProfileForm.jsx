"use client";

import { useEffect, useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function EditProfileForm({ user }) {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await authClient.updateUser({
            name,
        });

        setLoading(false);

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Profile updated successfully!");
        router.refresh();
    };

    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
                Edit Profile
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
                <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    label="Email"
                    value={email}
                    onChange={() => { }}
                    readOnly
                />

                <Button
                    type="submit"
                    color="primary"
                    isLoading={loading}
                >
                    Save Changes
                </Button>
            </form>
        </Card>
    );
}