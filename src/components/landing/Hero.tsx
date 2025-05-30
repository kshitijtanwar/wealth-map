import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { Link } from "react-router-dom";
import { Globe } from "@/components/magicui/globe";

export const Hero = () => {
    const { session } = useAuth();
    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 ">
            <div className="text-center lg:text-start space-y-6 md:pl-10">
                <main className="text-5xl md:text-6xl font-bold">
                    <h1 className="inline">
                        <span className="inline bg-gradient-to-r from-[#c25688]  to-[#a3004c] text-transparent bg-clip-text">
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

            <Globe className="" />
        </section>
    );
};
