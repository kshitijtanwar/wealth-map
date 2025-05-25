import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { SearchProvider } from "../../context/search-provider";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import AccessDenied from "../utils/AccessDenied";
import { SearchFilter } from "../search/SearchFilter";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ModeToggle } from "../utils/mode-toggle";
import { SearchBar } from "../search/maps/search-bar";
import { getPageTitle } from "@/utils/helper";
import { useHasActiveCompany } from "@/hooks/useHasActiveCompany";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/employees/revoked": "Employees",
    "/map": "Property Map",
    "/reports": "Reports",
    "/settings": "Settings",
    "/search": "Search",
    "/bookmarks": "Saved Properties",
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const { session } = useAuth();
    const pageTitle = getPageTitle(pageTitles);

    const hasActiveCompany = useHasActiveCompany(session?.user?.id);

    const shouldShowAccessDenied =
        !hasActiveCompany &&
        (location.pathname === "/map" ||
            location.pathname.startsWith("/property-detail/"));

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
                                <SidebarTrigger className="-ml-1 cursor-pointer hover:text-primary" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 !h-8"
                                />
                                <div className="flex w-full items-center gap-2">
                                    <span className="flex-1 font-medium mr-4 text-lg">
                                        {pageTitle}
                                    </span>
                                    <ModeToggle />
                                    {location.pathname == "/map" ? (
                                        <SearchBar />
                                    ) : (
                                        <SearchFilter />
                                    )}
                                </div>
                            </header>
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
