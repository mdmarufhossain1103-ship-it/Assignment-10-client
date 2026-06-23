'use client';

import { authClient } from "@/lib/auth-client";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function UserProfilePage() {

    const { data: session } = authClient.useSession();

    const user = session?.user;

    return (
        <div className="max-w-5xl mx-auto space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    Profile Management
                </h1>

                <p className="text-default-500">
                    Update your account information.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                <EditProfileForm user={user} />

                <ChangePasswordForm user={user} />

            </div>
        </div>
    );
}