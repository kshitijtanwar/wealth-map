import { Card, CardContent } from "@/components/ui/card";
const PropertyDetailCard: React.FC = () => {
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
