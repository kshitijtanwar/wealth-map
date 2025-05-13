import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/types";

const PropertyDetailCard: React.FC<{ property: Property }> = ({ property }) => {
    return (
        <Card className="!pb-6 !pt-0 !overflow-hidden">
            <CardContent className="p-0">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {property.images && property.images[0] && (
                        <img
                            src={property.images[0]}
                            alt={property.address}
                            className="w-full h-64 object-cover"
                        />
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">
                        Property Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">
                                Property Type
                            </p>
                            <p className="font-medium">
                                Single Family Residence
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Year Built</p>
                            <p className="font-medium">2005</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Lot Size</p>
                            <p className="font-medium">0.25 acres</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Zoning</p>
                            <p className="font-medium">Residential</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default PropertyDetailCard;
