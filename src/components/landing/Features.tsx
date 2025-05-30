import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "../magicui/border-beam";

const featureList: string[] = [
    "Dark/Light theme",
    "Interactive Google Maps",
    "Employee Management",
    "Email Onboarding",
    "Detailed reports",
    "Responsive design",
    "Minimalist",
];

export const Features = () => {
    return (
        <section id="features" className="container py-24 sm:py-32 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
                Many{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Great Features
                </span>
            </h2>

            <div className="flex flex-wrap md:justify-center gap-4">
                {featureList.map((feature: string) => (
                    <div key={feature}>
                        <Badge variant="secondary" className="text-sm">
                            {feature}
                        </Badge>
                    </div>
                ))}
            </div>

            <Card className="relative">
                <CardHeader>
                    <CardTitle className="text-center">
                        Introducing our latest and greatest interactive Map
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <video
                        src="https://ik.imagekit.io/hidnllbxz/Sarthak_s%20video.mp4?updatedAt=1747514543316"
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover rounded-lg"
                    ></video>
                </CardContent>
                <BorderBeam duration={8} size={200} />
            </Card>
        </section>
    );
};
