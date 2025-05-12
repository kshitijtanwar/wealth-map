import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DataSourceCardItem from "./DataSourceCardItem";
import { BarChart2, Briefcase, Home } from "lucide-react";

export function DataSourceCard() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Data Sources</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <DataSourceCardItem
                    title="Property Records"
                    updatedAt={new Date("2023-10-01")}
                    icon={Home}
                />
                <DataSourceCardItem
                    title="Business Filings"
                    updatedAt={new Date("2024-10-01")}
                    icon={Briefcase}
                />
                <DataSourceCardItem
                    title="Financial Data"
                    updatedAt={new Date("2025-01-01")}
                    icon={BarChart2}
                />
            </CardContent>
            <CardFooter className="text-foreground-muted text-xs">
                Data is sourced from public records and third-party providers.
                Confidence score is based on data completeness and recency.
            </CardFooter>
        </Card>
    );
}
