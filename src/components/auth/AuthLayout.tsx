import React from "react";
import { MapIcon } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title = "Wealth Map",
    subtitle = "Unlock property insights across the US",
}) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center">
                        <MapIcon className="h-10 w-10 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {title}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {subtitle}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                {children}

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        &copy; 2025 Wealth Map. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
