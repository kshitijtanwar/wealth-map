import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { SearchProvider } from "../utils/search-provider";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "@/db/supabase";
import { useAuth } from "@/context/AuthProvider";
import AccessDenied from "../AccessDenied";
import { PropertyFilter } from "../utils/property-filter";
import { SearchFilter } from "../utils/SearchFilter";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ModeToggle } from "../utils/mode-toggle";
import { SearchBar } from "../utils/search-bar";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/map": "Map",
    "/property-detail": "Property Detail",
    "/reports": "Reports",
    "/settings": "Settings",
    "/search": "Search",
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const { session } = useAuth();
    const [hasActiveCompany, setHasActiveCompany] = useState(true);
    const pageTitle = pageTitles[location.pathname] || "Dashboard";

    useEffect(() => {
        const checkActiveCompany = async () => {
            if (!session?.user?.id) return;

            const { data: activeCompanies, error } = await supabase
                .from("company_employees")
                .select("id")
                .eq("employee_id", session.user.id)
                .eq("is_active", true);

            if (error) {
                console.error("Error checking active companies:", error);
                return;
            }

            const isActive = activeCompanies && activeCompanies.length > 0;
            setHasActiveCompany(isActive);
        };

        checkActiveCompany();
    }, [session?.user?.id]);

    const shouldShowAccessDenied =
        !hasActiveCompany && location.pathname === "/map";

    return (
        <SearchProvider>
            <APIProvider
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={["places"]}
            >
                <AlertDialog>
                    <SidebarProvider
                        style={
                            {
                                "--sidebar-width": "19rem",
                            } as React.CSSProperties
                        }
                        className="p-1"
                    >
                        <AppSidebar />
                        <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 px-4 mb-2">
                                <SidebarTrigger className="-ml-1" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 !h-8"
                                />
                                <div className="flex w-full items-center gap-6">
                                    <span className="flex-1">{pageTitle}</span>
                                    {location.pathname !== "/map" && (
                                        <>
                                            <ModeToggle />
                                            <SearchFilter />
                                            <PropertyFilter />
                                        </>
                                    )}
                                    {location.pathname == "/map" && (
                                        <SearchBar />
                                    )}
                                </div>
                            </header>
                            {/* <SearchResults /> */}
                            {shouldShowAccessDenied ? (
                                <AccessDenied />
                            ) : (
                                children
                            )}
                        </SidebarInset>
                    </SidebarProvider>
                </AlertDialog>
            </APIProvider>
        </SearchProvider>
    );
};

export default AppLayout;
