import React, { useState } from "react";
import { MapIcon, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { authAPI } from "@/db/apiAuth";

interface CompanyRegistrationProps {
    onRegister: () => void;
    onCancel: () => void;
}

const CompanyRegistration: React.FC<CompanyRegistrationProps> = ({
    onRegister,
    onCancel,
}) => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        name: "",
        logo: "",
        industry: "",
        size: "",
        adminFirstName: "",
        adminLastName: "",
        adminEmail: "",
        adminPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                setFormData(prev => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Starting registration process...");
        console.log("Form Data:", formData);
        setLoading(true);

        try {
            if (step === 1) {
                setStep(2);
            } else {
                // Final submission
                if (formData.adminPassword !== formData.confirmPassword) {
                    toast.error("Passwords do not match");
                    return;
                }

                console.log("Calling registerCompanyAndAdmin...");
                const result = await authAPI.registerCompanyAndAdmin({
                    name: formData.name,
                    logo: formData.logo,
                    industry: formData.industry,
                    size: formData.size,
                    adminEmail: formData.adminEmail,
                    adminPassword: formData.adminPassword,
                    adminFirstName: formData.adminFirstName,
                    adminLastName: formData.adminLastName,
                });
                console.log("Registration result:", result);

                if (result.success) {
                    toast.success("Company registered successfully");
                    onRegister();
                } else {
                    console.error("Registration failed:", result.error);
                    toast.error(result.error || "Unknown error occurred");
                }
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <button
                    onClick={onCancel}
                    className="absolute top-8 left-8 text-gray-600 hover:text-gray-900 flex items-center"
                >
                    <ArrowLeft className="w-5 h-5 mr-1" />
                    Back to login
                </button>

                <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center">
                        <MapIcon className="h-10 w-10 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register your company
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Get started with Wealth Map's property insights platform
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card>
                    <CardContent className="py-8 px-4 sm:px-10">
                        <div className="mb-8">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                >
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-2 bg-white text-sm text-gray-500">
                                        Step {step} of 2
                                    </span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {step === 1 ? (
                                <>
                                    <div>
                                        <label
                                            htmlFor="company-name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Company Name
                                        </label>
                                        <div className="mt-1">
                                            <Input
                                                id="company-name"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                placeholder="Enter company name"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="industry"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Industry
                                        </label>
                                        <Select
                                            value={formData.industry}
                                            onValueChange={(value) => handleSelectChange("industry", value)}
                                        >
                                            <SelectTrigger
                                                id="industry"
                                                name="industry"
                                                className="!w-full mt-1"
                                            >
                                                <SelectValue placeholder="Select an industry" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {[
                                                        "Real Estate",
                                                        "Financial Services",
                                                        "Banking",
                                                        "Investment",
                                                        "Other",
                                                    ].map((industry) => (
                                                        <SelectItem
                                                            key={industry}
                                                            value={industry
                                                                .toLowerCase()
                                                                .replace(
                                                                    /\s+/g,
                                                                    "-"
                                                                )}
                                                        >
                                                            {industry}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="size"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Company Size
                                        </label>
                                        <Select
                                            value={formData.size}
                                            onValueChange={(value) => handleSelectChange("size", value)}
                                        >
                                            <SelectTrigger
                                                id="size"
                                                name="size"
                                                className="!w-full mt-1"
                                            >
                                                <SelectValue placeholder="Select company size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {[
                                                        "1-10 employees",
                                                        "11-50 employees",
                                                        "51-200 employees",
                                                        "201-500 employees",
                                                        "501+ employees",
                                                    ].map((industry) => (
                                                        <SelectItem
                                                            key={industry}
                                                            value={industry
                                                                .toLowerCase()
                                                                .replace(
                                                                    /\s+/g,
                                                                    "-"
                                                                )}
                                                        >
                                                            {industry}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Company Logo
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            {logoPreview ? (
                                                <div className="text-center">
                                                    <img
                                                        src={logoPreview}

                                                        alt="Logo preview"
                                                        className="mx-auto h-32 w-32 object-contain mb-4"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="text-sm text-red-600 hover:text-red-500"
                                                        onClick={() => {
                                                            setLogoPreview(null);
                                                            setFormData(prev => ({ ...prev, logo: "" }));
                                                        }}
                                                    >
                                                        Remove logo
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-1 text-center">
                                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="logo-upload"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                                                        >
                                                            <span>
                                                                Upload a file
                                                            </span>
                                                            <input
                                                                id="logo-upload"
                                                                name="logo-upload"
                                                                type="file"
                                                                className="sr-only"
                                                                accept="image/*"
                                                                onChange={handleLogoUpload}
                                                            />
                                                        </label>
                                                        <p className="pl-1">
                                                            or drag and drop
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, GIF up to 10MB
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label
                                            htmlFor="admin-name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Admin Name
                                        </label>
                                        <Input
                                            id="admin-name"
                                            name="adminFirstName"
                                            type="text"
                                            value={formData.adminFirstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="admin-email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Admin Email
                                        </label>
                                        <Input
                                            id="admin-email"
                                            name="adminEmail"
                                            type="email"
                                            value={formData.adminEmail}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>
                                        <Input
                                            id="password"
                                            name="adminPassword"
                                            type="password"
                                            value={formData.adminPassword}
                                            onChange={handleChange}
                                            required
                                            minLength={8}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="confirm-password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Confirm Password
                                        </label>
                                        <Input
                                            id="confirm-password"
                                            name="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex items-center justify-between">
                                {step === 2 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    className={`${step === 1 ? "w-full" : "ml-auto"} bg-emerald-600 hover:bg-emerald-700`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </div>
                                    ) : step === 1 ? "Next" : "Create Account"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CompanyRegistration;
