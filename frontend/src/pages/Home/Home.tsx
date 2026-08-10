import Hero from "./sections/Hero";
import FeaturedVehicles from "./sections/FeaturedVehicles";
import WhyChooseUs from "./sections/WhyChooseUs";
import PopularLocations from "./sections/PopularLocations";
import Testimonials from "./sections/Testimonials";
import CallToAction from "./sections/CallToAction";

function Home() {
    return (
        <div>
            <Hero />
            <FeaturedVehicles />
            <WhyChooseUs />
            <PopularLocations />
            <Testimonials />
            <CallToAction />
        </div>
    );
}

export default Home;