import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { XCircle, Bookmark, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function InfoSlider({
    selectedProperty,
    onViewPropertyDetails,
}: {
    selectedProperty: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        value: number;
        size: number;
        images?: string[];
        owner: {
            name: string;
            type: string;
            estimatedNetWorth: number;
        };
    };
    onViewPropertyDetails: () => void;
}) {
    return (
        <SheetContent className="p-0 w-full sm:max-w-md overflow-y-auto">
            <div className="relative h-48 bg-gray-200">
                {selectedProperty.images && selectedProperty.images[0] && (
                    <img
                        src={selectedProperty.images[0] || "/placeholder.svg"}
                        alt={selectedProperty.address}
                        className="w-full h-full object-cover"
                    />
                )}
                <SheetClose
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                    tabIndex={-1}
                >
                    <XCircle size={24} className="text-gray-600" />
                </SheetClose>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-semibold">
                    {selectedProperty.address}
                </h3>
                <p className="text-gray-600 mb-2">
                    {selectedProperty.city}, {selectedProperty.state}{" "}
                    {selectedProperty.zipCode}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-sm text-gray-500">Value</p>
                        <p className="text-lg font-medium">
                            ${selectedProperty.value.toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Size</p>
                        <p className="text-lg font-medium">
                            {selectedProperty.size.toLocaleString()} sq ft
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                    <h4 className="font-medium mb-2">Owner Information</h4>
                    <Card className="bg-card">
                        <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">
                                        {selectedProperty.owner.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {selectedProperty.owner.type
                                            .charAt(0)
                                            .toUpperCase() +
                                            selectedProperty.owner.type.slice(
                                                1
                                            )}{" "}
                                        Owner
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">
                                        Net Worth
                                    </p>
                                    <p className="font-semibold text-emerald-600">
                                        $
                                        {selectedProperty.owner
                                            .estimatedNetWorth
                                            ? (
                                                  selectedProperty.owner
                                                      .estimatedNetWorth /
                                                  1_000_000
                                              ).toFixed(1) + "M"
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-3 mt-6">
                    <Button
                        tabIndex={-1}
                        variant="default"
                        className="w-full"
                        onClick={() => onViewPropertyDetails()}
                    >
                        View Detailed Report
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            tabIndex={-1}
                        >
                            <Bookmark size={16} />
                            Save Property
                        </Button>
                        <Button
                            tabIndex={-1}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Download size={16} />
                            Export Data
                        </Button>
                    </div>
                </div>
            </div>
        </SheetContent>
    );
}
