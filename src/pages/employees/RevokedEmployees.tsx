import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import { authAPI } from "@/db/apiAuth";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface Employee {
    id: string;
    email: string;
    fullname: string;
    avatar_url?: string;
    last_login: string;
    created_at: string;
    is_active: boolean;
}

interface Company {
    name: string;
}

interface RevokedEmployee {
    id: string;
    permission_level: string;
    is_active: boolean;
    invitation_accepted_at: string;
    employees: Employee;
    companies: Company;
    created_at: string;
}

const RevokedEmployees = () => {
    const { session } = useAuth();
    const { company_id } = session?.user?.user_metadata || {};
    const [revokedEmployees, setRevokedEmployees] = useState<RevokedEmployee[]>(
        []
    );
    const [loadingRevoked, setLoadingRevoked] = useState(false);

    const fetchRevokedEmployees = useCallback(async () => {
        setLoadingRevoked(true);
        const { success, employees, error } = await authAPI.getRevokedEmployees(
            company_id
        );
        if (success && employees) {
            setRevokedEmployees(employees as unknown as RevokedEmployee[]);
        } else {
            toast.error(error || "Failed to load revoked employees");
        }
        setLoadingRevoked(false);
    }, [company_id]);

    useEffect(() => {
        if (company_id) {
            fetchRevokedEmployees();
        }
    }, [company_id, fetchRevokedEmployees]);

    const handleReactivate = async (employeeId: string) => {
        const { success, error } = await authAPI.reactivateEmployee(
            company_id,
            employeeId
        );
        if (success) {
            toast.success("Employee access has been restored");
            fetchRevokedEmployees(); 
        } else {
            toast.error(error || "Failed to reactivate employee");
        }
    };

    return (
        <Card className="border-none shadow-none bg-inherit">
            <CardHeader>
                <CardTitle>Revoked Employee Access</CardTitle>
                <CardDescription>
                    Manage employees who have had their access revoked
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loadingRevoked ? (
                    <div>Loading revoked employees...</div>
                ) : revokedEmployees.length === 0 ? (
                    <div className="text-muted-foreground">
                        No employees with revoked access
                    </div>
                ) : (
                    <div className="space-y-4">
                        {revokedEmployees.map((employee) => (
                            <div
                                key={employee.employees.id}
                                className="flex flex-col xs:flex-row gap-2 xs:items-center justify-between p-4 border rounded-md"
                            >
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={employee.employees.avatar_url}
                                            alt={employee.employees.fullname}
                                        />
                                        <AvatarFallback>
                                            {employee.employees.fullname
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">
                                            {employee.employees.fullname}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {employee.employees.email}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Revoked on:{" "}
                                            {new Date(
                                                employee.created_at
                                            ).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        handleReactivate(employee.employees.id)
                                    }
                                    className="w-full xs:w-fit"
                                >
                                    Restore Access
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
export default RevokedEmployees;
