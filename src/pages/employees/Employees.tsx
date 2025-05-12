import { useState } from "react";
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

interface Employee {
    id: string;
    name: string;
    email: string;
    role: "Employee" | "Admin";
    status: "Active" | "Pending" | "Revoked";
    avatarUrl?: string;
}

export default function Employees() {
    const { session } = useAuth();

    const companyName =
        session?.user?.user_metadata?.company_name || "Your Company";
    const senderName = session?.user?.user_metadata?.fullname || "Admin";

    const [employees, setEmployees] = useState<Employee[]>([
        {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "Employee",
            status: "Active",
            avatarUrl:
                "https://images.pexels.com/photos/9072338/pexels-photo-9072338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Employee",
            status: "Active",
            avatarUrl:
                "https://images.pexels.com/photos/7688554/pexels-photo-7688554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: "3",
            name: "Robert Johnson",
            email: "robert.johnson@example.com",
            role: "Admin",
            status: "Active",
            avatarUrl:
                "https://images.pexels.com/photos/10983885/pexels-photo-10983885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
    ]);

    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newEmployee, setNewEmployee] = useState<{
        email: string;
        role: "Employee";
    }>({
        email: "",
        role: "Employee",
    });

    const handleInvite = async () => {
        setIsLoading(true);
        try {
            const userId = session?.user?.id;
            const companyId = session?.user?.user_metadata?.company_id;
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
                    toast.success("Invitation sent!!");
                }
            }
        } catch (error) {
            console.error("Failed to invite employee:", error);
            toast.error("Failed to invite employee. Please try again.");
        } finally {
            setIsLoading(false);
            setIsInviteDialogOpen(false);
        }
    };

    const handleRevokeAccess = (id: string) => {
        setEmployees(
            employees.map((employee) =>
                employee.id === id
                    ? { ...employee, status: "Revoked" }
                    : employee
            )
        );
    };

    const handleRemoveEmployee = (id: string) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
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
                {employees.length > 0 ? (
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
                                                    Remove Employee
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
        </div>
    );
}
