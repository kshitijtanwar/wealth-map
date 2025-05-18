import axios from "axios";
import { toast } from "sonner";

export const getPropertyDetail = async ({ id }: { id?: string }) => {
    try {
        const response = await axios.get(`properties/${id}`);
        toast.success("Property details fetched");
        return response.data ?? [];
    } catch (error) {
        toast.error("Error fetching property data");
        console.error("Error fetching property data:", error);
        throw error;
    }
};
