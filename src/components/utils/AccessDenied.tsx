import { AlertCircle } from "lucide-react";

const AccessDenied = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] p-4">
            <div className="flex flex-col items-center text-center max-w-md">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-2xl font-semibold mb-2">
                    Access Restricted
                </h2>
                <p className="text-muted-foreground mb-4">
                    You need an active company to access this feature. Please
                    contact your administrator.
                </p>
            </div>
        </div>
    );
};

export default AccessDenied;
