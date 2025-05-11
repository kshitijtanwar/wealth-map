import * as React from "react";
import { Map, LayoutDashboard, Users, FileText, Settings } from "lucide-react";
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
import { Link } from "react-router-dom";
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
        },
        {
            title: "Employees",
            url: "/employees",
            icon: Users,
        },
        {
            title: "Reports",
            url: "#",
            icon: FileText,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { session } = useAuth();
    console.log("session", session);
    const companyLogo = session?.user?.user_metadata?.company_logo;
    console.log("companyLogo", companyLogo);
    const user = session?.user;
    const fallbackAvatar = 'https://images.pexels.com/photos/7688595/pexels-photo-7688595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    const userData = {
        name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User',
        email: user?.email || '',
        avatar: companyLogo || fallbackAvatar,
    };
    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/dashboard">
                                {companyLogo ? (
                                    <img
                                        src={companyLogo}
                                        alt="Company Logo"
                                        className="size-8 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Map className="size-4" />
                                    </div>
                                )}
                                <span className="font-medium">
                                    {user?.user_metadata?.company_name || 'Wealth Map'}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link to={item.url} className="font-medium">
                                        <item.icon />
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {userData && <NavUser user={userData} />}
            </SidebarFooter>
        </Sidebar>
    );
}
