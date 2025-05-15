import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef, useEffect, useState } from "react";
import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Button } from "../ui/button";
import SearchMarker from "./SearchMarker";

export const SearchBar: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const map = useMap();
    const [markerPosition, setMarkerPosition] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    useEffect(() => {
        if (
            !window.google ||
            !window.google.maps ||
            !window.google.maps.places ||
            !inputRef.current
        )
            return;

        const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current,
            {
                types: ["geocode"],
            }
        );

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setMarkerPosition({ lat, lng }); // Set marker position
                if (map) {
                    map.panTo({ lat, lng });
                    map.setZoom(15);
                }
            }
        });

        return () => {
            window.google.maps.event.clearInstanceListeners(autocomplete);
        };
    }, [map]);

    return (
        <div className={`relative flex w-full max-w-sm items-center`}>
            <div className="relative w-full">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    type="search"
                    className="w-full pl-9 pr-12"
                    aria-label="Search"
                    placeholder="Search for locations..."
                />
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                    <span className="sr-only">Search</span>
                    <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                        ⏎
                    </kbd>
                </Button>
            </div>
            {markerPosition && (
                <AdvancedMarker position={markerPosition}>
                    <SearchMarker />
                </AdvancedMarker>
            )}
        </div>
    );
};
