'use client'
import Link from 'next/link';
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Button,
} from '@heroui/react';
import { authClient } from '@/lib/auth-client';

const LoginPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const user = Object.fromEntries(formData.entries());

            await authClient.signIn.email({
                email: user.email,
                password: user.password,
                callbackURL: "/",
            });
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Login to continue
                    </p>
                </div>

                {/* Form */}
                <Form
                    className="flex flex-col gap-4"
                    onSubmit={onSubmit}
                >
                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                            ) {
                                return 'Enter a valid email address';
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>

                        <Input placeholder="you@example.com" />

                        <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 6) {
                                return 'Password must be at least 6 characters';
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>

                        <Input placeholder="Enter your password" />

                        <FieldError />
                    </TextField>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full"
                        size="lg"
                    >
                        Login
                    </Button>

                    {/* Divider */}
                    <div className="relative my-2 w-full">
                        <div className="border-t" />

                        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-500">
                            OR
                        </span>
                    </div>

                    {/* Google Login */}
                    <Button
                        type="button"
                        variant="bordered"
                        className="w-full bg-blue-500 text-white"
                        size="lg"
                    >
                        Continue with Google
                    </Button>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <Link
                            href="/register"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;