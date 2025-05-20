import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent } from "@/components/ui/sheet";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Property } from "@/types";
import { Separator } from "@/components/ui/separator";
import { XCircle, Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function InfoSlider({
    selectedProperty,
    onViewPropertyDetails,
}: {
    selectedProperty: Property;
    onViewPropertyDetails: () => void;
}) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const bookmarks = JSON.parse(
            localStorage.getItem("bookmarkedProperties") || "[]"
        );
        const isSaved = bookmarks.some(
            (bookmark: Property) => bookmark.id === selectedProperty.id
        );
        setIsBookmarked(isSaved);
    }, [selectedProperty.id]);

    const handleSaveProperty = () => {
        const bookmarks = JSON.parse(
            localStorage.getItem("bookmarkedProperties") || "[]"
        );

        if (isBookmarked) {
            // Remove from bookmarks
            const updatedBookmarks = bookmarks.filter(
                (bookmark: Property) => bookmark.id !== selectedProperty.id
            );
            localStorage.setItem(
                "bookmarkedProperties",
                JSON.stringify(updatedBookmarks)
            );
            setIsBookmarked(false);
            toast("Property removed", {
                description:
                    "This property has been removed from your bookmarks.",
            });
        } else {
            // Add to bookmarks
            const updatedBookmarks = [...bookmarks, selectedProperty];
            localStorage.setItem(
                "bookmarkedProperties",
                JSON.stringify(updatedBookmarks)
            );
            setIsBookmarked(true);
            toast("Property saved", {
                description: "This property has been added to your bookmarks.",
            });
        }
    };

    return (
        <SheetContent
            className="p-0 pb-10 w-full sm:max-w-md overflow-y-auto"
            onOpenAutoFocus={(e) => e.preventDefault()}
        >
            <div className="relative h-48 bg-gray-200">
                {selectedProperty.images && selectedProperty.images[0] && (
                    <img
                        src={selectedProperty.images[0] || "/placeholder.svg"}
                        alt={selectedProperty.address}
                        className="w-full h-full object-cover"
                    />
                )}
                <SheetClose className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
                    <XCircle size={24} className="text-muted-foreground" />
                </SheetClose>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-semibold">
                    {selectedProperty.address}
                </h3>
                <p className="text-muted-foreground mb-2">
                    {selectedProperty.city}, {selectedProperty.state}{" "}
                    {selectedProperty.zipCode}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Value</p>
                        <p className="text-lg font-medium">
                            $
                            {selectedProperty.value
                                ? selectedProperty.value?.toLocaleString()
                                : "N/A"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="text-lg font-medium">
                            {selectedProperty.size || 2400} sq ft
                        </p>
                    </div>
                </div>
                <Separator />
                <div className="pt-4 mb-4 space-y-2">
                    <h4 className="font-medium mb-2">Owner Information</h4>

                    {selectedProperty.owners &&
                    selectedProperty.owners.length > 0 ? (
                        selectedProperty.owners.map((owner) => (
                            <Card key={owner.id} className="py-1">
                                <CardHeader>
                                    <CardTitle className="text-sm flex justify-between items-center">
                                        {owner.name}
                                        <div className="flex flex-col text-sm">
                                            <span className="capitalize text-emerald-700">
                                                net worth
                                            </span>
                                            $
                                            {Math.round(
                                                owner.estimatedNetWorth
                                            ).toLocaleString()}
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardFooter className="text-xs ">
                                    Confidence:
                                    <span
                                        className={`ml-1 capitalize ${
                                            owner.confidenceLevel === "low"
                                                ? "text-yellow-600"
                                                : owner.confidenceLevel ===
                                                  "medium"
                                                ? "text-blue-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {owner.confidenceLevel}
                                    </span>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p>No owner information available</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant={isBookmarked ? "default" : "outline"}
                        className="flex items-center gap-2"
                        tabIndex={-1}
                        onClick={handleSaveProperty}
                    >
                        {isBookmarked ? (
                            <>
                                <BookmarkCheck size={16} />
                                Saved
                            </>
                        ) : (
                            <>
                                <Bookmark size={16} />
                                Save Property
                            </>
                        )}
                    </Button>
                    <Button
                        tabIndex={-1}
                        variant="default"
                        className="w-full"
                        onClick={() => onViewPropertyDetails()}
                    >
                        View Detailed Report
                    </Button>
                </div>
            </div>
        </SheetContent>
    );
}
