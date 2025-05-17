import axios from "axios";
import type { Property } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getMapData = async (): Promise<Property[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/properties`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch map data:", error);
        throw error;
    }
};
