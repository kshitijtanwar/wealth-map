import { Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { IconInput } from "../ui/input";

const LoginForm: React.FC = () => {
    const error = false;
    return (
        <div className="w-full max-w-md">
            <div className="bg-white py-8 px-10 shadow rounded-lg">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your company's Wealth Map platform
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        <span className="text-sm text-red-700">{error}</span>
                    </div>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <IconInput
                                id="email"
                                name="email"
                                autoComplete="email"
                                required
                                type="email"
                                placeholder="you@company.com"
                                icon={
                                    <Mail className="h-5 w-5 text-gray-400" />
                                }
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <IconInput
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="••••••••"
                                icon={
                                    <Lock className="h-5 w-5 text-gray-400" />
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="button"
                                className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                            >
                                Forgot your password?
                            </button>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-emerald-600 hover:bg-emerald-700"
                            >
                                Sign in
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
