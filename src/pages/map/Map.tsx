import React, { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";
import { Sheet } from "@/components/ui/sheet";
import { InfoSlider } from "./InfoSlider";

// Dummy property points for San Francisco
const properties = [
    {
        lat: 37.7790262,
        lng: -122.419906,
        address: "123 Market Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94103",
        value: 2500000,
        size: 2100,
        images: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        ],
        owner: "John Smith",
        ownerType: "Individual Owner",
        netWorth: "$12.4M",
    },
    {
        lat: 37.7815,
        lng: -122.4056,
        address: "456 Castro Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94114",
        value: 1800000,
        size: 1600,
        images: [
            "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80",
        ],
        owner: "Jane Doe",
        ownerType: "Individual Owner",
        netWorth: "$8.2M",
    },
    {
        lat: 37.7689,
        lng: -122.4294,
        address: "789 Haight Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94117",
        value: 3100000,
        size: 2800,
        images: [
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
        ],
        owner: "Acme Properties LLC",
        ownerType: "Corporate Owner",
        netWorth: "$25.7M",
    },
];

const Map: React.FC = () => {
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
                        // handle view details
                    }}
                />
            )}
        </Sheet>
    );
};

export default Map;
