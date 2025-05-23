import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { mockReports } from "../../../dummyData";
import { type Report } from "@/types";
import { toast } from "sonner";

export default function Reports() {
    const { session } = useAuth();
    const [reports, setReports] = useState<Report[]>([]);
    const userPermission =
        session?.user?.user_metadata?.permission_level || "user";
    const isAdmin = userPermission === "admin";

    useEffect(() => {
        const fetchReports = async () => {
            try {
                if (isAdmin) {
                    setReports(mockReports);
                } else {
                    const userReports = mockReports.filter(
                        (report) =>
                            report.createdBy ===
                            session?.user?.user_metadata?.fullname
                    );
                    setReports(userReports);
                }
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            }
        };

        fetchReports();
    }, [session, isAdmin]);

    const handleViewReport = () => {
        toast.info("Report will be accessible soon.");
    };

    const handleDownloadReport = () => {
        toast.info("Report downloading will be available soon.");
    };

    return (
        <Card className="border-none bg-inherit px-4 shadow-none">
            <CardHeader className="px-3 py-2 flex flex-col sm:flex-row gap-3 justify-between items-center border-b">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-semibold">Reports</h1>
                    <p className="mt-1">
                        {isAdmin
                            ? "View and manage all company reports"
                            : "View your generated reports"}
                    </p>
                </div>
            </CardHeader>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Report</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reports.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    {report.title}
                                </div>
                            </TableCell>
                            <TableCell>{report.createdBy}</TableCell>
                            <TableCell>{report.createdAt}</TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`px-3 py-1 rounded-full ${
                                        report.status === "Completed"
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : report.status === "Draft"
                                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                            : "bg-gray-100 text-gray-800 border-gray-200"
                                    }`}
                                >
                                    {report.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="flex justify-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleViewReport()}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDownloadReport()}
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableCaption>
                    A list of all reports generated by you or your team.
                    (Currently filled by mock data)
                </TableCaption>
            </Table>
            {reports.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    No reports found
                </div>
            )}
        </Card>
    );
}
