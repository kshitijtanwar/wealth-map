import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

interface Report {
    id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    status: "Draft" | "Published" | "Archived";
    type: string;
}

export default function Reports() {
    const { session } = useAuth();
    const [reports, setReports] = useState<Report[]>([]);
    const userPermission =
        session?.user?.user_metadata?.permission_level || "user";
    const isAdmin = userPermission === "admin";

    useEffect(() => {
        const fetchReports = async () => {
            try {
                // In a real application, you would have an API endpoint to fetch reports
                // For now, we'll simulate the data
                const mockReports: Report[] = [
                    {
                        id: "1",
                        title: "Q1 2024 Financial Analysis",
                        createdBy: "John Doe",
                        createdAt: "2024-03-15",
                        status: "Published",
                        type: "Financial",
                    },
                    {
                        id: "2",
                        title: "Market Research Report",
                        createdBy: "Jane Smith",
                        createdAt: "2024-03-10",
                        status: "Draft",
                        type: "Research",
                    },
                    {
                        id: "3",
                        title: "Annual Performance Review",
                        createdBy: "Robert Johnson",
                        createdAt: "2024-02-28",
                        status: "Published",
                        type: "Performance",
                    },
                ];

                // Filter reports based on user role
                if (isAdmin) {
                    setReports(mockReports);
                } else {
                    // Regular users can only see their own reports
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

    const handleViewReport = (reportId: string) => {
        // Implement report viewing logic
        console.log("Viewing report:", reportId);
    };

    const handleDownloadReport = (reportId: string) => {
        // Implement report download logic
        console.log("Downloading report:", reportId);
    };

    return (
        <Card className="border-none bg-inherit">
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

            <div className="px-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Report</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell className="font-medium">
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
                                            report.status === "Published"
                                                ? "bg-green-100 text-green-800 border-green-200"
                                                : report.status === "Draft"
                                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                : "bg-gray-100 text-gray-800 border-gray-200"
                                        }`}
                                    >
                                        {report.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{report.type}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleViewReport(report.id)
                                            }
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleDownloadReport(report.id)
                                            }
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {reports.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No reports found
                    </div>
                )}
            </div>
        </Card>
    );
}
