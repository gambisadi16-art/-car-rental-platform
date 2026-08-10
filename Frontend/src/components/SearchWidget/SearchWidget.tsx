import { useNavigate } from "react-router-dom";
import { useForm } from "../../../node_modules/react-hook-form/dist";
import { HiCalendar } from "react-icons/hi";
import { LOCATIONS } from "../../constants/locations";

interface SearchFormData {
    location: string;
    pickupDate: string;
    returnDate: string;
}

function SearchWidget() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<SearchFormData>();

    const onSubmit = (data: SearchFormData) => {
        const params = new URLSearchParams();
        if (data.location) params.set("location", data.location);
        if (data.pickupDate) params.set("pickupDate", data.pickupDate);
        if (data.returnDate) params.set("returnDate", data.returnDate);
        navigate(`/cars?${params.toString()}`);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full grid-cols-1 gap-4 rounded-xl bg-white p-5 shadow-xl sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
        >
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="location"
                    className="text-sm font-medium text-charcoal"
                >
                    Pickup Location
                </label>
                <select
                    id="location"
                    {...register("location")}
                    className="w-full rounded-md border border-border px-3 py-2.5 text-sm text-charcoal outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                    <option value="">All Locations</option>
                    {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="pickupDate"
                    className="text-sm font-medium text-charcoal"
                >
                    Pickup Date
                </label>
                <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5">
                    <HiCalendar className="text-primary" />
                    <input
                        id="pickupDate"
                        type="date"
                        {...register("pickupDate")}
                        className="w-full text-sm text-charcoal outline-none"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="returnDate"
                    className="text-sm font-medium text-charcoal"
                >
                    Return Date
                </label>
                <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5">
                    <HiCalendar className="text-primary" />
                    <input
                        id="returnDate"
                        type="date"
                        {...register("returnDate")}
                        className="w-full text-sm text-charcoal outline-none"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="h-[46px] rounded-md bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
                Search Cars
            </button>
        </form>
    );
}

export default SearchWidget;