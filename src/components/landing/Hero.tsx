import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { Link } from "react-router-dom";
import example from "@/assets/landing/example.png";
import lightExample from "@/assets/landing/light_example.png";
import { useTheme } from "../theme-provider";
import { BorderBeam } from "../magicui/border-beam";
import { Card, CardContent } from "../ui/card";

export const Hero = () => {
    const { session } = useAuth();
    const { theme } = useTheme();
    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py- gap-10">
            <div className="text-center lg:text-start space-y-6">
                <main className="text-5xl md:text-6xl font-bold">
                    <h1 className="inline">
                        <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                            Map
                        </span>{" "}
                        Property Wealth with
                    </h1>{" "}
                    <h2 className="inline">
                        <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                            Precision
                        </span>{" "}
                    </h2>
                </main>

                <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    Unlock detailed ownership, valuation, and wealth
                    insights—powered by advanced mapping and integrated data
                    intelligence.
                </p>

                <Link to={session ? "/dashboard" : "/login"}>
                    <Button className="w-full md:w-1/3 cursor-pointer">
                        {session ? "Dashboard" : "Get Started"}
                    </Button>
                </Link>
            </div>
            <Card className="relative p-0 hidden lg:block">
                <CardContent className="p-0">
                    <img
                        src={theme === "dark" ? example : lightExample}
                        alt="hero"
                    />
                </CardContent>
                <BorderBeam duration={8} size={100} />
            </Card>
        </section>
    );
};
