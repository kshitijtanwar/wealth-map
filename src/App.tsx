import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import CompanyRegistration from "./pages/auth/CompanyRegistration";
import { useState } from "react";

const App = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isRegistering ? (
                                <CompanyRegistration
                                    onRegister={() => {}}
                                    onCancel={() => setIsRegistering(false)}
                                />
                            ) : (
                                <LoginPage
                                    onLogin={() => {}}
                                    onForgotPassword={() => {}}
                                    onRegister={() => setIsRegistering(true)}
                                />
                            )
                        }
                    />
                </Routes>
            </Router>
        </>
    );
};
export default App;
