import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    MedalIcon,
    MapIcon,
    PlaneIcon,
    GiftIcon,
} from "@/components/landing/Icons";

interface FeatureProps {
    icon: React.ReactElement;
    title: string;
    description: string;
}

const features: FeatureProps[] = [
    {
        icon: <MedalIcon />,
        title: "Access Control",
        description:
            "Manage employee access with role-based permissions, usage tracking, and company-wide data preferences.",
    },
    {
        icon: <MapIcon />,
        title: "Interactive Property Map",
        description:
            "Explore properties across the U.S. with dynamic filtering, clustering, and satellite view support.",
    },
    {
        icon: <PlaneIcon />,
        title: "Seamless Scalability",
        description:
            "From startups to enterprises, Wealth Map scales with your team's needs through robust APIs and performance optimization.",
    },
    {
        icon: <GiftIcon />,
        title: "Data-Driven Insights",
        description:
            "Unlock wealth estimates, ownership history, and financial breakdowns to support strategic decision-making.",
    },
];

export const HowItWorks = () => {
    return (
        <section
            id="howItWorks"
            className="container text-center py-24 sm:py-32"
        >
            <h2 className="text-3xl md:text-4xl font-bold ">
                How It{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Works{" "}
                </span>
                Step-by-Step Guide
            </h2>
            <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
                From signup to deep data insights, see how simple it is to get
                started with Wealth Map and unlock powerful features.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map(({ icon, title, description }: FeatureProps) => (
                    <Card key={title} className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid gap-4 place-items-center">
                                {icon}
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>{description}</CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
