import React, { useState } from "react";
import {
    APIProvider,
    Map as GoogleMap,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { Sheet } from "@/components/ui/sheet";
import { InfoSlider } from "./InfoSlider";
import { useNavigate } from "react-router-dom";
import { properties } from "@/../dummyData";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";

const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 }; // San Francisco

const Map: React.FC = () => {
    const navigate = useNavigate();
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<
        (typeof properties)[0] | null
    >(null);

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <section className="h-full w-full p-2 pt-0">
                <div className="border rounded-md overflow-hidden w-full h-full">
                    <APIProvider
                        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    >
                        <GoogleMap
                            mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                            defaultCenter={DEFAULT_CENTER}
                            defaultZoom={13}
                        >
                            {properties.map((property, idx) => (
                                <AdvancedMarker
                                    key={idx}
                                    position={{
                                        lat: property.lat,
                                        lng: property.lng,
                                    }}
                                    onClick={() => {
                                        setSelectedProperty(property);
                                        setSheetOpen(true);
                                    }}
                                />
                            ))}
                        </GoogleMap>
                    </APIProvider>
                </div>
            </section>

            {selectedProperty && (
                <InfoSlider
                    selectedProperty={selectedProperty}
                    onViewPropertyDetails={() => {
                        navigate("/property-detail");
                    }}
                />
            )}
        </Sheet>
    );
};

export default Map;
