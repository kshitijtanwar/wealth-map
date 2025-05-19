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
    dataAccessPreferences?: Record<string, unknown>;
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
    size?: number;
    images?: string[];
    owners: Owner[];
}

export interface Owner {
    id: string;
    name: string;
    type?: "individual" | "entity";
    estimatedNetWorth: number;
    confidenceLevel?: "low" | "medium" | "high";
    wealthComposition?: {
        realEstate: number;
        stocks: number;
        cash: number;
        other: number;
    };
    properties?: Property[];
    lastUpdated?: string;
}

export interface Report {
    id: string;
    title: string;
    createdBy: string; // user ID
    createdAt: string;
    properties?: string[]; // property IDs
    owners?: string[]; // owner IDs
    notes?: string;
    status: "Draft" | "Completed";
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
// Add to index.ts

// Search Types
export interface SearchFilter {
    id: string;
    name: string;
    filters: PropertyFilters & OwnerFilters;
}

export interface PropertyFilters {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    minValue?: number;
    maxValue?: number;
    minSize?: number;
    maxSize?: number;
}

export interface OwnerFilters {
    name?: string;
    type?: "individual" | "entity";
    minNetWorth?: number;
    maxNetWorth?: number;
    confidenceLevel?: ("low" | "medium" | "high")[];
}

export interface SearchContextType {
    searchQuery: string;
    propertyFilters: PropertyFilters;
    ownerFilters: OwnerFilters;
    savedFilters: SearchFilter[];
    suggestions: string[];
    setSearchQuery: (query: string) => void;
    setPropertyFilters: (filters: PropertyFilters) => void;
    setOwnerFilters: (filters: OwnerFilters) => void;
    saveFilter: (name: string) => void;
    loadFilter: (filterId: string) => void;
    deleteFilter: (filterId: string) => void;
}

export interface SearchProviderProps {
    children: ReactNode;
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

export interface PropertyDetail {
    owners: RealOwner[];
    property: RealProperty;
}

export interface RealOwner {
    id: string;
    full_name: string;
    type: "individual" | "company";
    confidence_level: "low" | "medium" | "high";
    estimated_net_worth: number;
    mailing_address: string;
    created_at: string;
    last_updated: string;
}

export interface RealProperty {
    id: string;
    address_line1: string;
    address_line2: string;
    site_address: string;
    city: string;
    state: string;
    zip_code: string;
    latitude: number;
    longitude: number;
    assessed_total_value: number;
    market_total_value: number | null;
    propertytype: string;
    size: number;
    year_built: number;
    sale_amount: number;
    sale_date: string;
    sale_type: string | null;
    tax_amount: number;
    tax_year: number;
    avm_value: number | null;
    avm_high: number;
    avm_low: number;
    avm_score: number;
    avm_last_updated: string | null;
    attom_id: number;
    created_at: string;
}
