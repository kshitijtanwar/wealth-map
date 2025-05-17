import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";

export const HeroCards = () => {
    return (
        <div className="hidden lg:block gap-8 relative w-[700px] h-[500px]">
            {/* Testimonial */}
            <Card className="absolute w-[340px] top-[100px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                        <AvatarImage
                            alt=""
                            src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback>SH</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <CardTitle className="text-lg">John Doe</CardTitle>
                        <CardDescription>@john_doe</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>The website is super functional!</CardContent>
            </Card>

            {/* Team */}
            <Card className="absolute right-[20px] top-32 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="mt-8 flex justify-center items-center pb-2">
                    <img
                        src="https://i.pravatar.cc/150?img=58"
                        alt="user avatar"
                        className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                    />
                    <CardTitle className="text-center">Leo Miranda</CardTitle>
                    <CardDescription className="font-normal text-primary">
                        Frontend Developer
                    </CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-2">
                    Wealth Map helped me gaining insights for owners and
                    properties.
                </CardContent>

                <CardFooter>
                    <a
                        rel="noreferrer noopener"
                        href="#"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
                    >
                        <span className="sr-only">X icon</span>
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-foreground w-5 h-5"
                        >
                            <title>X</title>
                            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                        </svg>
                    </a>

                    <a
                        rel="noreferrer noopener"
                        href="#"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
                    >
                        <Linkedin size="20" />
                    </a>
                </CardFooter>
            </Card>

            <Card className="absolute top-[280px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                        <LightBulbIcon />
                    </div>
                    <div>
                        <CardTitle>Light & dark mode</CardTitle>
                        <CardDescription className="text-md mt-2">
                            Wealth Map is available in light and dark mode.
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};
