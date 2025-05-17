import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { type OnboardingInfo } from "@/types";
import FormError from "./utils/FormError";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "@/db/apiAuth";

interface LoginFormProps extends React.ComponentProps<"div"> {
    token: string;
}

export function LoginForm({ className, token, ...props }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnboardingInfo>();

    const handleOnboarding = async (data: OnboardingInfo) => {
        try {
            setIsLoading(true);
            const result = await authAPI.completeEmployeeSetup(token, {
                token,
                fullname: data.name,
                password: data.password,
                acceptTerms: true,
            });

            if (result.success) {
                toast.success("Account setup successful!");
                navigate("/dashboard");
            } else {
                toast.error(result.error || "Failed to complete account setup");
            }
        } catch (error) {
            console.error("Onboarding error:", error);
            toast.error("Failed to complete account setup. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        className="p-6 md:p-8"
                        onSubmit={handleSubmit(handleOnboarding)}
                    >
                        <div className="flex flex-col gap-2">
                            <CardHeader className="flex flex-col items-center text-center">
                                <CardTitle className="text-xl">
                                    Hey there, good to see you!
                                </CardTitle>
                                <CardDescription className="text-muted-foreground text-balance">
                                    Enter details for your onboarding.
                                </CardDescription>
                            </CardHeader>
                            <div className="grid gap-3">
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
                                <FormError
                                    text={errors.email?.message as string}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "Name must be at least 2 characters",
                                        },
                                    })}
                                />
                                <FormError
                                    text={errors.name?.message as string}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name">Phone (Optional)</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="(123) 456-7890"
                                    {...register("phone")}
                                />
                                <FormError
                                    text={errors.phone?.message as string}
                                />
                            </div>
                            <div className="grid gap-3">
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
                                                "Password must be at least 8 characters",
                                        },
                                    })}
                                />
                                <FormError
                                    text={errors.password?.message as string}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                    <div className="relative hidden md:block">
                        <img
                            src="https://images.pexels.com/photos/7581000/pexels-photo-7581000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <Link to="/terms-and-service" className="text-primary">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary">
                    Privacy Policy
                </Link>
                .
            </div>
        </div>
    );
}
