import { type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

// Auth Types
export interface AuthContextType {
    session: Session | null;
    loading: boolean;
}

export interface AuthProviderProps {
    children: ReactNode;
}

// Company and Employee Types
export interface CompanyRegistrationData {
    name: string;
    logo?: string;
    industry: string;
    adminEmail: string;
    adminPassword: string;
    fullname: string;
    dataAccessPreferences?: Record<string, any>;
}

export interface EmployeeInvitation {
    email: string;
    permissionLevel: 'admin' | 'editor' | 'viewer';
}

export interface EmployeeAccountSetup {
    token: string;
    password: string;
    firstName: string;
    lastName: string;
    acceptTerms: boolean;
}

// UI Component Types
export interface ButtonProps extends React.ComponentProps<"button"> {
    isLoading?: boolean;
}

export interface SearchBarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    className?: string;
}

export interface FormValues {
    email: string;
    password: string;
}

// Error Types
export class AuthError extends Error {
    constructor(message: string, public details?: any) {
        super(message);
        this.name = 'AuthError';
    }
} 