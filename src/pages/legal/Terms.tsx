import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";

const Terms: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center text-3xl flex items-center justify-center gap-2 font-bold text-gray-900">
                            <Map size={26} className="text-emerald-500" />
                            Wealth Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-8">
                            Terms of Service
                        </h1>

                        <div className="space-y-6 text-gray-600">
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    1. Introduction
                                </h2>
                                <p className="mb-4">
                                    Welcome to Wealth Map. By accessing or using
                                    our platform, you agree to be bound by these
                                    Terms of Service and all applicable laws and
                                    regulations.
                                </p>
                                <p>
                                    If you do not agree with any of these terms,
                                    you are prohibited from using or accessing
                                    this platform.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    2. Use License
                                </h2>
                                <p className="mb-4">
                                    Permission is granted to temporarily access
                                    the materials (information or software) on
                                    Wealth Map's platform for personal,
                                    non-commercial transitory viewing only.
                                </p>
                                <p>
                                    This license shall automatically terminate
                                    if you violate any of these restrictions and
                                    may be terminated by Wealth Map at any time.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    3. Data Usage and Privacy
                                </h2>
                                <p className="mb-4">
                                    Our platform collects and processes data
                                    about properties and their owners. By using
                                    our service, you agree to:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>
                                        Only use the data for legitimate
                                        business purposes
                                    </li>
                                    <li>
                                        Not share access credentials with
                                        unauthorized users
                                    </li>
                                    <li>
                                        Comply with all applicable privacy laws
                                        and regulations
                                    </li>
                                    <li>
                                        Report any data breaches or security
                                        concerns immediately
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    4. User Accounts
                                </h2>
                                <p className="mb-4">
                                    To access our platform, you must create an
                                    account. You agree to:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>
                                        Provide accurate and complete
                                        registration information
                                    </li>
                                    <li>
                                        Maintain the security of your account
                                        credentials
                                    </li>
                                    <li>
                                        Accept responsibility for all activities
                                        under your account
                                    </li>
                                    <li>
                                        Notify us immediately of any
                                        unauthorized access
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    5. Subscription and Payments
                                </h2>
                                <p className="mb-4">
                                    Access to Wealth Map requires a paid
                                    subscription. Payment terms:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>
                                        Subscriptions are billed in advance on a
                                        monthly or annual basis
                                    </li>
                                    <li>
                                        No refunds for partial month or year
                                        subscriptions
                                    </li>
                                    <li>
                                        Prices may change with 30 days notice
                                    </li>
                                    <li>
                                        Taxes may apply based on your location
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    6. Disclaimer
                                </h2>
                                <p className="mb-4">
                                    The materials on Wealth Map's platform are
                                    provided on an 'as is' basis. Wealth Map
                                    makes no warranties, expressed or implied,
                                    and hereby disclaims and negates all other
                                    warranties including, without limitation,
                                    implied warranties or conditions of
                                    merchantability, fitness for a particular
                                    purpose, or non-infringement of intellectual
                                    property or other violation of rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    7. Limitations
                                </h2>
                                <p className="mb-4">
                                    In no event shall Wealth Map or its
                                    suppliers be liable for any damages
                                    (including, without limitation, damages for
                                    loss of data or profit, or due to business
                                    interruption) arising out of the use or
                                    inability to use the materials on Wealth
                                    Map's platform.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    8. Governing Law
                                </h2>
                                <p className="mb-4">
                                    These terms and conditions are governed by
                                    and construed in accordance with the laws of
                                    the United States, and you irrevocably
                                    submit to the exclusive jurisdiction of the
                                    courts in that location.
                                </p>
                            </section>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <p className="text-sm text-gray-500">
                                    Last updated: May 12, 2025
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    If you have any questions about these Terms
                                    of Service, please contact us at
                                    legal@wealthmap.com
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Terms;
