import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        toast.success("Removed from bookmarks", {
            description:
                "Property has been removed from your saved properties.",
        });
    };

    return (
        <div className="container mx-auto py-8">
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
                    <p className="mt-1 text-sm text-gray-500">
                        Save properties to view them here later.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <Card
                            key={property.id}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">
                                        {property.address}
                                    </CardTitle>
                                    <button
                                        onClick={() =>
                                            removeBookmark(property.id)
                                        }
                                        className="text-primary hover:text-primary/80"
                                    >
                                        <BookmarkCheck className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {property.city}, {property.state}{" "}
                                    {property.zipCode}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Value
                                        </p>
                                        <p className="font-medium">
                                            $
                                            {property.value?.toLocaleString() ||
                                                "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Size
                                        </p>
                                        <p className="font-medium">
                                            {property.size?.toLocaleString() ||
                                                "N/A"}{" "}
                                            sq ft
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
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
                                        className="w-full"
                                        onClick={() =>
                                            removeBookmark(property.id)
                                        }
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
