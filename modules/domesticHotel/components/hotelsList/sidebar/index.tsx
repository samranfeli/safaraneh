import HotelNameFilter from "./HotelNameFilter";
import { useTranslation } from "next-i18next";
import HotelAvailabilityFilter from "./HotelAvailabilityFilter";
import HotelPriceFilter from "./HotelPriceFilter";
import HotelRatingFilter from "./HotelRatingFilter";
import HotelFacilityFilter from "./HotelFacilityFilter";
import HotelTypeFilter from "./HotelTypeFilter";
import HotelGuestPointFilter from "./HotelGuestPointFilter";

const DomesticHotelListSideBar: React.FC = () => {

    const { t } = useTranslation("common");
    const { t: tHotel } = useTranslation("hotel");

    return (
        <>
            <div className="p-3 pb-0">

                <HotelNameFilter />

                <h5 className="mt-4 font-bold text-lg mb-2 border-t border-neutral-300 pt-5"> {t('filter')} </h5>

                {/* TODO render conditionally */}
                <p className="text-xs mb-3 font-semibold">
                    {tHotel("hotels-filtered-from-total", { total: 56, filtered: 70 })}
                </p>

                <HotelAvailabilityFilter />

                {/* <HotelPriceFilter /> */}

                <HotelRatingFilter />
                
            </div>

            <div className="p-3 pt-0">


                <HotelFacilityFilter />

                <HotelGuestPointFilter />

                <HotelTypeFilter />

            </div>
        </>
    )
}

export default DomesticHotelListSideBar;