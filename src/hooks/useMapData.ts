// src/hooks/useMapData.ts
import { useEffect, useState } from "react";
import { getMapData } from "@/services/mapServices";
import type { Property } from "@/types";

export const useMapData = () => {
    const [data, setData] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMapData();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, loading, error };
};
