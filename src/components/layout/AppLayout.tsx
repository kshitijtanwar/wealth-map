import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { SearchBar } from "../utils/search-bar";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/map": "Map",
    "/reports": "Reports",
    "/settings": "Settings",
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const pageTitle = pageTitles[location.pathname] || "Dashboard"; // Default to Dashboard if route not found

    return (
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
                        <div className="flex justify-between w-full items-center gap-6">
                            <h1>{pageTitle}</h1>
                            <SearchBar />
                        </div>
                    </header>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </AlertDialog>
    );
};
export default AppLayout;
