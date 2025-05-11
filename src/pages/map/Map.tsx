import React, { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";
import { Sheet } from "@/components/ui/sheet";
import { InfoSlider } from "./InfoSlider";
import { useNavigate } from "react-router-dom";
import { properties } from "@/../dummyData";

const Map: React.FC = () => {
    const navigate = useNavigate();
    const mapRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<
        (typeof properties)[0] | null
    >(null);

    // Set up resize observer to monitor section size changes
    useEffect(() => {
        if (!sectionRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setContainerSize({ width, height });
            }
        });

        resizeObserver.observe(sectionRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    // Initialize map - will re-run when container size changes
    useEffect(() => {
        if (
            !mapRef.current ||
            containerSize.width === 0 ||
            containerSize.height === 0
        )
            return;

        const platform = new H.service.Platform({
            apikey: import.meta.env.VITE_HERE_API_KEY as string,
        });

        const defaultLayers = platform.createDefaultLayers();
        // @ts-expect-error - HERE Maps doesn't provide proper TypeScript definitions for the map
        const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
            zoom: 13,
            pixelRatio: window.devicePixelRatio || 1,
        });

        // Enable map events
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Add default UI components
        H.ui.UI.createDefault(map, defaultLayers);

        properties.forEach((property) => {
            const marker = new H.map.Marker({
                lat: property.lat,
                lng: property.lng,
            });
            marker.setData(property);
            // @ts-expect-error - HERE Maps doesn't provide proper TypeScript definitions for event objects
            marker.addEventListener("tap", function (evt) {
                const prop = evt.target.getData();
                setSelectedProperty(prop);
                setSheetOpen(true);
            });
            map.addObject(marker);
        });

        // Cleanup on component unmount or size change
        return () => {
            map.dispose();
        };
    }, [containerSize]); // Re-initialize when container size changes

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <section ref={sectionRef} className="p-4 h-full w-full">
                <div
                    ref={mapRef}
                    className="border rounded-md overflow-hidden w-full h-[500px]"
                />
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
