'use client';

import { useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import { toast } from "react-hot-toast"; 
import { authClient } from "@/lib/auth-client";

export default function ChangePasswordForm({ user }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }


        

        setLoading(true);

        try {
            const { data, error } = await authClient.changePassword({
                newPassword: newPassword,
                currentPassword: currentPassword,
                revokeOtherSessions: true,
            });


            if (error) {
                toast.error(error.message || "Failed to update password");
            } else {
                toast.success("Password updated successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">
                Change Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="password"
                    label="Current Password"
                    placeholder="Enter current password"
                    className={'mr-2'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />

                <Input
                    type="password"
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <Input
                    type="password"
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    className={'w-full'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                    isLoading={loading}
                >
                    Update Password
                </Button>
            </form>
        </Card>
    );
}