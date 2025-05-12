import { Card, CardContent } from "@/components/ui/card";
import { Home, Clock, Globe, Info, BarChart2 } from "lucide-react";

interface PropertyValueCardProps {
    value: number;
    lastAssessed: string;
}

interface PropertySizeCardProps {
    size: number;
    details: string;
}

interface OwnerNetWorthCardProps {
    netWorth: number;
    confidenceLevel: "high" | "medium" | "low";
}

// Property Value Card
export function PropertyValueCard({
    value,
    lastAssessed,
}: PropertyValueCardProps) {
    return (
        <Card className="h-fit">
            <CardContent>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Property Value
                        </p>
                        <p className="text-2xl font-bold">
                            ${value.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-lg">
                        <Home className="h-6 w-6 text-blue-500" />
                    </div>
                </div>
                <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>Last assessed: {lastAssessed}</span>
                </div>
            </CardContent>
        </Card>
    );
}

// Property Size Card
export function PropertySizeCard({ size, details }: PropertySizeCardProps) {
    return (
        <Card className="h-fit">
            <CardContent>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Property Size</p>
                        <p className="text-2xl font-bold">
                            {size.toLocaleString()} sq ft
                        </p>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg">
                        <Globe className="h-6 w-6 text-amber-500" />
                    </div>
                </div>
                <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <Info size={14} className="mr-1" />
                    <span>{details}</span>
                </div>
            </CardContent>
        </Card>
    );
}

// Owner Net Worth Card
export function OwnerNetWorthCard({
    netWorth,
    confidenceLevel,
}: OwnerNetWorthCardProps) {
    const colorMap = {
        high: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        low: "bg-red-100 text-red-800",
    };

    return (
        <Card className="h-fit">
            <CardContent>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Owner Net Worth</p>
                        <p className="text-2xl font-bold">
                            ${(netWorth / 1_000_000).toFixed(1)}M
                        </p>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-lg">
                        <BarChart2 className="h-6 w-6 text-emerald-500" />
                    </div>
                </div>
                <div className="mt-2 text-sm flex items-center">
                    <div
                        className={`px-2 py-0.5 rounded text-xs font-medium ${colorMap[confidenceLevel]}`}
                    >
                        {confidenceLevel.charAt(0).toUpperCase() +
                            confidenceLevel.slice(1)}{" "}
                        Confidence
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
