import { ArrowRight } from "lucide-react";
import Report from "./Report";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

type CardProps = React.ComponentProps<typeof Card>;

export function Reports({ className, ...props }: CardProps) {
    return (
        <Card className={cn("w-full", className)} {...props}>
            <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>You have 3 new reports.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 max-h-[300px] overflow-y-auto">
                <Report />
                <Report />
                <Report />
            </CardContent>
            <CardFooter>
                <Link to="/reports" className="mx-auto">
                    <Button className="cursor-pointer" variant="link">
                        View all reports <ArrowRight />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
