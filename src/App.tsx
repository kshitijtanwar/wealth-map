import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "sonner";

const App = () => {
    return (
        <>
            <Toaster richColors closeButton />
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
