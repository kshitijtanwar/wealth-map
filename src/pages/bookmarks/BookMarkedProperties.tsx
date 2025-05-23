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
import { ArrowLeft, Bookmark, BookmarkCheck, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Property } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/db/supabase";

export default function BookmarkedProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [hasActiveCompany, setHasActiveCompany] = useState(true);
    const [showAccessDenied, setShowAccessDenied] = useState(false);
    const navigate = useNavigate();
    const { session } = useAuth();

    useEffect(() => {
        const checkActiveCompany = async () => {
            if (!session?.user?.id) return;

            const { data: activeCompanies, error } = await supabase
                .from("company_employees")
                .select("id")
                .eq("employee_id", session.user.id)
                .eq("is_active", true);

            if (error) {
                console.error("Error checking active companies:", error);
                return;
            }

            const isActive = activeCompanies && activeCompanies.length > 0;
            setHasActiveCompany(isActive);
        };

        checkActiveCompany();
    }, [session?.user?.id]);

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

    const handleViewDetails = (propertyId: string) => {
        if (!hasActiveCompany) {
            setShowAccessDenied(true);
            return;
        }
        navigate(`/property-detail/${propertyId}`);
    };

    if (showAccessDenied) {
        return (
            <div className="container px-4 mx-auto">
                <Button
                    onClick={() => setShowAccessDenied(false)}
                    variant={"link"}
                    className="my-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Bookmarks
                </Button>
                <div className="flex flex-col items-center justify-center h-[80vh] p-4">
                    <div className="flex flex-col items-center text-center max-w-md">
                        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">
                            Access Restricted
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            You need an active company to view property details. Please
                            contact your administrator or check your company status in
                            settings.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container px-4 mx-auto">
            <Button
                onClick={() => navigate("/map")}
                variant={"link"}
                className="my-4"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Map
            </Button>

            {properties.length === 0 ? (
                <div className="text-center py-12">
                    <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">
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
                                <div className="col-span-2 mb-2">
                                    <p className="text-sm text-foreground-muted">
                                        Owner
                                    </p>
                                    <p className="font-medium">
                                        {property.owners?.[0]?.name}{" "}
                                    </p>
                                </div>
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
                                    onClick={() => handleViewDetails(property.id)}
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
