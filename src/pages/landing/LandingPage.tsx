import { About } from "@/components/landing/About";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { Team } from "@/components/landing/Team";
import { Testimonials } from "@/components/landing/Testimonials";

const Landing = () => {
    return (
        <section className="flex justify-center items-center flex-col px-4 overflow-hidden">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <About />
            <Testimonials />
            <Team />
            <FAQ />
            <Footer />
            <ScrollToTop />
        </section>
    );
};
export default Landing;
