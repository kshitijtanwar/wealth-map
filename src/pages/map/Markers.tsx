import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { type Property } from "@/types";
import { useMap } from "@vis.gl/react-google-maps";
import { useRef, useEffect } from "react";

interface MarkersProps {
    points: Property[];
    setSelectedProperty: React.Dispatch<React.SetStateAction<Property | null>>;
    setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Markers: React.FC<MarkersProps> = ({
    points,
    setSelectedProperty,
    setSheetOpen,
}) => {
    const map = useMap();
    const clusterer = useRef<MarkerClusterer | null>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);

    useEffect(() => {
        if (!map) return;

        // Clear previous markers
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        // Ensure points is an array
        const safePoints = Array.isArray(points) ? points : [];

        const newMarkers = safePoints.map((property) => {
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
