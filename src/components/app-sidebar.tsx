import * as React from "react";
import {
    Map,
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    MapPinned,
    Bookmark,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { NavUser } from "./nav-user";
import { useAuth } from "@/context/AuthProvider";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "https://images.pexels.com/photos/7688595/pexels-photo-7688595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            requiresActive: true,
        },
        {
            title: "Property Map",
            url: "/map",
            icon: MapPinned,
            requiresActive: true,
        },
        {
            title: "Employees",
            url: "/employees",
            icon: Users,
            requiresActive: true,
            adminOnly: true,
        },
        {
            title: "Reports",
            url: "/reports",
            icon: FileText,
            requiresActive: true,
        },
        {
            title: "Saved Properties",
            url: "/bookmarks",
            icon: Bookmark,
            requiresActive: true,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
            requiresActive: false,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { session } = useAuth();
    const location = useLocation();
    const companyLogo = session?.user?.user_metadata?.company_logo;
    const user = session?.user;
    const fallbackAvatar =
        "https://images.pexels.com/photos/7688595/pexels-photo-7688595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    const userData = {
        name: user?.user_metadata?.fullname,
        email: user?.email || "",
        avatar: companyLogo || fallbackAvatar,
    };
    const userPermissionLevel = session?.user?.user_metadata?.permission_level;

    const filteredNavItems = data.navMain.filter((item) => {
        // Check admin permission
        if (item.adminOnly && userPermissionLevel !== "admin") {
            return false;
        }

        // Check active company requirement
        if (item.requiresActive) {
            return true;
        }

        return true;
    });

    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/dashboard">
                                <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Map className="size-4" />
                                </div>
                                Wealth Map
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {filteredNavItems.map((item) => {
                            const isActive = location.pathname === item.url;
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.url}
                                            className={`font-medium ${
                                                isActive
                                                    ? "text-primary hover:!text-primary"
                                                    : ""
                                            }`}
                                        >
                                            <item.icon />
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {userData && <NavUser user={userData} />}
            </SidebarFooter>
        </Sidebar>
    );
}
