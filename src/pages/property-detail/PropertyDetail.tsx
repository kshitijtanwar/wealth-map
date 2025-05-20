import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Download, FileText, ArrowLeft } from "lucide-react";
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
import { getPropertyDetail } from "@/services/propertyServices";
import { useQuery } from "@tanstack/react-query";
import type { PropertyDetail as PropertyDetailData } from "@/types";
import PropertySkeleton from "./PropertySkeleton";

type TabsValue = "overview" | "owner" | "history";

const PropertyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery<PropertyDetailData>({
        queryKey: ["property_details", id],
        queryFn: () => getPropertyDetail({ id }),
        staleTime: Infinity,
    });

    const property = data?.property;
    const owners = data?.owners;

    const [tab, setTab] = useState<TabsValue>("overview");

    if (isLoading) {
        return <PropertySkeleton />;
    }

    if (!property) {
        return <div className="p-4">Property not found.</div>;
    }

    return (
        <section className="space-y-4 p-4">
            <div className="flex flex-col md:flex-row items-start justify-between md:items-center">
                <Button
                    variant={`link`}
                    onClick={() => navigate("/map")}
                    className="text-base flex items-center"
                >
                    <ArrowLeft size={16} /> Head to map
                </Button>

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
                <TabsList className="w-full lg:w-1/2 bg-inherit border-b mt-3">
                    <TabsTrigger
                        value="overview"
                        className="data [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary transition-colors"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="owner"
                        className="data [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary transition-colors"
                    >
                        Owner Analysis
                    </TabsTrigger>
                    <TabsTrigger
                        value="history"
                        className="data [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary transition-colors"
                    >
                        Transaction History
                    </TabsTrigger>
                </TabsList>
                {/* Overview Section */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-2">
                        <div className="flex flex-col justify-between gap-2">
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
                        <div className="col-span-2 mt-2 md:mt-0">
                            <PropertyDetailCard
                                type={property.propertytype}
                                yearBuilt={property.year_built}
                                address={property.site_address}
                            />
                        </div>
                    </div>
                </TabsContent>

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
                <TabsContent value="history">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Transaction Type</TableHead>
                                <TableHead>Parties</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>2018-05-14</TableCell>
                                <TableCell>Purchase</TableCell>
                                <TableCell>Seller: David Johnson</TableCell>
                                <TableCell>$2,560,000</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableCaption>
                            List of recent Transactions regarding the property.
                            (Currently filled with dummy data)
                        </TableCaption>
                    </Table>
                </TabsContent>
            </Tabs>
        </section>
    );
};
export default PropertyDetail;
