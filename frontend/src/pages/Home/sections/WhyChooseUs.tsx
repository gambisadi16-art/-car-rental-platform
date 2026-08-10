import { HiShieldCheck, HiCurrencyDollar, HiClock, HiSupport } from "react-icons/hi";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const benefits = [
    {
        icon: HiShieldCheck,
        title: "Fully Insured",
        description: "Every rental includes comprehensive coverage for peace of mind.",
    },
    {
        icon: HiCurrencyDollar,
        title: "Transparent Pricing",
        description: "No hidden fees. The price you see is the price you pay.",
    },
    {
        icon: HiClock,
        title: "Fast Pickup",
        description: "Get on the road in minutes with our streamlined process.",
    },
    {
        icon: HiSupport,
        title: "24/7 Support",
        description: "Our team is available around the clock for any assistance.",
    },
];

function WhyChooseUs() {
    return (
        <section className="bg-surface py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionTitle eyebrow="Why DriveLux" title="Built for a Better Rental Experience" />

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                                <benefit.icon />
                            </div>
                            <h3 className="mt-4 font-semibold text-charcoal">{benefit.title}</h3>
                            <p className="mt-2 text-sm text-charcoal/60">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;