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
import { useNavigate } from "react-router-dom";
import supabase from "@/db/supabase";

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
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        trigger,
        setValue,
    } = useForm<FormValues>();
    const navigate = useNavigate();
    const password = watch("password");
    const logoFile = watch("logo");

    const handleLogoRemove = () => {
        setLogoPreview(null);
        setValue("logo", undefined);
    };

    const handleNextStep = async () => {
        const isValid = await trigger(["companyName", "fullname", "email"]);
        if (isValid) {
            setStep(2);
        }
    };

    const uploadLogo = async (file: File) => {
        try {
            // Generate a unique filename with timestamp
            const timestamp = Date.now();
            const fileName = `logos/${timestamp}-${file.name}`;
            
            // Upload to Supabase storage
            const { data, error } = await supabase.storage
                .from('logo-url')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            // Get signed URL that matches the reference format
            const { data: signedUrlData } = await supabase.storage
                .from('logo-url')
                .createSignedUrl(fileName, 31536000); // 1 year expiration

            if (!signedUrlData?.signedUrl) {
                throw new Error('Failed to generate signed URL');
            }

            return signedUrlData.signedUrl;
        } catch (error) {
            console.error("Logo upload failed:", error);
            throw new Error("Failed to upload logo");
        }
    };

    const handleRegister = async (data: FormValues) => {
        try {
            setIsLoading(true);
            
            // Validate passwords match
            if (data.password !== data.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            let logoUrl = '';
            // Handle logo upload if present
            if (data.logo && data.logo.length > 0) {
                try {
                    logoUrl = await uploadLogo(data.logo[0]);
                } catch (error) {
                    toast.error("Failed to upload company logo");
                    return;
                }
            }

            // Register company and admin
            const result = await authAPI.registerCompanyAndAdmin({
                name: data.companyName,
                logo: logoUrl, // Pass the logo URL
                industry: data.industry,
                adminEmail: data.email,
                adminPassword: data.password,
                fullname: data.fullname,
            });

            if (result.success) {
                toast.success("Company registered successfully");
                navigate("/dashboard");
            } else {
                toast.error(result.error || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
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
            {/* Form header and step indicators */}
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your details to create your account
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <div className={cn("h-2 w-2 rounded-full", step === 1 ? "bg-primary" : "bg-muted")} />
                    <div className={cn("h-2 w-2 rounded-full", step === 2 ? "bg-primary" : "bg-muted")} />
                </div>
            </div>

            <div className="grid gap-4">
                {step === 1 ? (
                    <>
                        {/* Step 1: Basic Information */}
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
                            {errors.companyName && <FormError text={errors.companyName.message} />}
                        </div>

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
                            {errors.fullname && <FormError text={errors.fullname.message} />}
                        </div>

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
                            {errors.email && <FormError text={errors.email.message} />}
                        </div>

                        <Button type="button" onClick={handleNextStep} className="w-full">
                            Next
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Step 2: Logo and Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="logo" className="flex items-center gap-2">
                                Company Logo <span className="text-sm text-muted-foreground">(optional)</span>
                            </Label>

                            {logoPreview && (
                                <div className="mb-2 flex flex-col items-start gap-2">
                                    <img
                                        src={logoPreview}
                                        alt="Logo preview"
                                        className="h-20 w-20 object-contain rounded-md border"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleLogoRemove}
                                        className="text-xs text-red-500 hover:text-red-700"
                                    >
                                        Remove Logo
                                    </button>
                                </div>
                            )}

                            <Controller
                                name="logo"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="logo"
                                        type="file"
                                        accept="image/jpeg, image/png, image/gif"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                // Validate file type
                                                const validTypes = ["image/jpeg", "image/png", "image/gif"];
                                                if (!validTypes.includes(file.type)) {
                                                    toast.error("Please upload a valid image (JPEG, PNG, GIF)");
                                                    return;
                                                }

                                                // Validate file size (5MB max)
                                                if (file.size > 5 * 1024 * 1024) {
                                                    toast.error("File size must be less than 5MB");
                                                    return;
                                                }

                                                // Create preview
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setLogoPreview(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);

                                                field.onChange(e.target.files);
                                            } else {
                                                handleLogoRemove();
                                            }
                                        }}
                                    />
                                )}
                            />

                            {!logoPreview && (
                                <p className="text-xs text-muted-foreground">
                                    Recommended: 200x200px, JPG/PNG/GIF, max 5MB
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="industry">Select an industry</Label>
                            <Controller
                                name="industry"
                                control={control}
                                rules={{ required: "Industry is required" }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                                        value={industry.toLowerCase().replace(/\s+/g, "-")}
                                                    >
                                                        {industry}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.industry && <FormError text={errors.industry.message} />}
                        </div>

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
                                        message: "Password must be at least 8 characters long",
                                    },
                                })}
                            />
                            {errors.password && <FormError text={errors.password.message} />}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirm_password">Confirm Password</Label>
                            <Input
                                id="confirm_password"
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && <FormError text={errors.confirmPassword.message} />}
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
                            <Button type="submit" className="flex-1" isLoading={isLoading}>
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