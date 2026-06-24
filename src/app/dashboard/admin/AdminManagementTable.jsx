"use client";

import { useState } from "react";
import { updateRole } from "@/lib/api/admin";

export default function AdminManagementTable({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers || []);

    const handleRoleUpdate = async (id, newRole) => {
        try {
            const result = await updateRole(id, { role: newRole });

            console.log(result);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id
                        ? {
                            ...user,
                            role: newRole,
                        }
                        : user
                )
            );
        } catch (error) {
            console.error("Role update failed:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Manage Users</h1>

            <table className="w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users?.map((user) => (
                        <tr key={user._id}>
                            <td className="border p-2">{user.name}</td>

                            <td className="border p-2">{user.email}</td>

                            <td className="border p-2">{user.role}</td>

                            <td className="border p-2">
                                <div className="flex gap-2">
                                    <button
                                        className="rounded bg-blue-500 px-3 py-1 text-white"
                                        disabled={user.role === "user"}
                                        onClick={() =>
                                            handleRoleUpdate(user._id, "user")
                                        }
                                    >
                                        User
                                    </button>

                                    <button
                                        className="rounded bg-purple-500 px-3 py-1 text-white"
                                        disabled={user.role === "artist"}
                                        onClick={() =>
                                            handleRoleUpdate(user._id, "artist")
                                        }
                                    >
                                        Artist
                                    </button>

                                    <button
                                        className="rounded bg-red-500 px-3 py-1 text-white"
                                        disabled={user.role === "admin"}
                                        onClick={() =>
                                            handleRoleUpdate(user._id, "admin")
                                        }
                                    >
                                        Admin
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="mt-4">Total Users: {users.length}</p>
        </div>
    );
}