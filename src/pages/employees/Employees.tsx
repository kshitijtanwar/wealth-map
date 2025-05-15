import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Shield, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { authAPI } from "@/db/apiAuth";
import { sendInvitationEmail } from "@/utils/emailService";
import { toast } from "sonner";
import supabase from "@/db/supabase";
import AccessDenied from "@/components/AccessDenied";
interface Employee {
    id: string;
    name: string;
    email: string;
    role: "Employee" | "Admin";
    status: "Active" | "Pending" | "Revoked";
    avatarUrl?: string;
    lastLogin?: string;
    joinedDate?: string;
    is_active?: boolean;
}

interface Invitation {
    id: string;
    email: string;
    permission_level: string;
    expires_at: string;
    is_used: boolean;
}

export default function Employees() {
    const { session } = useAuth();
    const companyName = session?.user?.user_metadata?.company_name || "Your Company";
    const senderName = session?.user?.user_metadata?.fullname || "Admin";
    const companyId = session?.user?.user_metadata?.company_id;
    const userPermissionLevel = session?.user?.user_metadata?.permission_level;

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState<{
        email: string;
        role: "Employee";
    }>({
        email: "",
        role: "Employee",
    });

    // Prevent access if user is not an admin
    if (userPermissionLevel !== "admin") {
        return <AccessDenied />;
    }

    useEffect(() => {
        if (companyId) {
            fetchInvitations();
            fetchEmployees();
        }
    }, [companyId]);

    const fetchInvitations = async () => {
        try {
            if (!companyId) return;

            const response = await authAPI.getEmployeeInvitations(companyId);
            if (response.success && response.invitations) {
                setInvitations(response.invitations);
            }
        } catch (error) {
            console.error("Error fetching invitations:", error);
            toast.error("Failed to fetch pending invitations");
        }
    };

    const fetchEmployees = async () => {
        try {
            if (!companyId) {
                console.error("No company ID available");
                return;
            }

            setIsLoading(true);

            const employeesResponse = await authAPI.getActiveEmployees(companyId);

            if (!employeesResponse.success) {
                console.error("API Error:", employeesResponse.error);
                toast.error(employeesResponse.error || "Failed to fetch employees");
                return;
            }

            if (!employeesResponse.employees || !Array.isArray(employeesResponse.employees)) {
                console.error("Invalid employees data:", employeesResponse.employees);
                toast.error("Invalid employee data received");
                return;
            }

            // Filter out the current user from the employees list
            const currentUserId = session?.user?.id;
            const activeEmployees: Employee[] = employeesResponse.employees
                .filter(employee => {
                    const emp = employee.employees as unknown as { 
                        id: string; 
                        email: string; 
                        fullname: string; 
                        last_login: string; 
                        created_at: string; 
                        is_active: boolean 
                    };
                    return emp.id !== currentUserId;
                })
                .map(employee => {
                    const emp = employee.employees as unknown as { 
                        id: string; 
                        email: string; 
                        fullname: string; 
                        last_login: string; 
                        created_at: string; 
                        is_active: boolean 
                    };
                    return {
                        id: emp.id,
                        name: emp.fullname || 'Unknown',
                        email: emp.email,
                        role: employee.permission_level === 'admin' ? 'Admin' : 'Employee',
                        status: 'Active',
                        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.email)}`,
                        lastLogin: emp.last_login,
                        joinedDate: employee.invitation_accepted_at
                    };
                });

            setEmployees(activeEmployees);
        } catch (error) {
            console.error("Error fetching employees:", error);
            if (error instanceof Error) {
                console.error("Error details:", error.message);
                toast.error(`Failed to fetch employees: ${error.message}`);
            } else {
                toast.error("Failed to fetch employees");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleInvite = async () => {
        setIsLoading(true);
        try {
            const userId = session?.user?.id;
            if (!userId || !companyId || !newEmployee.email) {
                throw new Error("User ID, Company ID or email is missing.");
            }

            const response = await authAPI.inviteEmployee(userId, companyId, {
                email: newEmployee.email,
                permissionLevel: "employee",
            });

            if (response.success && response.invitationLink) {
                // Send invitation email
                const res = await sendInvitationEmail({
                    to_email: newEmployee.email,
                    to_name: newEmployee.email.split("@")[0],
                    invitation_link: response.invitationLink,
                    company_name: companyName,
                    sender_name: senderName,
                    role: newEmployee.role,
                });

                if (res.success) {
                    toast.success("Invitation sent!");
                    fetchInvitations(); // Refresh the invitations list
                }
            }
        } catch (error) {
            console.error("Failed to invite employee:", error);
            toast.error("Failed to invite employee. Please try again.");
        } finally {
            setIsLoading(false);
            setIsInviteDialogOpen(false);
            setNewEmployee({ email: "", role: "Employee" });
        }
    };

    const handleRevokeInvitation = async (invitationId: string) => {
        try {
            const response = await authAPI.revokeEmployeeInvitation(invitationId);

            if (!response.success) {
                throw new Error(response.error);
            }

            toast.success("Invitation revoked");
            fetchInvitations(); // Refresh the invitations list
        } catch (error) {
            console.error("Error revoking invitation:", error);
            toast.error("Failed to revoke invitation");
        }
    };

    const handleRevokeAccess = async (employeeId: string) => {
        try {
            if (!companyId) {
                toast.error("Company ID not found");
                return;
            }

            setIsLoading(true);
            const response = await authAPI.deactivateEmployee(companyId, employeeId);

            if (response.success) {
                toast.success("Employee access revoked successfully");
                // Refresh the employees list
                await fetchEmployees();
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            console.error("Error revoking access:", error);
            toast.error(error instanceof Error ? error.message : "Failed to revoke access");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveEmployee = async (employeeId: string) => {
        try {
            if (!companyId || !session?.user?.id) {
                toast.error("Missing required information");
                return;
            }

            setIsLoading(true);


            const response = await authAPI.removeEmployee(
                companyId,
                employeeId,
                session.user.id
            );

            if (response.success) {
                toast.success("Employee removed successfully");
                // Refresh the employees list
                await fetchEmployees();
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            console.error("Error removing employee:", error);
            toast.error(error instanceof Error ? error.message : "Failed to remove employee");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border mx-4">
            <div className="p-6 flex flex-col sm:flex-row gap-3 justify-between items-center border-b">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Employee Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage employee accounts and permissions
                    </p>
                </div>
                <Dialog
                    open={isInviteDialogOpen}
                    onOpenChange={setIsInviteDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4" /> Invite Employee
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Invite a new employee</DialogTitle>
                            <DialogDescription>
                                Send an invitation to a new team member.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="employee@example.com"
                                value={newEmployee.email}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsInviteDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleInvite}
                                isLoading={isLoading}
                            >
                                Send
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="overflow-x-auto">
                {employees.length > 0 || invitations.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-muted-foreground text-sm">
                                <th className="text-left py-4 px-6 font-medium text-gray-500">
                                    EMPLOYEE
                                </th>
                                <th className="text-left py-4 px-6 font-medium text-gray-500">
                                    EMAIL
                                </th>
                                <th className="text-left py-4 px-6 font-medium text-gray-500">
                                    ROLE
                                </th>
                                <th className="text-left py-4 px-6 font-medium text-gray-500">
                                    STATUS
                                </th>
                                <th className="py-4 px-6"></th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {/* Active Employees */}
                            {employees.map((employee) => (
                                <tr key={employee.id} className="border-b">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage
                                                    className="object-cover object-top"
                                                    src={
                                                        employee.avatarUrl ||
                                                        "/placeholder.svg"
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {employee.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">
                                                {employee.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        {employee.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-indigo-500" />
                                            {employee.role}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Badge
                                            variant="outline"
                                            className={`px-3 py-1 rounded-full ${employee.status === "Active"
                                                ? "bg-green-100 text-green-800 border-green-200"
                                                : employee.status ===
                                                    "Pending"
                                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                    : "bg-red-100 text-red-800 border-red-200"
                                                }`}
                                        >
                                            {employee.status}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-500"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {employee.status ===
                                                    "Active" && (
                                                        <DropdownMenuItem
                                                            className="text-amber-600"
                                                            onClick={() =>
                                                                handleRevokeAccess(
                                                                    employee.id
                                                                )
                                                            }
                                                        >
                                                            Revoke Access
                                                        </DropdownMenuItem>
                                                    )}
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() =>
                                                        handleRemoveEmployee(
                                                            employee.id
                                                        )
                                                    }
                                                >
                                                    {isLoading ? "Removing..." : "Remove Employee"}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}

                            {/* Pending Invitations */}
                            {invitations.map((invitation) => (
                                <tr key={invitation.id} className="border-b">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {invitation.email.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">
                                                {invitation.email.split("@")[0]}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        {invitation.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-indigo-500" />
                                            {invitation.permission_level}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Badge
                                            variant="outline"
                                            className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 border-yellow-200"
                                        >
                                            Pending
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-500"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    className="text-amber-600"
                                                    onClick={() => handleRevokeInvitation(invitation.id)}
                                                >
                                                    Revoke Invitation
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1 className="text-center text-muted-foreground py-6">
                        No employees onboarded. Invite them to interact with them.
                    </h1>
                )}
            </div>
        </div>
    );
}