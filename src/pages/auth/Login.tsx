import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

interface LoginPageProps {
    onLogin: (email: string, password: string) => void;
    onForgotPassword: () => void;
    onRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onRegister }) => {
    return (
        <AuthLayout
            title="Welcome to Wealth Map"
            subtitle="Sign in to access your corporate property platform"
        >
            <LoginForm />
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don't have a company account?{" "}
                    <button
                        onClick={onRegister}
                        className="font-medium text-emerald-600 hover:text-emerald-500"
                    >
                        Register your company
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
