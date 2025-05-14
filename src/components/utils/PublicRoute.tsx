import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const PublicRoute = () => {
    const { session, loading } = useAuth();

    if (loading) return null;

    return session ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
