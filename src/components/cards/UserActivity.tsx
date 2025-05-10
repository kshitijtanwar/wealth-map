import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Activity, Map } from "lucide-react";

type CardProps = React.ComponentProps<typeof Card>;

const UserActivity = ({ className, ...props }: CardProps) => {
    return (
        <Card className={cn("w-full", className)} {...props}>
            <CardHeader>
                <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around items-center h-full">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col justify-center items-center gap-8 xs:flex-row">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-3">
                                <Activity className="h-8 w-8 text-emerald-600" />
                            </div>
                            <h4 className="text-2xl font-bold">78%</h4>
                            <p className="text-sm text-gray-500">
                                Active users
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 mb-3">
                                <Map className="h-8 w-8 text-amber-600" />
                            </div>
                            <h4 className="text-2xl font-bold">124</h4>
                            <p className="text-sm text-gray-500">
                                Map views today
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-3">
                                <FileText className="h-8 w-8 text-blue-600" />
                            </div>
                            <h4 className="text-2xl font-bold">36</h4>
                            <p className="text-sm text-gray-500">
                                Reports this week
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default UserActivity;
