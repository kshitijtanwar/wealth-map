import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CircleHighlight from "../utils/CircleHighlight";
const WealthComposition = () => {
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
                        $12.4M
                    </h1>
                </div>
                <div className="flex gap-4 text-sm justify-center">
                    <span className="bg-green-100 text-green-800 px-2 p-0.5 rounded">
                        High confidence
                    </span>
                    <span>Updated 12 January, 2025</span>
                </div>
                <div className="mt-4 flex items-center justify-center space-x-4">
                    <CircleHighlight
                        color="blue"
                        percent={45}
                        title="Real Estate"
                    />
                    <CircleHighlight
                        color="green"
                        percent={30}
                        title="Stocks"
                    />
                    <CircleHighlight color="amber" percent={15} title="Cash" />
                    <CircleHighlight
                        color="purple"
                        percent={10}
                        title="Other"
                    />
                </div>
            </CardContent>
        </Card>
    );
};
export default WealthComposition;
