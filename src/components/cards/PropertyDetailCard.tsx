import { Card, CardContent } from "@/components/ui/card";
const PropertyDetailCard: React.FC<{
    type: string;
    yearBuilt: number;
    address: string;
}> = ({ type, yearBuilt, address }) => {
    return (
        <Card className="!pb-6 !pt-0 !overflow-hidden">
            <CardContent className="p-0">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                        src={`https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                        alt={`property image`}
                        className="w-full h-64 object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-medium text-lg mb-2 underline">
                        Property Specific Details
                    </h3>
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            Address
                        </p>
                        <h1>{address || "NA"}</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Property Type
                            </p>
                            <p className="font-medium">{type}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Year Built
                            </p>
                            <p className="font-medium">{yearBuilt || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Lot Size
                            </p>
                            <p className="font-medium">0.25 acres</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Zoning
                            </p>
                            <p className="font-medium">Residential</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default PropertyDetailCard;
