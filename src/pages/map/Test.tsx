import { useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";

const Test = () => {
    const position = { lat: 28.649969, lng: 77.16523 };
    return (
        <APIProvider
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        >
            <div className="w-screen h-screen">
                <Map mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}>
                    <AdvancedMarker position={position}></AdvancedMarker>
                </Map>
            </div>
        </APIProvider>
    );
};
export default Test;
