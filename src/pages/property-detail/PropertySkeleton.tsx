import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PropertySkeleton = () => {
    return (
        <section className="space-y-4 p-4">
            {/* Header Card Skeleton */}
            <Card className="w-full">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="space-y-1 w-full">
                        <Skeleton className="h-7 w-2/3 mb-2" /> {/* Title */}
                        <Skeleton className="h-4 w-1/3" /> {/* Description */}
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-2">
                        <Skeleton className="h-10 w-24" /> {/* Export Button */}
                        <Skeleton className="h-10 w-28" />{" "}
                        {/* Save Report Button */}
                    </div>
                </CardHeader>
            </Card>

            {/* Overview Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-5 w-1/2 mb-2" />{" "}
                            {/* Card Title */}
                            <Skeleton className="h-4 w-1/3" />{" "}
                            {/* Card Subtitle */}
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-1/2 mb-2" />{" "}
                            {/* Main Value */}
                            <Skeleton className="h-4 w-1/3" /> {/* Sub Value */}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Details and Owner Card Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 border">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-1/3 mb-2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-40 w-full" />
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-1/2 mb-2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-24 w-full mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
export default PropertySkeleton;
