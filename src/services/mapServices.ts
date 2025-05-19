import type { Property } from "@/types";
import axios from "axios";
import { toast } from "sonner";

export const getMapData = async (): Promise<Property[]> => {
    const promise = axios.get<Property[]>(`properties`);

    toast.promise(promise, {
        loading: "Loading map data...",
        success: "Map data loaded successfully",
        error: "Failed to load map data",
    });

    try {
        const response = await promise;
        return response.data ?? [];
    } catch (error) {
        console.error("Failed to fetch map data:", error);
        throw error;
    }
};
