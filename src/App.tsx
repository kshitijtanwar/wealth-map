import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "sonner";
import AuthWrapper from "./components/utils/AuthWrapper";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthProvider";
import AppLayout from "./components/layout/AppLayout";
import Employees from "./pages/employees/Employees";
import Reports from "./pages/reports/Reports";
import Map from "./pages/map/Map";
import PropertyDetail from "./pages/property-detail/PropertyDetail";
import AcceptInvite from "./pages/auth/AcceptInvite";
import PublicRoute from "./components/utils/PublicRoute";
import LoadingScreen from "./components/utils/LoadingScreen";

const AppRoutes = () => {
    const { loading } = useAuth();

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Routes>
            <Route path="/accept-invitation" element={<AcceptInvite />} />
            <Route element={<PublicRoute />}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/accept-invitation" element={<AcceptInvite />} />
            <Route element={<AuthWrapper />}>
                <Route
                    path="/dashboard"
                    element={<AppLayout children={<Dashboard />} />}
                />
                <Route
                    path="/employees"
                    element={<AppLayout children={<Employees />} />}
                />
                <Route
                    path="/reports"
                    element={<AppLayout children={<Reports />} />}
                />
                <Route path="/map" element={<AppLayout children={<Map />} />} />
                <Route
                    path="/property-detail"
                    element={<AppLayout children={<PropertyDetail />} />}
                />
            </Route>
        </Routes>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Toaster richColors closeButton />
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;
