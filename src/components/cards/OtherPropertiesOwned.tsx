import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const OtherPropertiesOwned = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Other Properties Owned</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>
                        A list of recent properties owned
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Address</TableHead>
                            <TableHead>City, State</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="text-right">
                                Purchase Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                123 Park Avenue
                            </TableCell>
                            <TableCell>New York, NY</TableCell>
                            <TableCell>$1,750,000</TableCell>
                            <TableCell className="text-right">
                                2019-4-8
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                200 Main St.
                            </TableCell>
                            <TableCell>Miami, FL</TableCell>
                            <TableCell>$2,250,000</TableCell>
                            <TableCell className="text-right">
                                2018-6-7
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
export default OtherPropertiesOwned;
