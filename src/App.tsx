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
import SearchResult from "./pages/SearchResult";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Settings from "./pages/settings/Settings";
import { ThemeProvider } from "./components/theme-provider";


const AppRoutes = () => {
    const { loading } = useAuth();

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/accept-invitation" element={<AcceptInvite />} />
            <Route path="terms-and-service" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            {/*  Routes to navigate user if session exists */}
            <Route element={<PublicRoute />}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/accept-invitation" element={<AcceptInvite />} />

            {/* Protected routes */}
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
                <Route
                    path="/search"
                    element={<AppLayout children={<SearchResult />} />}
                />
                  <Route
                    path="/settings"
                    element={<AppLayout children={<Settings />} />}
                />
            </Route>
        </Routes>
    );
};

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <Toaster richColors closeButton />
                <Router>
                    <AppRoutes />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;