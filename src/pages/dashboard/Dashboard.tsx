import { Reports } from "@/components/cards/Reports";
import { SectionCards } from "@/components/cards/section-cards";
import UserActivity from "@/components/cards/UserActivity";

export default function Dashboard() {
    return (
        <section>
            <SectionCards />
            <div className="flex flex-col lg:flex-row gap-6 m-6">
                <Reports />
                <UserActivity />
            </div>
        </section>
    );
}
