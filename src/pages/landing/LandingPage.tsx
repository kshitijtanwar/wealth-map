import { About } from "@/components/landing/About";
import { Cta } from "@/components/landing/Cta";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { Newsletter } from "@/components/landing/Newsletter";
import { Pricing } from "@/components/landing/Pricing";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { Services } from "@/components/landing/Services";
import { Sponsors } from "@/components/landing/Sponsors";
import { Team } from "@/components/landing/Team";
import { Testimonials } from "@/components/landing/Testimonials";

const Landing = () => {
    return (
        <section className="flex justify-center items-center flex-col px-4">
            <Navbar />
            <Hero />
            <Sponsors />
            <About />
            <HowItWorks />
            <Features />
            <Services />
            <Cta />
            <Testimonials />
            <Team />
            <Pricing />
            <Newsletter />
            <FAQ />
            <Footer />
            <ScrollToTop />
        </section>
    );
};
export default Landing;
