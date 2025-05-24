import { useEffect, useState } from "react";
import supabase from "@/db/supabase";

export function useHasActiveCompany(userId?: string) {
    const [hasActiveCompany, setHasActiveCompany] = useState<boolean | null>(
        null
    );

    useEffect(() => {
        const checkActiveCompany = async () => {
            if (!userId) return;

            const { data: activeCompanies, error } = await supabase
                .from("company_employees")
                .select("id")
                .eq("employee_id", userId)
                .eq("is_active", true);

            if (error) {
                console.error("Error checking active companies:", error);
                setHasActiveCompany(false); // fallback to false on error
                return;
            }

            const isActive = activeCompanies && activeCompanies.length > 0;
            setHasActiveCompany(isActive);
        };

        checkActiveCompany();
    }, [userId]);

    return hasActiveCompany; // null initially, then true/false
}
