import type { Property } from "@/types";
import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_BACKEND_URL_PROD || import.meta.env.VITE_BACKEND_URL;

export const getMapData = async (): Promise<Property[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/properties`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch map data:", error);
        throw error;
    }
};
