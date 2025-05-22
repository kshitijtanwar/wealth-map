import { Card, CardContent } from "@/components/ui/card";
import { Home, Clock, Globe, Info, BarChart2, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface PropertyValueCardProps {
    value: number;
    lastAssessed: string;
}

interface PropertySizeCardProps {
    size: number;
    details: string;
}
interface Owner {
    estimated_net_worth: number;
    confidence_level?: "high" | "medium" | "low";
}

interface OwnerNetWorthCardProps {
    owners: Owner[];
}

// Property Value Card
export function PropertyValueCard({
    value,
    lastAssessed,
}: PropertyValueCardProps) {
    return (
        <Card className="h-full bg-inherit">
            <CardContent>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Property Value
                        </p>
                        <p className="text-2xl font-bold">
                            ${value ? value.toLocaleString() : "N/A"}
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-lg">
                        <Home className="h-6 w-6 text-blue-500" />
                    </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>
                        {lastAssessed
                            ? new Date(lastAssessed).toLocaleDateString(
                                  "en-US",
                                  {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                  }
                              )
                            : ""}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

// Property Size Card
export function PropertySizeCard({ size, details }: PropertySizeCardProps) {
    return (
        <Card className="h-full bg-inherit">
            <CardContent>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Property Size
                        </p>
                        <p className="text-2xl font-bold">
                            {size ? size.toLocaleString() : "N/A"} sq ft
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950 p-2 rounded-lg">
                        <Globe className="h-6 w-6 text-amber-500" />
                    </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground flex items-center">
                    <Info size={14} className="mr-1" />
                    <span>{details}</span>
                </div>
            </CardContent>
        </Card>
    );
}

// Owner Net Worth Card
export function OwnerNetWorthCard({ owners }: OwnerNetWorthCardProps) {
    const averageNetWorth = owners.length
        ? owners.reduce(
              (sum, owner) => sum + (owner.estimated_net_worth || 0),
              0
          ) / owners.length
        : 0;

    // Determine overall confidence level based on most common level
    const confidenceLevels = owners
        .map((owner) => owner.confidence_level || "low")
        .reduce<Record<string, number>>((acc, level) => {
            acc[level] = (acc[level] || 0) + 1;
            return acc;
        }, {});

    const confidenceLevel =
        (Object.entries(confidenceLevels).sort(
            (a, b) => b[1] - a[1]
        )[0]?.[0] as "high" | "medium" | "low") || "low";

    const colorMap: Record<"high" | "medium" | "low", string> = {
        high: "bg-green-100 text-green-800 dark:text-green-500 dark:bg-green-950",
        medium: "bg-blue-100 text-blue-800 dark:text-blue-500 dark:bg-blue-950",
        low: "bg-yellow-100 text-yellow-800 dark:text-yellow-500 dark:bg-yellow-950",
    };

    return (
        <Card className="h-full bg-inherit">
            <CardContent>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Average Owner Net Worth
                        </p>
                        <p className="text-2xl font-bold">
                            ${(averageNetWorth / 1_000_000).toFixed(1)}M
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Tooltip>
                                <TooltipTrigger>
                                    <InfoIcon size={16} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    There are {owners.length} owner
                                    {owners.length !== 1 ? "s" : ""}. The
                                    Average net worth is average of their net
                                    worth.
                                </TooltipContent>
                            </Tooltip>
                            {owners.length} owner
                            {owners.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-950 p-2 rounded-lg">
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
