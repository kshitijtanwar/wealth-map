import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    PropertyValueCard,
    PropertySizeCard,
    OwnerNetWorthCard,
} from "@/components/cards/OverviewCard";
import PropertyDetailCard from "@/components/cards/PropertyDetailCard";
import WealthComposition from "@/components/cards/WealthComposition";
import { DataSourceCard } from "@/components/cards/DataSourceCard";
import OtherPropertiesOwned from "@/components/cards/OtherPropertiesOwned";
import { PropertyReportPDF } from "@/components/utils/PropertyReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPropertyDetail } from "@/services/propertyServices";
import { useQuery } from "@tanstack/react-query";
import type { PropertyDetail as PropertyDetailData } from "@/types";
import PropertySkeleton from "./PropertySkeleton";

type TabsValue = "overview" | "owner";

const PropertyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useQuery<PropertyDetailData>({
        queryKey: ["property_details", id],
        queryFn: () => getPropertyDetail({ id }),
        staleTime: Infinity,
    });

    const property = data?.property;
    const owners = data?.owners;

    const [tab, setTab] = useState<TabsValue>("owner");

    if (isLoading) {
        return <PropertySkeleton />;
    }

    if (!property) {
        return <div className="p-4">Property not found.</div>;
    }

    return (
        <section className="p-4">
            <Breadcrumb className="mb-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link to="/map">
                            <BreadcrumbLink>Map</BreadcrumbLink>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="line-clamp-1">
                            {owners?.[0]?.full_name
                                .toLowerCase()
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col md:flex-row items-start justify-between md:items-center space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
                    Owner and Property Insights
                </h1>
                <div className="mt-4 md:mt-0 flex w-full md:w-fit gap-2 ml-auto">
                    <Button variant="outline" className="w-1/2 md:w-fit">
                        <PDFDownloadLink
                            document={
                                <PropertyReportPDF
                                    property={property}
                                    owner={owners?.[0]}
                                />
                            }
                            fileName={`${property.address_line1}-report.pdf`}
                            className="flex items-center gap-1"
                        >
                            <Download size={16} />
                            Export PDF
                        </PDFDownloadLink>
                    </Button>
                    <Button className="w-1/2 md:w-fit">
                        <FileText size={16} />
                        Save Report
                    </Button>
                </div>
            </div>
            <Tabs
                value={tab}
                onValueChange={(value) => setTab(value as TabsValue)}
            >
                <TabsList className="max-w-full bg-inherit mt-4">
                    <div className="flex items-center overflow-x-auto pb-2">
                        <TabsTrigger
                            value="owner"
                            className="data [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary transition-colors"
                        >
                            Owner Analysis
                        </TabsTrigger>
                        <TabsTrigger
                            value="overview"
                            className="data [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary transition-colors"
                        >
                            Property Overview
                        </TabsTrigger>
                    </div>
                </TabsList>

                {/* Owner Analysis */}
                <TabsContent value="owner" className="space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <WealthComposition
                            confidence_level={
                                owners?.[0]?.confidence_level as string
                            }
                            owners={owners || []}
                        />
                        <DataSourceCard />
                    </div>
                    <OtherPropertiesOwned />
                </TabsContent>

                {/* Overview Section */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                        <div className="flex flex-col justify-between gap-4">
                            <PropertyValueCard
                                value={property?.assessed_total_value as number}
                                lastAssessed={property?.created_at}
                            />
                            <OwnerNetWorthCard owners={owners || []} />
                            <PropertySizeCard
                                size={property?.size as number}
                                details="5 bed, 4 bath"
                            />
                        </div>
                        <div className="col-span-1 lg:col-span-2 mt-2 md:mt-0">
                            <PropertyDetailCard
                                type={property.propertytype}
                                yearBuilt={property.year_built}
                                address={property.site_address}
                            />
                        </div>
                        <div className="col-span-1 lg:col-span-3 mt-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Transaction History
                            </h2>

                            <Table className="min-w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px] md:w-auto">
                                            Date
                                        </TableHead>
                                        <TableHead className="w-[120px] md:w-auto">
                                            Transaction Type
                                        </TableHead>
                                        <TableHead>Parties</TableHead>
                                        <TableHead className="text-right">
                                            Amount
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="py-3">
                                            2018-05-14
                                        </TableCell>
                                        <TableCell className="py-3">
                                            Purchase
                                        </TableCell>
                                        <TableCell className="py-3">
                                            Seller: David Johnson
                                        </TableCell>
                                        <TableCell className="text-right py-3">
                                            $2,560,000
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableCaption className="mt-2 text-xs text-muted-foreground">
                                    List of recent Transactions regarding the
                                    property. (Currently filled with dummy data)
                                </TableCaption>
                            </Table>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
};
export default PropertyDetail;
