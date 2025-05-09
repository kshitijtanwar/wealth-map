import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "sonner";
import AuthWrapper from "./components/utils/AuthWrapper";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthProvider";

const AppRoutes = () => {
    const { loading } = useAuth();

    if (loading) {
        return <div>Loading authentication status...</div>; // Or a fancy spinner
    }

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<AuthWrapper />}>
                <Route path="/dashboard" element={<Dashboard />} />
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
