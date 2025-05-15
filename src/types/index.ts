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
    dataAccessPreferences: Record<string, unknown>;
}

export interface EmployeeInvitation {
    email: string;
    permissionLevel: "employee";
}

export interface EmployeeAccountSetup {
    token: string;
    password: string;
    fullname: string;
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
    constructor(message: string, public details?: unknown) {
        super(message);
        this.name = "AuthError";
    }
}

export interface Company {
    id: string;
    name: string;
    logo?: string;
    createdAt: string;
    employees: Employee[];
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
    owner: Owner; 
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
    properties: Property[]; 
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

export interface OnboardingInfo {
    email: string;
    password: string;
    name: string;
    phone?: string;
}

export interface Employee {
    id: string;
    name: string;
    email: string;
    role: "Employee" | "Admin";
    status: "Active" | "Pending" | "Revoked";
    avatarUrl?: string;
    lastLogin?: string;
    joinedDate?: string;
    is_active?: boolean;
}

export interface Invitation {
    id: string;
    email: string;
    permission_level: string;
    expires_at: string;
    is_used: boolean;
}


// Loading state reducer types
export type LoadingAction =
    | { type: "FETCH_EMPLOYEES_START" | "FETCH_EMPLOYEES_END" }
    | { type: "FETCH_INVITATIONS_START" | "FETCH_INVITATIONS_END" }
    | { type: "INVITE_START" | "INVITE_END" }
    | { type: "REVOKE_INVITATION_START" | "REVOKE_INVITATION_END" }
    | { type: "REVOKE_ACCESS_START" | "REVOKE_ACCESS_END" }
    | { type: "REMOVE_EMPLOYEE_START" | "REMOVE_EMPLOYEE_END" };

export interface LoadingState {
    fetchingEmployees: boolean;
    fetchingInvitations: boolean;
    inviting: boolean;
    revokingInvitation: boolean;
    revokingAccess: boolean;
    removingEmployee: boolean;
}