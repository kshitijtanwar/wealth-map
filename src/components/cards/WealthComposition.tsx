import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type RealOwner } from "@/types";
import { TooltipTrigger, TooltipContent, Tooltip } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { NumberTicker } from "../magicui/number-ticker";

const WealthComposition = ({
    confidence_level,
    owners,
}: {
    confidence_level: string;
    owners: RealOwner[];
}) => {
    const colorMap = {
        high: "bg-green-100 text-green-800 dark:text-green-500 dark:bg-green-950",
        medium: "bg-blue-100 text-blue-800 dark:text-blue-500 dark:bg-blue-950",
        low: "bg-yellow-100 text-yellow-800 dark:text-yellow-500 dark:bg-yellow-950",
    };

    const totalNetWorth = owners.reduce(
        (sum, owner) => sum + owner.estimated_net_worth,
        0
    );
    const averageNetWorth =
        owners.length > 0 ? Math.round(totalNetWorth / owners.length) : 0;

    return (
        <Card className="w-full bg-inherit">
            <CardHeader>
                <CardTitle>Wealth Composition</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-sm font-semibold text-muted-foreground">
                        Average Net Worth
                    </p>
                    <h1 className="text-3xl font-bold text-accent-foreground">
                        $
                        <NumberTicker
                            value={averageNetWorth}
                            startValue={averageNetWorth - 100}
                        />
                    </h1>
                </div>
                <div className="flex gap-4 text-sm justify-center">
                    <div
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                            colorMap[confidence_level as keyof typeof colorMap]
                        }`}
                    >
                        {confidence_level.charAt(0).toUpperCase() +
                            confidence_level.slice(1)}{" "}
                        Confidence
                    </div>
                    <span>
                        {owners?.[0]?.created_at
                            ? new Date(owners[0].created_at).toLocaleDateString(
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

                {/* Owner Listing */}
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-accent-foreground mb-2">
                        Owners
                    </h2>
                    <ol className="space-y-2">
                        {owners.map((owner) => (
                            <ol
                                key={owner.id}
                                className="p-3 rounded-md border-b"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="line-clamp-1 mr-2 font-bold">
                                        {owner.full_name
                                            .toLowerCase()
                                            .replace(/\b\w/g, (char) =>
                                                char.toUpperCase()
                                            )}
                                    </span>
                                    <Badge>
                                        {owner.estimated_net_worth.toLocaleString(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: "USD",
                                                maximumFractionDigits: 0,
                                            }
                                        )}
                                    </Badge>
                                </div>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <p className="text-xs line-clamp-2 text-muted-foreground brightness-125 text-left">
                                            {owner.mailing_address}
                                        </p>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        This is the mailing address of the
                                        owner.
                                    </TooltipContent>
                                </Tooltip>
                            </ol>
                        ))}
                    </ol>
                </div>
            </CardContent>
        </Card>
    );
};

export default WealthComposition;
