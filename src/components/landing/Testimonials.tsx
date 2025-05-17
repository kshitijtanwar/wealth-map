import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
    image: string;
    name: string;
    userName: string;
    comment: string;
}

const testimonials: TestimonialProps[] = [
    {
        image: "https://github.com/shadcn.png",
        name: "Emily Carter",
        userName: "@wealth_insights",
        comment:
            "Wealth Map gave us a competitive edge by making property data incredibly accessible and actionable.",
    },
    {
        image: "https://github.com/shadcn.png",
        name: "Michael Reynolds",
        userName: "@realestate_pro",
        comment:
            "Finally, a platform that combines mapping with real wealth analytics. A game changer for my research work.",
    },
    {
        image: "https://github.com/shadcn.png",
        name: "David Liu",
        userName: "@data_driven_dave",
        comment:
            "The filtering and map clustering make it easy to narrow down exactly what I’m looking for. Great user experience!",
    },
    {
        image: "https://github.com/shadcn.png",
        name: "Samantha Green",
        userName: "@techsavvy_sam",
        comment:
            "Love the clean interface and responsiveness. Wealth Map works seamlessly on all my devices, even in dark mode!",
    },
    {
        image: "https://github.com/shadcn.png",
        name: "Jason Patel",
        userName: "@investor_insight",
        comment:
            "Being able to export detailed reports and track ownership history helps me make smarter investment choices.",
    },
    {
        image: "https://github.com/shadcn.png",
        name: "Natalie Brooks",
        userName: "@onboard_easy",
        comment:
            "The onboarding was smooth and quick. We got our whole team set up in no time with full access control.",
    },
];

export const Testimonials = () => {
    return (
        <section id="testimonials" className="container py-24 sm:py-32">
            <h2 className="text-3xl md:text-4xl font-bold">
                Discover Why
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    {" "}
                    People Love{" "}
                </span>
                Wealth Map
            </h2>

            <p className="text-xl text-muted-foreground pt-4 pb-8">
                Thousands of professionals trust Wealth Map to simplify property
                research, analyze ownership wealth, and streamline
                decision-making. From real estate analysts to corporate teams,
                users love how fast, intuitive, and insightful the platform is.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
                {testimonials.map(
                    ({ image, name, userName, comment }: TestimonialProps) => (
                        <Card
                            key={userName}
                            className="max-w-md md:break-inside-avoid overflow-hidden"
                        >
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <Avatar>
                                    <AvatarImage alt="" src={image} />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col">
                                    <CardTitle className="text-lg">
                                        {name}
                                    </CardTitle>
                                    <CardDescription>
                                        {userName}
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent>{comment}</CardContent>
                        </Card>
                    )
                )}
            </div>
        </section>
    );
};
