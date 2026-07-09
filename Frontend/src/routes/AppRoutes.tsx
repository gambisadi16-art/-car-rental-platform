import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const Home = lazy(() => import("../pages/Home/Home"));
const CarsListing = lazy(() => import("../pages/Cars/CarsListing"));
const CarDetails = lazy(() => import("../pages/CarDetails/CarDetails"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const BookingPage = lazy(() => import("../pages/Booking/BookingPage"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const DashboardHome = lazy(() => import("../pages/Dashboard/DashboardHome"));
const MyBookings = lazy(() => import("../pages/Dashboard/MyBookings"));
const Profile = lazy(() => import("../pages/Dashboard/Profile"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<CarsListing />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/cars/:id/book" element={<BookingPage />} />
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="bookings" element={<MyBookings />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;