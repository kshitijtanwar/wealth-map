import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Home, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Property } from "@/types";
import { toast } from "sonner";

export default function BookmarkedProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = JSON.parse(
                localStorage.getItem("bookmarkedProperties") || "[]"
            );
            setProperties(saved);
        }
    }, []);

    const removeBookmark = (propertyId: string) => {
        const updated = properties.filter((p) => p.id !== propertyId);
        setProperties(updated);
        localStorage.setItem("bookmarkedProperties", JSON.stringify(updated));
        toast.success("Removed from bookmarks");
    };

    return (
        <div className="container px-4 mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Saved Properties</h1>
                <Button
                    onClick={() => navigate("/map")}
                    className="flex items-center gap-2"
                >
                    <Home className="h-4 w-4" />
                    Back to Map
                </Button>
            </div>

            {properties.length === 0 ? (
                <div className="text-center py-12">
                    <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">
                        No saved properties
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted">
                        Save properties to view them here later.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <Card key={property.id}>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center justify-between">
                                    <p className="line-clamp-1">
                                        {property.address}
                                    </p>
                                    <BookmarkCheck className="min-h-6 min-w-6 text-primary h-6 w-6" />
                                </CardTitle>
                                <CardDescription className="flex gap-1 items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {property.city}, {property.state}{" "}
                                    {property.zipCode}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2">
                                <div>
                                    <p className="text-sm text-foreground-muted">
                                        Value
                                    </p>
                                    <p className="font-medium">
                                        $
                                        {property.value?.toLocaleString() ||
                                            "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground-muted">
                                        Size
                                    </p>
                                    <p className="font-medium">
                                        {property.size?.toLocaleString() ||
                                            "N/A"}{" "}
                                        sq ft
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        navigate(
                                            `/property-detail/${property.id}`
                                        )
                                    }
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => removeBookmark(property.id)}
                                >
                                    Remove
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
