import { useSearchParams } from "react-router-dom";
import { LoginForm } from "@/components/accept-invite";
import { Map } from "lucide-react";

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") as string;

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <span className="flex items-center justify-center gap-2 self-center font-medium mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Map className="size-4" />
                    </div>
                    Wealth Map
                </span>
                <LoginForm token={token} />
            </div>
        </div>
    );
}
