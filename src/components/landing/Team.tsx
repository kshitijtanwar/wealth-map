import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface TeamProps {
    imageUrl: string;
    name: string;
    position: string;
    socialNetworks: SociaNetworkslProps[];
    description: string;
}

interface SociaNetworkslProps {
    name: string;
    url: string;
}

const teamList: TeamProps[] = [
    {
        imageUrl:
            "https://media.licdn.com/dms/image/v2/D5603AQG7Zf-pwn2Yew/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723308347820?e=1752710400&v=beta&t=JkpffrGky1tZriPYPj8qPdB53f68t6UTpyZwtLyGSpE",
        name: "Kshitij Tanwar",
        position: "Frontend Developer",
        description:
            "Leads the user interface development of Wealth Map with React and Tailwind, ensuring a responsive and intuitive user experience across the platform.",
        socialNetworks: [
            {
                name: "Linkedin",
                url: "https://www.linkedin.com/in/kshitij-tanwar-8721151a6/",
            },
            {
                name: "Instagram",
                url: "https://www.instagram.com/kxhxtij",
            },
        ],
    },
    {
        imageUrl:
            "https://media.licdn.com/dms/image/v2/D4D03AQHuGdqtF0K-nw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1694109385227?e=1752710400&v=beta&t=gB_nPrM-yDJXQflXQFXDINap8-G0DSIdtA5NOu5l2-k",
        name: "Kavya Dua",
        position: "Backend Developer",
        description:
            "Architects the server-side logic and database integration, ensuring secure data flows and smooth API performance within Wealth Map.",
        socialNetworks: [
            {
                name: "Linkedin",
                url: "https://www.linkedin.com/in/kavya-dua-7bb57a233/",
            },
            {
                name: "Instagram",
                url: "https://www.instagram.com/",
            },
        ],
    },
    {
        imageUrl: "https://i.ibb.co/Qvd7ss0G/IMG-20240122-114248.jpg",
        name: "Mohd Sahil",
        position: "Frontend/Backend Developer",
        description:
            "Bridges frontend and backend with full-stack contributions, focusing on user authentication, data handling, and feature integration.",
        socialNetworks: [
            {
                name: "Linkedin",
                url: "https://www.linkedin.com/in/mohd-sahil-88a140252/",
            },
            {
                name: "Instagram",
                url: "https://www.instagram.com/",
            },
        ],
    },
    {
        imageUrl:
            "https://media.licdn.com/dms/image/v2/D5603AQEc1r96hCTsLQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695377753675?e=1752710400&v=beta&t=E97YR21yWVsCFKwZdDT_URsESBqZkeMjxYyljdjSZsw",
        name: "Mani Ratnam",
        position: "ML Engineer",
        description:
            "Designs machine learning models to estimate owner wealth and analyze property data, powering the intelligence layer of Wealth Map.",
        socialNetworks: [
            {
                name: "Linkedin",
                url: "https://www.linkedin.com/in/maniiratnam/",
            },
        ],
    },
];

export const Team = () => {
    const socialIcon = (iconName: string) => {
        switch (iconName) {
            case "Linkedin":
                return <Linkedin size="20" />;

            case "Facebook":
                return <Facebook size="20" />;

            case "Instagram":
                return <Instagram size="20" />;
        }
    };

    return (
        <section id="team" className="container py-24 sm:py-32">
            <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Our Dedicated{" "}
                </span>
                Crew
            </h2>

            <p className="mt-4 mb-10 text-xl text-muted-foreground">
                Every great product starts with a great team — here’s ours.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
                {teamList.map(
                    ({
                        imageUrl,
                        name,
                        position,
                        socialNetworks,
                        description,
                    }: TeamProps) => (
                        <Card
                            key={name}
                            className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
                        >
                            <CardHeader className="mt-8 flex justify-center items-center pb-2">
                                <img
                                    src={imageUrl}
                                    alt={`${name} ${position}`}
                                    className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover object-top"
                                />
                                <CardTitle className="text-center">
                                    {name}
                                </CardTitle>
                                <CardDescription className="text-primary">
                                    {position}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="text-center pb-2">
                                {description}
                            </CardContent>

                            <CardFooter>
                                {socialNetworks.map(
                                    ({ name, url }: SociaNetworkslProps) => (
                                        <div key={name}>
                                            <a
                                                rel="noreferrer noopener"
                                                href={url}
                                                target="_blank"
                                                className={buttonVariants({
                                                    variant: "ghost",
                                                    size: "sm",
                                                })}
                                            >
                                                <span className="sr-only">
                                                    {name} icon
                                                </span>
                                                {socialIcon(name)}
                                            </a>
                                        </div>
                                    )
                                )}
                            </CardFooter>
                        </Card>
                    )
                )}
            </div>
            <p className="text-center mt-10 text-muted-foreground">
                Special thanks to @vedant_nagar for helping out with product
                demo videos.
            </p>
        </section>
    );
};
