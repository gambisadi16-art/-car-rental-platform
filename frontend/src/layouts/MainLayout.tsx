import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import PageLoader from "../components/PageLoader/PageLoader";

function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;