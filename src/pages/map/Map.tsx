import React, { useEffect, useRef, useState } from "react";
import { Map as GoogleMap, useMap } from "@vis.gl/react-google-maps";
import { Sheet } from "@/components/ui/sheet";
import { InfoSlider } from "./InfoSlider";
import { useNavigate } from "react-router-dom";
import { properties } from "@/../dummyData";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Property } from "@/types";
import { useTheme } from "@/components/theme-provider";

const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 }; // San Francisco

interface MarkersProps {
    points: Property[];
    setSelectedProperty: React.Dispatch<React.SetStateAction<Property | null>>;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Markers: React.FC<MarkersProps> = ({
    points,
    setSelectedProperty,
    setSheetOpen,
}) => {
    const map = useMap();
    const clusterer = useRef<MarkerClusterer | null>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);

    useEffect(() => {
        if (!map) return;
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        const newMarkers = points.map((property) => {
            const marker = new google.maps.Marker({
                position: {
                    lat: property.coordinates.lat,
                    lng: property.coordinates.lng,
                },
            });
            marker.addListener("click", () => {
                setSelectedProperty(property);
                setSheetOpen(true);
            });
            return marker;
        });
        markersRef.current = newMarkers;

        // Create or update clusterer
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({
                markers: newMarkers,
                map,
            });
        } else {
            clusterer.current.clearMarkers();
            clusterer.current.addMarkers(newMarkers);
        }

        return () => {
            newMarkers.forEach((marker) => marker.setMap(null));
        };
    }, [map, points, setSelectedProperty, setSheetOpen]);

    return null;
};

const Map: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(
        null
    );

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
                            points={properties}
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
