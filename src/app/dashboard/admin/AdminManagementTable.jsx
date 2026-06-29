"use client";

import { useState } from "react";
import { updateRole } from "@/lib/api/admin";

export default function AdminManagementTable({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers || []);

    const handleRoleUpdate = async (id, newRole) => {
        try {
            await updateRole(id, { role: newRole });

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id
                        ? { ...user, role: newRole }
                        : user
                )
            );
        } catch (error) {
            console.error("Role update failed:", error);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="mb-6 text-2xl font-bold">
                Manage Users
            </h1>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100">
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
                                <td className="border p-2">
                                    {user.name}
                                </td>

                                <td className="border p-2">
                                    {user.email}
                                </td>

                                <td className="border p-2">
                                    <span className="capitalize">
                                        {user.role}
                                    </span>
                                </td>

                                <td className="border p-2">
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            className="rounded bg-blue-500 px-3 py-1 text-white text-sm cursor-pointer"
                                            disabled={user.role === "user"}
                                            onClick={() =>
                                                handleRoleUpdate(
                                                    user._id,
                                                    "user"
                                                )
                                            }
                                        >
                                            User
                                        </button>

                                        <button
                                            className="rounded bg-purple-500 px-3 py-1 text-white text-sm cursor-pointer"
                                            disabled={
                                                user.role === "artist"
                                            }
                                            onClick={() =>
                                                handleRoleUpdate(
                                                    user._id,
                                                    "artist"
                                                )
                                            }
                                        >
                                            Artist
                                        </button>

                                        <button
                                            className="rounded bg-red-500 px-3 py-1 text-white text-sm cursor-pointer"
                                            disabled={user.role === "admin"}
                                            onClick={() =>
                                                handleRoleUpdate(
                                                    user._id,
                                                    "admin"
                                                )
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
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
                {users?.map((user) => (
                    <div
                        key={user._id}
                        className="border rounded-lg p-4 shadow-sm"
                    >
                        <div className="mb-2">
                            <p className="font-semibold">
                                {user.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {user.email}
                            </p>
                            <p className="text-sm mt-1">
                                Role:{" "}
                                <span className="font-medium capitalize">
                                    {user.role}
                                </span>
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                disabled={user.role === "user"}
                                onClick={() =>
                                    handleRoleUpdate(user._id, "user")
                                }
                            >
                                User
                            </button>

                            <button
                                className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
                                disabled={user.role === "artist"}
                                onClick={() =>
                                    handleRoleUpdate(
                                        user._id,
                                        "artist"
                                    )
                                }
                            >
                                Artist
                            </button>

                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                disabled={user.role === "admin"}
                                onClick={() =>
                                    handleRoleUpdate(user._id, "admin")
                                }
                            >
                                Admin
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-sm text-gray-600">
                Total Users: {users.length}
            </p>
        </div>
    );
}