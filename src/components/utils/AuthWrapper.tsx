import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const AuthWrapper = () => {
    const { session } = useAuth();
    const location = useLocation();

    if (session === undefined) {
        return null;
    }

    return session ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
};

export default AuthWrapper;
