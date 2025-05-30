import { useRef, useState, useEffect } from "react";
import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { debounce } from "lodash";
import SearchMarker from "./SearchMarker";
import { Input } from "../../ui/input";
import { Info, Search } from "lucide-react";
import type { RefObject } from "react";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const SearchBar = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const map = useMap();
    const [suggestions, setSuggestions] = useState<
        google.maps.places.AutocompletePrediction[]
    >([]);
    const [markerPosition, setMarkerPosition] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const autocompleteService =
        useRef<google.maps.places.AutocompleteService | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);

    useOnClickOutside(containerRef as RefObject<HTMLDivElement>, () => {
        setIsFocused(false);
    });

    useEffect(() => {
        if (window.google && !autocompleteService.current && map) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService();
            placesService.current = new window.google.maps.places.PlacesService(
                map
            );
        }
    }, [map]);

    const fetchSuggestions = debounce((input: string) => {
        if (!autocompleteService.current || input.trim() === "") {
            setSuggestions([]);
            return;
        }

        autocompleteService.current.getPlacePredictions(
            {
                input,
                types: ["geocode"],
                componentRestrictions: { country: "us" },
            },
            (predictions) => {
                if (predictions) setSuggestions(predictions);
                else setSuggestions([]);
            }
        );
    }, 400);

    const handleInput = () => {
        const inputValue = inputRef.current?.value || "";
        fetchSuggestions(inputValue);
    };

    const handleSelect = (placeId: string, description: string) => {
        if (!placesService.current) return;

        if (inputRef.current) {
            inputRef.current.value = description;
        }

        placesService.current.getDetails(
            { placeId, fields: ["geometry"] },
            (place, status) => {
                if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    place?.geometry?.location
                ) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    setMarkerPosition({ lat, lng });
                    map?.panTo({ lat, lng });
                    map?.setZoom(15);
                    setSuggestions([]);
                    setIsFocused(false);
                }
            }
        );
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-sm backdrop-blur-sm rounded-lg p-1 z-[15]"
        >
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none z-10" />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for places..."
                    onChange={handleInput}
                    onFocus={() => setIsFocused(true)}
                    onClick={() => setIsFocused(true)}
                    className="w-full pl-9 pr-4 py-2"
                />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Info
                            size={16}
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Search to navigate map to a specific place</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            {suggestions.length > 0 && isFocused && (
                <ul className="absolute z-[10] mt-1 w-full bg-white dark:bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto text-sm">
                    {suggestions.map((s) => (
                        <li
                            key={s.place_id}
                            className="px-4 py-2 hover:text-primary cursor-pointer transition-colors"
                            onClick={() =>
                                handleSelect(s.place_id, s.description)
                            }
                        >
                            {s.description}
                        </li>
                    ))}
                </ul>
            )}
            {markerPosition && (
                <AdvancedMarker position={markerPosition}>
                    <SearchMarker />
                </AdvancedMarker>
            )}
        </div>
    );
};
