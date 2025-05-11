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
    permissionLevel: "admin" | "editor" | "viewer";
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
        this.name = "AuthError";
    }
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "employee";
    companyId: string;
    avatar?: string;
}

export interface Company {
    id: string;
    name: string;
    logo?: string;
    createdAt: string;
    employees: User[];
}

export interface Property {
    id: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    value: number;
    size: number;
    images?: string[];
    ownerId: string;
}

export interface Owner {
    id: string;
    name: string;
    type: "individual" | "entity";
    estimatedNetWorth: number;
    confidenceLevel: "low" | "medium" | "high";
    wealthComposition?: {
        realEstate: number;
        stocks: number;
        cash: number;
        other: number;
    };
    properties: string[]; // property IDs
    lastUpdated: string;
}

export interface Report {
    id: string;
    title: string;
    createdBy: string; // user ID
    createdAt: string;
    properties: string[]; // property IDs
    owners: string[]; // owner IDs
    notes: string;
    status: "draft" | "completed";
}

export interface MapViewSettings {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
    filters: {
        minValue?: number;
        maxValue?: number;
        states?: string[];
        ownerTypes?: ("individual" | "entity")[];
    };
}
