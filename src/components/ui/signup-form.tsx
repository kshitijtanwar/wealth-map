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

export function SignUpForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [step, setStep] = useState<1 | 2>(1);

    const handleNextStep = () => {
        setStep(2);
    };

    const handlePrevStep = () => {
        setStep(1);
    };

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
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

            <div className="grid gap-6">
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
                                required
                            />
                        </div>

                        {/* Admin Full Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input
                                id="fullname"
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        {/* Admin Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
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
                            <Input id="logo" type="file" accept="image/*" />
                        </div>

                        {/* Industry */}
                        <div className="grid gap-2">
                            <Label htmlFor="industry">Select an industry</Label>
                            <Select>
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
                                                    .replace(/\s+/g, "-")}
                                            >
                                                {industry}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="confirm_password">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirm_password"
                                type="password"
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                onClick={handlePrevStep}
                                variant="outline"
                                className="flex-1"
                            >
                                Back
                            </Button>
                            <Button type="submit" className="flex-1">
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
