import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function Modal({
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    onConfirm = () => {},
}: {
    title?: string;
    description?: string;
    onConfirm: () => void | Promise<void>;
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Promise.resolve(onConfirm());
        } catch (error) {
            console.error("Error in onConfirm:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel disabled={isLoading}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    onClick={handleConfirm}
                    className="bg-destructive text-white hover:bg-red-700"
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Continue"}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}
