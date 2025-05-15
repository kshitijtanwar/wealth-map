import { useState, useEffect, useCallback, useReducer } from "react";
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
import { Plus, MoreVertical, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { authAPI } from "@/db/apiAuth";
import { sendInvitationEmail } from "@/utils/emailService";
import { toast } from "sonner";
import { type Employee, type Invitation } from "@/types";
import { Modal } from "@/components/utils/Modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { initialLoadingState, loadingReducer } from "@/utils/helper";

export default function Employees() {
    const { session } = useAuth();
    const {
        company_name: companyName,
        fullname: senderName,
        company_id: companyId,
        permission_level: userPermissionLevel,
    } = session?.user?.user_metadata || {};

    const [modalAction, setModalAction] = useState<{
        type: "revoke" | "remove" | null;
        id?: string;
        isOpen: boolean;
    }>({ type: null, isOpen: false });

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState<{
        email: string;
        role: "Employee";
    }>({
        email: "",
        role: "Employee",
    });

    const [loadingState, dispatch] = useReducer(
        loadingReducer,
        initialLoadingState
    );

    const fetchInvitations = useCallback(async () => {
        try {
            if (!companyId) return;

            dispatch({ type: "FETCH_INVITATIONS_START" });
            const response = await authAPI.getEmployeeInvitations(companyId);

            if (response.success && response.invitations) {
                setInvitations(response.invitations);
            }
        } catch (error) {
            console.error("Error fetching invitations:", error);
            toast.error("Failed to fetch pending invitations");
        } finally {
            dispatch({ type: "FETCH_INVITATIONS_END" });
        }
    }, [companyId]);

    const fetchEmployees = useCallback(async () => {
        try {
            if (!companyId) {
                console.error("No company ID available");
                return;
            }

            dispatch({ type: "FETCH_EMPLOYEES_START" });
            const employeesResponse = await authAPI.getActiveEmployees(
                companyId
            );

            if (!employeesResponse.success) {
                console.error("API Error:", employeesResponse.error);
                toast.error(
                    employeesResponse.error || "Failed to fetch employees"
                );
                return;
            }

            if (
                !employeesResponse.employees ||
                !Array.isArray(employeesResponse.employees)
            ) {
                console.error(
                    "Invalid employees data:",
                    employeesResponse.employees
                );
                toast.error("Invalid employee data received");
                return;
            }

            // Filter out the current user from the employees list
            const currentUserId = session?.user?.id;
            const activeEmployees: Employee[] = employeesResponse.employees
                .filter((employee) => {
                    const emp = employee.employees as unknown as {
                        id: string;
                        email: string;
                        fullname: string;
                        last_login: string;
                        created_at: string;
                        is_active: boolean;
                    };
                    return emp.id !== currentUserId;
                })
                .map((employee) => {
                    const emp = employee.employees as unknown as {
                        id: string;
                        email: string;
                        fullname: string;
                        last_login: string;
                        created_at: string;
                        is_active: boolean;
                    };
                    return {
                        id: emp.id,
                        name: emp.fullname || "Unknown",
                        email: emp.email,
                        role:
                            employee.permission_level === "admin"
                                ? "Admin"
                                : "Employee",
                        status: "Active",
                        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            emp.email
                        )}`,
                        lastLogin: emp.last_login,
                        joinedDate: employee.invitation_accepted_at,
                    } as Employee;
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
            dispatch({ type: "FETCH_EMPLOYEES_END" });
        }
    }, [companyId, session]);

    useEffect(() => {
        if (companyId) {
            fetchInvitations();
            fetchEmployees();
        }
    }, [companyId, fetchInvitations, fetchEmployees]);

    // Prevent access if user is not an admin
    if (userPermissionLevel !== "admin") {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Access Denied
                    </h1>
                    <p className="text-muted-foreground">
                        You don't have permission to access this page.
                    </p>
                </div>
            </div>
        );
    }

    const handleInvite = async () => {
        dispatch({ type: "INVITE_START" });
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
            dispatch({ type: "INVITE_END" });
            setIsInviteDialogOpen(false);
            setNewEmployee({ email: "", role: "Employee" });
        }
    };

    const handleRevokeInvitation = async (invitationId: string) => {
        dispatch({ type: "REVOKE_INVITATION_START" });
        try {
            const response = await authAPI.revokeEmployeeInvitation(
                invitationId
            );
            if (!response.success) throw new Error(response.error);
            fetchInvitations(); // Refresh the invitations list
        } catch (error) {
            console.error("Error revoking invitation:", error);
            toast.error("Failed to revoke invitation");
        } finally {
            dispatch({ type: "REVOKE_INVITATION_END" });
        }
    };

    const handleRevokeAccess = async (employeeId: string) => {
        dispatch({ type: "REVOKE_ACCESS_START" });
        try {
            if (!companyId) {
                toast.error("Company ID not found");
                return;
            }

            const response = await authAPI.deactivateEmployee(
                companyId,
                employeeId
            );
            if (!response.success) throw new Error(response.error);
            await fetchEmployees();
        } catch (error) {
            console.error("Error revoking access:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to revoke access"
            );
        } finally {
            dispatch({ type: "REVOKE_ACCESS_END" });
        }
    };

    const handleRemoveEmployee = async (employeeId: string) => {
        dispatch({ type: "REMOVE_EMPLOYEE_START" });
        try {
            if (!companyId || !session?.user?.id) {
                toast.error("Missing required information");
                return;
            }

            const response = await authAPI.removeEmployee(
                companyId,
                employeeId,
                session.user.id
            );
            if (!response.success) throw new Error(response.error);

            await fetchEmployees();
        } catch (error) {
            console.error("Error removing employee:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to remove employee"
            );
        } finally {
            dispatch({ type: "REMOVE_EMPLOYEE_END" });
        }
    };

    const handleConfirm = async () => {
        try {
            if (!modalAction.id) return;
            switch (modalAction.type) {
                case "revoke":
                    if (invitations.find((inv) => inv.id === modalAction.id)) {
                        await handleRevokeInvitation(modalAction.id);
                    } else {
                        await handleRevokeAccess(modalAction.id);
                    }
                    break;

                case "remove":
                    await handleRemoveEmployee(modalAction.id);
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error("Error in modal confirmation:", error);
        } finally {
            setModalAction({ type: null, isOpen: false });
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
                                isLoading={loadingState.inviting}
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
                                            className={`px-3 py-1 rounded-full ${
                                                employee.status === "Active"
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
                                                            setModalAction({
                                                                type: "revoke",
                                                                id: employee.id,
                                                                isOpen: true,
                                                            })
                                                        }
                                                    >
                                                        Revoke Access
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() =>
                                                        setModalAction({
                                                            type: "remove",
                                                            id: employee.id,
                                                            isOpen: true,
                                                        })
                                                    }
                                                >
                                                    {loadingState.removingEmployee &&
                                                    modalAction.id ===
                                                        employee.id
                                                        ? "Removing..."
                                                        : "Remove Employee"}
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
                                                    {invitation.email
                                                        .charAt(0)
                                                        .toUpperCase()}
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
                                                    onClick={() =>
                                                        setModalAction({
                                                            type: "revoke",
                                                            id: invitation.id,
                                                            isOpen: true,
                                                        })
                                                    }
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
                        No employees onboarded. Invite them to interact with
                        them.
                    </h1>
                )}
            </div>
            <AlertDialog
                open={modalAction.isOpen}
                onOpenChange={(open) =>
                    setModalAction((prev) => ({ ...prev, isOpen: open }))
                }
            >
                <Modal
                    title={
                        modalAction.type === "revoke"
                            ? "Revoke Access"
                            : modalAction.type === "remove"
                            ? "Remove Employee"
                            : "Confirmation"
                    }
                    description={
                        modalAction.type === "revoke" &&
                        invitations.find((inv) => inv.id === modalAction.id)
                            ? "This will revoke the invitation. The user won't be able to join your organization with this invitation link."
                            : modalAction.type === "revoke"
                            ? "This will revoke the employee's access to the system. They will no longer be able to log in."
                            : modalAction.type === "remove"
                            ? "This will permanently remove the employee from your organization. This action cannot be undone."
                            : "Are you sure you want to continue with this action?"
                    }
                    onConfirm={handleConfirm}
                />
            </AlertDialog>
        </div>
    );
}
