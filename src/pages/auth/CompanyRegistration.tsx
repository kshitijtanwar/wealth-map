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

interface CompanyRegistrationProps {
    onRegister: () => void;
    onCancel: () => void;
}

const CompanyRegistration: React.FC<CompanyRegistrationProps> = ({
    onRegister,
    onCancel,
}) => {
    const [step, setStep] = useState(1);

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

                        <form className="space-y-5">
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
                                                name="company-name"
                                                type="text"
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
                                        <Select>
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
                                        <Select>
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
                                            {false ? (
                                                <div className="text-center">
                                                    <img
                                                        alt="Logo preview"
                                                        className="mx-auto h-32 w-32 object-contain mb-4"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="text-sm text-red-600 hover:text-red-500"
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
                                            name="admin-name"
                                            type="text"
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
                                            name="admin-email"
                                            type="email"
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
                                            name="password"
                                            type="password"
                                            required
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
                                            name="confirm-password"
                                            type="password"
                                            required
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
                                    className={`
                                        ${step === 1 ? "w-full" : "ml-auto"}
                                        bg-emerald-600 hover:bg-emerald-700`}
                                >
                                    {step === 1 ? "Next" : "Create Account"}
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
