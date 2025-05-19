import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RealOwner } from "@/types";
import { User, MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OwnerInformationCardProps {
    owner: RealOwner;
    onViewWealthAnalysis?: () => void;
}

const OwnerInformationCard: React.FC<OwnerInformationCardProps> = ({
    owner,
    onViewWealthAnalysis,
}) => {
    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="font-medium text-lg">
                    Owner Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                        <p className="font-medium">{owner.full_name}</p>
                        <p className="text-xs text-gray-500">
                            {owner.type === "individual"
                                ? "Individual Owner"
                                : "Corporate Entity"}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center">
                        <MapPin
                            size={16}
                            className="text-gray-400 mr-2 h-4 w-4 min-h-4 min-w-4"
                        />
                        <p className="text-sm line-clamp-2">
                            Primary Residence: {owner.mailing_address}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <p className="text-sm">Owner since 2018</p>
                    </div>
                    <div className="flex items-center">
                        <DollarSign size={16} className="text-gray-400 mr-2" />
                        <p className="text-sm">Owns 3 properties</p>
                    </div>
                </div>
                <Button
                    className="w-full mt-2"
                    variant="outline"
                    onClick={onViewWealthAnalysis}
                >
                    View Wealth Analysis
                    <ArrowRight size={16} />
                </Button>
            </CardContent>
        </Card>
    );
};
export default OwnerInformationCard;
