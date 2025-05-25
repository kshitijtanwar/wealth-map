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
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Settings from "./pages/settings/Settings";
import { ThemeProvider } from "./components/theme-provider";
import Landing from "./pages/landing/LandingPage";
import { SearchResults } from "./components/search/search-results";
import { useIsMobile } from "./hooks/use-mobile";
import BookmarkedProperties from "./pages/bookmarks/BookMarkedProperties";
import { TooltipProvider } from "./components/ui/tooltip";
import RevokedEmployees from "./pages/employees/RevokedEmployees";

const AppRoutes = () => {
    const { loading } = useAuth();
    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/accept-invitation" element={<AcceptInvite />} />
            <Route path="terms-and-service" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/*  Routes to navigate user if session exists */}
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
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
                    path="/employees/revoked"
                    element={<AppLayout children={<RevokedEmployees />} />}
                />
                <Route
                    path="/reports"
                    element={<AppLayout children={<Reports />} />}
                />
                <Route path="/map" element={<AppLayout children={<Map />} />} />
                <Route
                    path="/property-detail/:id"
                    element={<AppLayout children={<PropertyDetail />} />}
                />
                <Route
                    path="/search"
                    element={<AppLayout children={<SearchResults />} />}
                />
                <Route
                    path="/settings"
                    element={<AppLayout children={<Settings />} />}
                />
                <Route
                    path="/bookmarks"
                    element={<AppLayout children={<BookmarkedProperties />} />}
                />
            </Route>
        </Routes>
    );
};

const App = () => {
    const isMobile = useIsMobile();
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <Toaster
                    richColors
                    closeButton
                    position={isMobile ? "top-center" : "bottom-right"}
                />
                <TooltipProvider>
                    <Router>
                        <AppRoutes />
                    </Router>
                </TooltipProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
