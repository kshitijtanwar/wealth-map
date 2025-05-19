import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { MapPin, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    PropertyValueCard,
    PropertySizeCard,
    OwnerNetWorthCard,
} from "@/components/cards/OverviewCard";
import PropertyDetailCard from "@/components/cards/PropertyDetailCard";
import OwnerInformationCard from "@/components/cards/OwnerInformationCard";
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
import type { PropertyDetail } from "@/types";
import PropertySkeleton from "./PropertySkeleton";


type TabsValue = "overview" | "owner" | "history";

const PropertyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useQuery<PropertyDetail>({
        queryKey: ["property_details", id],
        queryFn: () => getPropertyDetail({ id }),
        staleTime: 1000 * 60 * 2,
    });

    const property = data?.property;
    const owners = data?.owners;
    console.log(data);

    const [tab, setTab] = useState<TabsValue>("overview");

    if (isLoading) {
        return <PropertySkeleton />;
    }

    if (!property) {
        return <div className="p-4">Property not found.</div>;
    }

    return (
        <section className="space-y-4 p-4">
            <Card className={`w-full`}>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle>{data?.property?.address_line1}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                            <MapPin size={15} /> {property?.city},{" "}
                            {property?.state} {property?.zip_code}
                        </CardDescription>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-2">
                        <Button variant="outline">
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
                                {({ loading }) => (
                                    <>
                                        <Download size={16} />
                                        {loading
                                            ? "Generating..."
                                            : "Export PDF"}
                                    </>
                                )}
                            </PDFDownloadLink>
                        </Button>
                        <Button>
                            <FileText size={16} />
                            Save Report
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <Tabs
                value={tab}
                onValueChange={(value) => setTab(value as TabsValue)}
            >
                <TabsList className="overflow-auto">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="owner">Owner Analysis</TabsTrigger>
                    <TabsTrigger value="history">
                        Transaction History
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-6">
                    {/* Overview Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <PropertyValueCard
                            value={property?.sale_amount as number}
                            lastAssessed="Oct 2023"
                        />
                        <PropertySizeCard
                            size={property?.size as number}
                            details="5 bed, 4 bath"
                        />
                        <OwnerNetWorthCard
                            netWorth={owners?.[0]?.estimated_net_worth ?? 0}
                            confidenceLevel={
                                owners?.[0]?.confidence_level ?? "low"
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <PropertyDetailCard />
                        </div>
                        {owners && (
                            <OwnerInformationCard
                                owner={owners[0]}
                                onViewWealthAnalysis={() => setTab("owner")}
                            />
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="owner" className="space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <WealthComposition
                            wealth={owners?.[0]?.estimated_net_worth ?? 0}
                            confidence_level={
                                owners?.[0]?.confidence_level as string
                            }
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
                            List of recent Transactions regarding the property
                        </TableCaption>
                    </Table>
                </TabsContent>
            </Tabs>
        </section>
    );
};
export default PropertyDetail;
