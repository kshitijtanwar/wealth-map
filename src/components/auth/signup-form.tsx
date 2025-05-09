import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { authAPI } from "../../db/apiAuth";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import FormError from "../utils/FormError";

interface FormValues {
    companyName: string;
    logo?: FileList;
    industry: string;
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export function SignUpForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [step, setStep] = useState<1 | 2>(1);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        trigger,
    } = useForm<FormValues>();

    const password = watch("password");

    const handleNextStep = async () => {
        const isValid = await trigger(["companyName", "fullname", "email"]);
        if (isValid) {
            setStep(2);
        }
    };

    const handleRegister = async (data: FormValues) => {
        try {
            setIsLoading(true);
            if (data.password !== data.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            const result = await authAPI.registerCompanyAndAdmin({
                name: data.companyName,
                industry: data.industry,
                adminEmail: data.email,
                adminPassword: data.password,
                fullname: data.fullname,
            });

            if (result.success) {
                toast.success("Company registered successfully");
            } else {
                console.error("Registration failed:", result.error);
                toast.error(result.error || "Unknown error occurred");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit(handleRegister)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your details to create your account
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <div
                        className={cn(
                            "h-2 w-2 rounded-full",
                            step === 1 ? "bg-primary" : "bg-muted"
                        )}
                    />
                    <div
                        className={cn(
                            "h-2 w-2 rounded-full",
                            step === 2 ? "bg-primary" : "bg-muted"
                        )}
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {step === 1 ? (
                    <>
                        {/* Step 1: Basic Information */}
                        {/* Company Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="company_name">Company Name</Label>
                            <Input
                                id="company_name"
                                type="text"
                                placeholder="Company Name"
                                {...register("companyName", {
                                    required: "Company name is required",
                                })}
                            />
                            {errors.companyName && (
                                <FormError text={errors.companyName.message} />
                            )}
                        </div>

                        {/* Admin Full Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input
                                id="fullname"
                                type="text"
                                placeholder="John Doe"
                                {...register("fullname", {
                                    required: "Full name is required",
                                })}
                            />
                            {errors.fullname && (
                                <FormError text={errors.fullname.message} />
                            )}
                        </div>

                        {/* Admin Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <FormError text={errors.email.message} />
                            )}
                        </div>

                        <Button
                            type="button"
                            onClick={handleNextStep}
                            className="w-full"
                        >
                            Next
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Step 2: Logo and Password */}
                        {/* Company Logo (Optional) */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="logo"
                                className="flex items-center gap-2"
                            >
                                Company Logo{" "}
                                <span className="text-sm text-muted-foreground">
                                    (optional)
                                </span>
                            </Label>
                            <Input
                                id="logo"
                                type="file"
                                accept="image/*"
                                {...register("logo")}
                            />
                            {errors.logo && (
                                <FormError text={errors.logo.message} />
                            )}
                        </div>

                        {/* Industry */}
                        <div className="grid gap-2">
                            <Label htmlFor="industry">Select an industry</Label>
                            <Controller
                                name="industry"
                                control={control}
                                rules={{ required: "Industry is required" }}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
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
                                )}
                            />
                            {errors.industry && (
                                <FormError text={errors.industry.message} />
                            )}
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters long",
                                    },
                                })}
                            />
                            {errors.password && (
                                <FormError text={errors.password.message} />
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="confirm_password">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirm_password"
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) =>
                                        value === password ||
                                        "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && (
                                <FormError
                                    text={errors.confirmPassword.message}
                                />
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                onClick={() => setStep(1)}
                                variant="outline"
                                className="flex-1"
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                isLoading={isLoading}
                            >
                                Create Account
                            </Button>
                        </div>
                    </>
                )}
            </div>

            <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/" className="underline underline-offset-4">
                    Sign in
                </a>
            </div>
        </form>
    );
}
