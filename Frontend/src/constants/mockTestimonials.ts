export interface Testimonial {
    id: string;
    name: string;
    location: string;
    quote: string;
    rating: number;
}

export const mockTestimonials: Testimonial[] = [
    {
        id: "1",
        name: "Sarah Mitchell",
        location: "Chicago, IL",
        quote:
            "Booking was effortless and the car was spotless. Easily the smoothest rental experience I've had.",
        rating: 5,
    },
    {
        id: "2",
        name: "James Carter",
        location: "Austin, TX",
        quote:
            "Transparent pricing, no surprise fees, and the pickup process took less than five minutes.",
        rating: 5,
    },
    {
        id: "3",
        name: "Elena Rodriguez",
        location: "Miami, FL",
        quote:
            "Great selection of vehicles and the support team was responsive when my flight got delayed.",
        rating: 4,
    },
];