import { HiStar } from "react-icons/hi";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { mockTestimonials } from "../../../constants/mockTestimonials";

function Testimonials() {
    return (
        <section className="bg-surface py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionTitle eyebrow="Testimonials" title="What Our Customers Say" />

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {mockTestimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="flex flex-col rounded-xl bg-white p-6 shadow-sm"
                        >
                            <div className="flex gap-1 text-amber-500">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <HiStar key={i} />
                                ))}
                            </div>
                            <p className="mt-4 flex-1 text-sm text-charcoal/70">
                                "{testimonial.quote}"
                            </p>
                            <div className="mt-5 border-t border-border pt-4">
                                <p className="text-sm font-semibold text-charcoal">{testimonial.name}</p>
                                <p className="text-xs text-charcoal/50">{testimonial.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;