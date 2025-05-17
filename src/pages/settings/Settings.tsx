import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const Settings = () => {
    const { session } = useAuth();
    const { company_logo, fullname, email } =
        session?.user?.user_metadata || {};
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const handleAccountSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        // Simulate API call
        setTimeout(() => {
            setIsPending(false);
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <div className="container mx-auto">
            <Tabs defaultValue="account">
                <TabsList className="w-full md:w-1/2 bg-inhert">
                    <TabsTrigger
                        value="account"
                        className="data [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary transition-colors"
                    >
                        My Account
                    </TabsTrigger>
                    <TabsTrigger
                        value="billing"
                        className="data [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary transition-colors"
                    >
                        Billing
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="data [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary transition-colors"
                    >
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="data [&[data-state=active]]:border-b-2 [&[data-state=active]]:border-primary transition-colors"
                    >
                        Security
                    </TabsTrigger>
                </TabsList>

                {/* Account Tab */}
                <TabsContent value="account">
                    <Card className="border-none shadow-none bg-inherit">
                        <CardHeader>
                            <CardTitle>Account Information</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save
                                when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-20 w-20 border">
                                    <AvatarImage
                                        src={
                                            company_logo ||
                                            "https://github.com/shadcn.png"
                                        }
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Button variant="outline">Change Avatar</Button>
                            </div>

                            <form onSubmit={handleAccountSave}>
                                <div className="flex flex-col w-full md:w-1/2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullname">
                                            Fullname
                                        </Label>
                                        <Input
                                            id="fullname"
                                            defaultValue={fullname}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            defaultValue={email}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4"
                                    disabled={isPending}
                                >
                                    {isPending ? "Saving..." : "Save changes"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing">
                    <Card className="border-none shadow-none bg-inherit">
                        <CardHeader>
                            <CardTitle>Billing and Plan</CardTitle>
                            <CardDescription>
                                Manage your subscription and payment methods.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-muted p-4 rounded-md">
                                <div className="font-medium">Current Plan</div>
                                <div className="text-2xl font-bold mt-1">
                                    Pro Plan
                                </div>
                                <div className="text-muted-foreground mt-1">
                                    $29/month • Renews on Oct 1, 2023
                                </div>
                                <Button variant="outline" className="mt-4">
                                    Change Plan
                                </Button>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    Payment Methods
                                </h3>
                                <div className="border rounded-md p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-muted rounded-md p-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-credit-card"
                                            >
                                                <rect
                                                    width="20"
                                                    height="14"
                                                    x="2"
                                                    y="5"
                                                    rx="2"
                                                />
                                                <line
                                                    x1="2"
                                                    x2="22"
                                                    y1="10"
                                                    y2="10"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                Visa ending in 4242
                                            </div>
                                            <div className="text-muted-foreground text-sm">
                                                Expires 12/2024
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        Edit
                                    </Button>
                                </div>
                                <Button variant="outline" className="mt-4">
                                    Add Payment Method
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <Card className="border-none shadow-none bg-inherit">
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Configure how you receive notifications.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">
                                            Email Notifications
                                        </div>
                                        <div className="text-muted-foreground text-sm">
                                            Receive updates via email
                                        </div>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">
                                            Push Notifications
                                        </div>
                                        <div className="text-muted-foreground text-sm">
                                            Receive notifications on your device
                                        </div>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">
                                            Marketing Emails
                                        </div>
                                        <div className="text-muted-foreground text-sm">
                                            Receive promotional emails
                                        </div>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                    <Card className="border-none shadow-none bg-inherit">
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>
                                Manage your account security and authentication
                                methods.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Change Password
                                </h3>
                                <div className="grid gap-2">
                                    <Label htmlFor="current-password">
                                        Current Password
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-password">
                                        New Password
                                    </Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                    />
                                </div>
                                <Button>Update Password</Button>
                            </div>

                            <div className="pt-4 border-t">
                                <h3 className="text-lg font-medium mb-2">
                                    Two-Factor Authentication
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">
                                            Enable 2FA
                                        </div>
                                        <div className="text-muted-foreground text-sm">
                                            Add an extra layer of security to
                                            your account
                                        </div>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Settings;
