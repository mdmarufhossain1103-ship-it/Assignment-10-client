'use client';

import React from 'react';
import Link from 'next/link';
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Description,
    Button,
    RadioGroup,
    Radio,
} from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation'; // Changed from 'redirect'

const RegisterPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        // 1. Password validation now safely lives inside the submission lifecycle
        if (user.password !== user.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await authClient.signUp.email({
                email: user.email,
                password: user.password,
                name: user.name,
                role: user.role, // passing role along
                plan: 'free',
            });

            // 2. Client-side navigation should use router.push instead of redirect()
            router.push('/login');
        } catch (error) {
            console.error("Sign up failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xl shadow-slate-100 sm:p-10 transition-all">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Create Account
                    </h1>
                    <p className="mt-2.5 text-sm text-slate-500">
                        Register as a Buyer or Artist to access the platform
                    </p>
                </div>

                {/* Form */}
                <Form
                    className="space-y-5"
                    onSubmit={onSubmit}
                    validationBehavior="native"
                >
                    {/* Full Name */}
                    <TextField
                        isRequired
                        name="name"
                        minLength={3}
                        className="w-full flex flex-col gap-1.5"
                    >
                        <Label className="text-sm font-semibold text-slate-700">Full Name</Label>
                        <Input
                            placeholder="John Doe"
                            className="w-full rounded-lg border-slate-200 focus:ring-primary focus:border-primary px-3 py-2 text-sm"
                        />
                        <FieldError className="text-xs font-medium text-red-500 mt-1" />
                    </TextField>

                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full flex flex-col gap-1.5"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return 'Please enter a valid email address';
                            }
                            return null;
                        }}
                    >
                        <Label className="text-sm font-semibold text-slate-700">Email Address</Label>
                        <Input
                            placeholder="john@example.com"
                            className="w-full rounded-lg border-slate-200 focus:ring-primary focus:border-primary px-3 py-2 text-sm"
                        />
                        <FieldError className="text-xs font-medium text-red-500 mt-1" />
                    </TextField>

                    {/* Passwords Layout Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Password */}
                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            className="flex flex-col gap-1.5"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return 'Must be at least 8 characters';
                                }
                                return null;
                            }}
                        >
                            <Label className="text-sm font-semibold text-slate-700">Password</Label>
                            <Input
                                placeholder="••••••••"
                                className="w-full rounded-lg border-slate-200 focus:ring-primary focus:border-primary px-3 py-2 text-sm"
                            />
                            <Description className="text-xs text-slate-400 mt-0.5">
                                Min. 8 characters
                            </Description>
                            <FieldError className="text-xs font-medium text-red-500 mt-1" />
                        </TextField>

                        {/* Confirm Password */}
                        <TextField
                            isRequired
                            name="confirmPassword"
                            type="password"
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-semibold text-slate-700">Confirm Password</Label>
                            <Input
                                placeholder="••••••••"
                                className="w-full rounded-lg border-slate-200 focus:ring-primary focus:border-primary px-3 py-2 text-sm"
                            />
                            <FieldError className="text-xs font-medium text-red-500 mt-1" />
                        </TextField>
                    </div>

                    {/* Role Selection using HeroUI compound elements */}
                    <div className="flex flex-col gap-2 mt-2">
                        <Label className="text-sm font-semibold text-slate-700">Choose Role</Label>
                        <RadioGroup
                            defaultValue="user"
                            name="role"
                            orientation="horizontal"
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
                        >
                            <Radio value="user" className="border rounded-xl p-3 hover:bg-slate-50 transition-colors cursor-pointer border-slate-200 data-[selected=true]:border-primary data-[selected=true]:ring-1 data-[selected=true]:ring-primary">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <span className="font-medium text-slate-900 text-sm">Buyer</span>
                                </Radio.Content>
                                <Description className="text-xs text-slate-400 mt-1 block pl-6">
                                    Browse and purchase unique artwork
                                </Description>
                            </Radio>

                            <Radio value="artist" className="border rounded-xl p-3 hover:bg-slate-50 transition-colors cursor-pointer border-slate-200 data-[selected=true]:border-primary data-[selected=true]:ring-1 data-[selected=true]:ring-primary">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <span className="font-medium text-slate-900 text-sm">Artist</span>
                                </Radio.Content>
                                <Description className="text-xs text-slate-400 mt-1 block pl-6">
                                    Showcase and sell your creations
                                </Description>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Action Space */}
                    <div className="pt-2 space-y-4">
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full font-semibold shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
                            size="lg"
                        >
                            Create Account
                        </Button>

                        {/* Divider */}
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 tracking-wider uppercase">
                                Or Continue With
                            </span>
                            <div className="flex-grow border-t border-slate-200"></div>
                        </div>

                        {/* Google Login */}
                        <Button
                            type="button"
                            variant="bordered"
                            className="w-full font-medium border-blue-200 transition-colors bg-blue-400 text-white"
                            size="lg"
                        >
                            <svg className="mr-2 h-4 w-4 inline-block" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                    </div>

                    {/* Footer Registration Link */}
                    <p className="text-center text-sm text-slate-500 pt-2">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:underline hover:text-primary-600 transition-colors"
                        >
                            Login
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default RegisterPage;