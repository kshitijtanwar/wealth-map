import React, { useState } from "react";
import { Map as GoogleMap } from "@vis.gl/react-google-maps";
import { Sheet } from "@/components/ui/sheet";
import { InfoSlider } from "./InfoSlider";
import { useNavigate } from "react-router-dom";
import type { Property } from "@/types";
import { useTheme } from "@/components/theme-provider";
import { Markers } from "./Markers";
import { useMapData } from "@/hooks/useMapData";

const DEFAULT_CENTER = { lat: 34.109166, lng: -118.431669 };

const Map: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(
        null
    );

    const { data: properties } = useMapData();

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <section className="h-full w-full p-2 pt-0">
                <div className="border rounded-md overflow-hidden w-full h-full">
                    <GoogleMap
                        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                        defaultCenter={DEFAULT_CENTER}
                        defaultZoom={13}
                        colorScheme={theme === "dark" ? "DARK" : "LIGHT"}
                    >
                        <Markers
                            points={properties} // Markers rendered from fetched data
                            setSelectedProperty={setSelectedProperty}
                            setSheetOpen={setSheetOpen}
                        />
                    </GoogleMap>
                </div>
            </section>

            {selectedProperty && (
                <InfoSlider
                    selectedProperty={selectedProperty}
                    onViewPropertyDetails={() => {
                        navigate("/property-detail", {
                            state: {
                                property: selectedProperty,
                                owner: selectedProperty.owner,
                            },
                        });
                    }}
                />
            )}
        </Sheet>
    );
};

export default Map;
