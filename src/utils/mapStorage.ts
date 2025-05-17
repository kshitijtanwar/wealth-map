import { type MapCameraProps } from "@vis.gl/react-google-maps";

const DEFAULT_CENTER = { lat: 34.109166, lng: -118.431669 };
const DEFAULT_ZOOM = 13;

export const getInitialCameraProps = (): MapCameraProps => {
    try {
        const saved = localStorage.getItem("mapCameraProps");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.center && parsed.zoom) {
                return parsed;
            }
        }
    } catch (err) {
        console.error("Error reading camera props from localStorage", err);
    }
    return {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
    };
};

