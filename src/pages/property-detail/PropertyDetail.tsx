import { useState } from "react";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { MapPin, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Property } from "@/types";
import {
    PropertyValueCard,
    PropertySizeCard,
    OwnerNetWorthCard,
} from "@/components/cards/OverviewCard";
import PropertyDetailCard from "@/components/cards/PropertyDetailCard";
import OwnerInformationCard from "@/components/cards/OwnerInformationCard";
import { mockOwner, mockProperties } from "../../../dummyData";
import WealthComposition from "@/components/cards/WealthComposition";
import { DataSourceCard } from "@/components/cards/DataSourceCard";
import OtherPropertiesOwned from "@/components/cards/OtherPropertiesOwned";

type TabsValue = "overview" | "owner" | "history";

const PropertyDetail: React.FC<{ property?: Property }> = ({
    property = mockProperties[1],
}) => {
    const [tab, setTab] = useState<TabsValue>("overview");

    return (
        <section className="space-y-4 p-4">
            <Card className={`w-full`}>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle>456 Ocean Drive</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                            <MapPin size={15} /> Miami, FL 33139
                        </CardDescription>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-2">
                        <Button variant="outline">
                            <Download size={16} />
                            Export
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
                            value={property.value}
                            lastAssessed="Oct 2023"
                        />
                        <PropertySizeCard
                            size={property.size}
                            details="5 bed, 4 bath"
                        />
                        <OwnerNetWorthCard
                            netWorth={mockOwner.estimatedNetWorth}
                            confidenceLevel={mockOwner.confidenceLevel}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <PropertyDetailCard property={property} />
                        </div>
                        <OwnerInformationCard
                            owner={mockOwner}
                            onViewWealthAnalysis={() => setTab("owner")}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="owner" className="space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <WealthComposition />
                        <DataSourceCard />
                    </div>
                    <OtherPropertiesOwned />
                </TabsContent>
                <TabsContent value="history">Transaction History</TabsContent>
            </Tabs>
        </section>
    );
};
export default PropertyDetail;
