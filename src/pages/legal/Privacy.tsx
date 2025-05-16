import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Map } from "lucide-react";
import { cn } from "@/lib/utils";

const Privacy: React.FC = () => {
    return (
        <div className={cn("flex flex-col gap-6 my-5")}>
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center text-3xl flex items-center justify-center gap-2 font-bold">
                            <Map size={26} className="text-primary" />
                            Wealth Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <h1 className="text-3xl font-bold mb-8">
                            Privacy Policy
                        </h1>

                        <div className="space-y-6">
                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    1. Introduction
                                </h2>
                                <p className="mb-4">
                                    At Wealth Map, we take your privacy
                                    seriously. This Privacy Policy explains how
                                    we collect, use, disclose, and safeguard
                                    your information when you use our platform.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    2. Information We Collect
                                </h2>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">
                                        Personal Information
                                    </h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Name and contact information</li>
                                        <li>Company details and role</li>
                                        <li>Login credentials</li>
                                        <li>Payment information</li>
                                    </ul>

                                    <h3 className="text-lg font-medium">
                                        Usage Data
                                    </h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Access times and dates</li>
                                        <li>Pages and features used</li>
                                        <li>Device and browser information</li>
                                        <li>IP address and location data</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    3. How We Use Your Information
                                </h2>
                                <p className="mb-4">
                                    We use the collected information for:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        Providing and maintaining our services
                                    </li>
                                    <li>Processing your transactions</li>
                                    <li>Sending administrative information</li>
                                    <li>Improving our platform</li>
                                    <li>Analyzing usage patterns</li>
                                    <li>Detecting and preventing fraud</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    4. Data Security
                                </h2>
                                <p className="mb-4">
                                    We implement appropriate technical and
                                    organizational security measures to protect
                                    your personal information, including:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        Encryption of data in transit and at
                                        rest
                                    </li>
                                    <li>Regular security assessments</li>
                                    <li>Access controls and authentication</li>
                                    <li>
                                        Employee training on data protection
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    5. Data Sharing and Disclosure
                                </h2>
                                <p className="mb-4">
                                    We may share your information with:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>
                                        Service providers and business partners
                                    </li>
                                    <li>
                                        Legal authorities when required by law
                                    </li>
                                    <li>
                                        Other users within your organization
                                        (limited data)
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    6. Your Rights
                                </h2>
                                <p className="mb-4">You have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Object to data processing</li>
                                    <li>Export your data</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    7. Cookies and Tracking
                                </h2>
                                <p className="mb-4">
                                    We use cookies and similar tracking
                                    technologies to collect and track
                                    information about your browsing activities.
                                    You can control cookie settings through your
                                    browser preferences.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    8. Children's Privacy
                                </h2>
                                <p className="mb-4">
                                    Our services are not intended for users
                                    under 18 years of age. We do not knowingly
                                    collect personal information from children.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    9. International Data Transfers
                                </h2>
                                <p className="mb-4">
                                    Your information may be transferred and
                                    processed in countries other than your own.
                                    We ensure appropriate safeguards are in
                                    place for such transfers.
                                </p>
                            </section>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <p className="text-sm text-gray-500">
                                    Last updated: May 15, 2025
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    For privacy-related inquiries, please
                                    contact our Data Protection Officer at
                                    privacy@wealthmap.com
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Privacy;
