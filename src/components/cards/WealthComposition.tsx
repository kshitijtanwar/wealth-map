import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const WealthComposition = ({
    wealth,
    confidence_level,
}: {
    wealth: number;
    confidence_level: string;
}) => {
    const colorMap = {
        high: "bg-green-100 text-green-800 dark:text-green-500 dark:bg-green-950",
        medium: "bg-blue-100 text-blue-800 dark:text-blue-500 dark:bg-blue-950",
        low: "bg-yellow-100 text-yellow-800 dark:text-yellow-500 dark:bg-yellow-950",
    };
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Wealth Composition</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-sm font-semibold text-muted-foreground">
                        Estimated Net Worth
                    </p>
                    <h1 className="text-3xl font-bold text-accent-foreground">
                        ${Math.round(wealth).toLocaleString()}
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
                    <span>Updated 12 January, 2025</span>
                </div>
            </CardContent>
        </Card>
    );
};
export default WealthComposition;
