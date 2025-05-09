// src/components/AuthServiceTest.jsx
import { useState } from "react";
import { authService } from "../db/apiAuth";

export const AuthServiceTest = () => {
    const [testResults, setTestResults] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentCompany, setCurrentCompany] = useState(null);

    // Generate random test data for each run
    const generateTestData = () => {
        const randomSuffix = Math.floor(Math.random() * 10000);
        return {
            companyName: `Test Company ${randomSuffix}`,
            logoUrl: "https://example.com/logo.png",
            adminEmail: `testadmin${randomSuffix}@example.com`,
            adminPassword: `TestPassword123!${randomSuffix}`,
            adminFirstName: "Test",
            adminLastName: "Admin",
            employeeEmail: `testemployee${randomSuffix}@example.com`,
            employeeRole: "employee",
            newPassword: `NewPassword123!${randomSuffix}`,
        };
    };

    const generateUniqueEmail = (prefix) => {
        return `${prefix}${Date.now()}${Math.floor(
            Math.random() * 1000
        )}@example.com`;
    };

    const [formData, setFormData] = useState({
        companyName: "Test Company",
        logoUrl: "https://example.com/logo.png",
        adminEmail: generateUniqueEmail("testadmin"),
        adminPassword: "TestPassword123!",
        adminFirstName: "Test",
        adminLastName: "Admin",
        employeeEmail: generateUniqueEmail("testemployee"),
        employeeRole: "employee",
        newPassword: "NewPassword123!",
    });

    const addTestResult = (testName, result, error = null) => {
        setTestResults((prev) => [
            ...prev,
            {
                testName,
                result,
                error: error?.message || null,
                timestamp: new Date().toISOString(),
            },
        ]);
    };

    const resetTestData = () => {
        setFormData((prev) => ({
            ...prev,
            adminEmail: generateUniqueEmail("testadmin"),
            employeeEmail: generateUniqueEmail("testemployee"),
        }));
        setCurrentUser(null);
        setCurrentCompany(null);
    };

    const runAllTests = async () => {
        setTestResults([]);
        resetTestData();
        await testAdminRegistration();
        await testEmployeeInvitation();
        await testSessionManagement();
        await testPasswordReset();
    };

    const testAdminRegistration = async () => {
        try {
            // First try to sign out if already logged in
            try {
                await authService.signOut();
            } catch {} // Ignore sign out errors

            const result = await authService.registerAdminCompany({
                companyName: formData.companyName,
                logoUrl: formData.logoUrl,
                adminEmail: formData.adminEmail,
                adminPassword: formData.adminPassword,
                adminFirstName: formData.adminFirstName,
                adminLastName: formData.adminLastName,
            });

            setCurrentUser(result.user);
            setCurrentCompany(result.company);
            addTestResult("Admin Registration", "✅ Success", null);
            return result.user;
        } catch (error) {
            addTestResult("Admin Registration", "❌ Failed", error);
            return null;
        }
    };

    const testEmployeeInvitation = async () => {
        if (!currentUser) return;

        try {
            const adminProfile = await authService.getProfile(currentUser.id);

            const invitation = await authService.inviteEmployee({
                adminId: currentUser.id,
                companyId: adminProfile.company_id,
                employeeEmail: formData.employeeEmail,
                role: formData.employeeRole,
            });

            addTestResult("Employee Invitation", "✅ Success", null);
            return invitation;
        } catch (error) {
            addTestResult("Employee Invitation", "❌ Failed", error);
            return null;
        }
    };

    const testSessionManagement = async () => {
        try {
            // First register an admin
            const admin = await testAdminRegistration();
            if (!admin) return;

            // Sign in with the admin credentials
            await authService.signIn(
                formData.adminEmail,
                formData.adminPassword
            );

            // Test getSession
            const session = await authService.getSession();
            if (!session) throw new Error("No session found");

            // Test getUser
            const user = await authService.getUser();
            if (!user) throw new Error("No user found");

            // Test signOut
            await authService.signOut();
            try {
                await authService.getSession();
                throw new Error("Session still active after sign out");
            } catch {
                // Expected error
            }

            addTestResult("Session Management", "✅ Success", null);
        } catch (error) {
            addTestResult("Session Management", "❌ Failed", error);
        }
    };

    const testPasswordReset = async () => {
        try {
            // First register an admin
            const admin = await testAdminRegistration();
            if (!admin) return;

            // Sign in with the admin credentials
            await authService.signIn(
                formData.adminEmail,
                formData.adminPassword
            );

            // Test password reset email
            await authService.resetPassword(formData.adminEmail);

            // Test password update (this would normally be done after clicking reset link)
            await authService.updatePassword(formData.newPassword);

            // Verify we can login with new password
            await authService.signIn(formData.adminEmail, formData.newPassword);

            addTestResult("Password Reset", "✅ Success", null);
        } catch (error) {
            addTestResult("Password Reset", "❌ Failed", error);
        }
    };

    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                padding: "20px",
                maxWidth: "800px",
                margin: "0 auto",
            }}
        >
            <h1>AuthService Test Component</h1>

            <div
                style={{
                    marginBottom: "20px",
                    padding: "15px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                }}
            >
                <h3>Test Data</h3>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                    }}
                >
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "5px",
                                    fontWeight: "bold",
                                }}
                            >
                                {key}:
                            </label>
                            <input
                                type={
                                    key.includes("Password")
                                        ? "password"
                                        : "text"
                                }
                                value={value}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [key]: e.target.value,
                                    })
                                }
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ddd",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={runAllTests}
                style={{
                    padding: "10px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginBottom: "20px",
                }}
            >
                Run All Tests
            </button>

            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={testAdminRegistration}
                    style={{
                        marginRight: "10px",
                        padding: "8px 12px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Test Admin Registration
                </button>
                <button
                    onClick={testEmployeeInvitation}
                    style={{
                        marginRight: "10px",
                        padding: "8px 12px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Test Employee Invitation
                </button>
                <button
                    onClick={testSessionManagement}
                    style={{
                        marginRight: "10px",
                        padding: "8px 12px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Test Session Management
                </button>
                <button
                    onClick={testPasswordReset}
                    style={{
                        padding: "8px 12px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Test Password Reset
                </button>
            </div>

            <div style={{ marginTop: "30px" }}>
                <h2>Test Results</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th
                                style={{
                                    padding: "12px",
                                    textAlign: "left",
                                    borderBottom: "1px solid #ddd",
                                }}
                            >
                                Test
                            </th>
                            <th
                                style={{
                                    padding: "12px",
                                    textAlign: "left",
                                    borderBottom: "1px solid #ddd",
                                }}
                            >
                                Result
                            </th>
                            <th
                                style={{
                                    padding: "12px",
                                    textAlign: "left",
                                    borderBottom: "1px solid #ddd",
                                }}
                            >
                                Error
                            </th>
                            <th
                                style={{
                                    padding: "12px",
                                    textAlign: "left",
                                    borderBottom: "1px solid #ddd",
                                }}
                            >
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {testResults.map((test, index) => (
                            <tr
                                key={index}
                                style={{ borderBottom: "1px solid #ddd" }}
                            >
                                <td style={{ padding: "12px" }}>
                                    {test.testName}
                                </td>
                                <td
                                    style={{
                                        padding: "12px",
                                        color: test.result.includes("✅")
                                            ? "green"
                                            : "red",
                                    }}
                                >
                                    {test.result}
                                </td>
                                <td style={{ padding: "12px", color: "red" }}>
                                    {test.error || "-"}
                                </td>
                                <td style={{ padding: "12px" }}>
                                    {new Date(
                                        test.timestamp
                                    ).toLocaleTimeString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuthServiceTest;
