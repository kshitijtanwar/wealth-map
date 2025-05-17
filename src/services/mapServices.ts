import type { Property } from "@/types";
import axios from "axios";

export const getMapData = async (): Promise<Property[]> => {
    try {
        const response = await axios.get(`properties`);
        return response.data ?? [];
    } catch (error) {
        console.error("Failed to fetch map data:", error);
        throw error;
    }
};
