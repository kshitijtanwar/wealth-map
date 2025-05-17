import { Statistics } from "./Statistics";
import pilot from "@/assets/landing/pilot.png";

export const About = () => {
    return (
        <section id="about" className="container py-24 sm:pb-32">
            <div className="bg-muted/50 border rounded-lg py-12">
                <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
                    <img
                        src={pilot}
                        alt=""
                        className="w-[300px] object-contain rounded-lg"
                    />
                    <div className="bg-green-0 flex flex-col justify-between">
                        <div className="pb-6">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                                    About{" "}
                                </span>
                                Company
                            </h2>
                            <p className="text-xl text-muted-foreground mt-4">
                                Wealth Map is a powerful platform designed to
                                help teams discover, analyze, and manage
                                property ownership and wealth data across the
                                United States. With an intuitive interface and
                                seamless third-party integrations, users can
                                navigate interactive maps, access detailed
                                property records, and evaluate owner financial
                                profiles. Built for modern businesses, Wealth
                                Map streamlines data exploration and reporting,
                                empowering companies to make informed decisions
                                with confidence. Whether you're conducting
                                research, building reports, or exploring new
                                markets, Wealth Map equips you with the tools
                                and insights to uncover hidden value and
                                opportunity.
                            </p>
                        </div>

                        <Statistics />
                    </div>
                </div>
            </div>
        </section>
    );
};
