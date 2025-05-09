import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

const App = () => {
    return (
        <>
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
