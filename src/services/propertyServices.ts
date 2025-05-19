import axios from "axios";
import { toast } from "sonner";

export const getPropertyDetail = async ({ id }: { id?: string }) => {
    const promise = axios.get(`properties/${id}`);

    toast.promise(promise, {
        loading: "Loading property details...",
        success: "Property details loaded successfully",
        error: "Failed to load property details",
    });

    try {
        const response = await promise;
        return response.data ?? [];
    } catch (error) {
        console.error("Error fetching property data:", error);
        throw error;
    }
};
