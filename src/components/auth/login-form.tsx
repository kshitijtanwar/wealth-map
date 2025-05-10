import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { authAPI } from "../../db/apiAuth";
import { useNavigate } from "react-router-dom";

interface FormValues {
    email: string;
    password: string;
}

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error) => {
                if (error?.message) {
                    toast.error(error.message as string);
                }
            });
        }
    }, [errors]);

    const handleLogin = async (data: FormValues) => {
        try {
            setIsLoading(true);
            const result = await authAPI.signIn(data?.email, data?.password);
            if (result.success) {
                toast.success("Login successful");
                navigate("/dashboard");
            } else {
                toast.error(
                    result.error ||
                        "Login failed. Please check your credentials."
                );
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit(handleLogin)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                </div>
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Login
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    );
}
