'use client';

import React from 'react';
import { Card, Input, Button } from '@heroui/react';
import { authClient } from '@/lib/auth-client';

const UserProfilePage = () => {
    const {data:session} = authClient.useSession()
    const user = session?.user
    return (
        <div className="max-w-5xl mx-auto space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Profile Management
                </h1>
                <p className="text-default-500 mt-1">
                    Update your personal information and account security.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                {/* Edit Profile */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Edit Profile
                    </h2>

                    <div className="space-y-4">

                        <Input
                            label="Full Name"
                            className={'mr-3'}
                            defaultValue={user?.name}
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            defaultValue={user?.email}
                        />

                        <Button
                            color="primary"
                            type='submit'
                            className="w-full"
                        >
                            Save Changes
                        </Button>

                    </div>
                </Card>

                {/* Change Password */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Change Password
                    </h2>

                    <div className="space-y-4">

                        <Input
                            label="Current Password"
                            type="password"
                            placeholder="Enter current password"
                            className={'mr-2'}
                        />

                        <Input
                            label="New Password"
                            type="password"
                            placeholder="Enter new password"
                        />

                        <Input
                            label="Confirm New Password"
                            type="password"
                            placeholder="Confirm new password"
                        />

                        <Button
                            color="primary"
                            className="w-full"
                        >
                            Update Password
                        </Button>

                    </div>
                </Card>

            </div>

        </div>
    );
};

export default UserProfilePage;