import React, { useState } from "react";
import { Map as GoogleMap } from "@vis.gl/react-google-maps";
import { Sheet } from "@/components/ui/sheet";
import { InfoSlider } from "./InfoSlider";
import { useNavigate } from "react-router-dom";
import type { Property } from "@/types";
import { useTheme } from "@/components/theme-provider";
import { Markers } from "./Markers";
import { useQuery } from "@tanstack/react-query";
import { getMapData } from "@/services/mapServices";
import {
    type MapCameraChangedEvent,
    type MapCameraProps,
} from "@vis.gl/react-google-maps";
import { getInitialCameraProps } from "@/utils/mapStorage";

const Map: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(
        null
    );

    const { data: properties } = useQuery({
        queryKey: ["mapData"],
        queryFn: getMapData,
        staleTime: 1000 * 60,
    });

    const [cameraProps, setCameraProps] = useState<MapCameraProps>(
        getInitialCameraProps()
    );

    const handleCameraChange = (ev: MapCameraChangedEvent) => {
        const newCameraProps = ev.detail;
        setCameraProps(newCameraProps);
        localStorage.setItem("mapCameraProps", JSON.stringify(newCameraProps));
    };

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <section className="h-full w-full p-2 pt-0">
                <div className="border rounded-md overflow-hidden w-full h-full">
                    <GoogleMap
                        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                        defaultCenter={cameraProps.center}
                        defaultZoom={cameraProps.zoom}
                        colorScheme={theme === "dark" ? "DARK" : "LIGHT"}
                        onCameraChanged={handleCameraChange}
                    >
                        <Markers
                            points={properties ?? []}
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
                        navigate(`/property-detail/${selectedProperty.id}`);
                    }}
                />
            )}
        </Sheet>
    );
};

export default Map;
