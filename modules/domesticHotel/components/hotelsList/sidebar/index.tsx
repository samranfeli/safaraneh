import HotelNameFilter from "./HotelNameFilter";
import { useTranslation } from "next-i18next";
import HotelAvailabilityFilter from "./HotelAvailabilityFilter";
import HotelPriceFilter from "./HotelPriceFilter";
import HotelRatingFilter from "./HotelRatingFilter";
import HotelFacilityFilter from "./HotelFacilityFilter";
import HotelTypeFilter from "./HotelTypeFilter";
import HotelGuestPointFilter from "./HotelGuestPointFilter";

type Props = {
    allHotels:number;
    filteredHotels: number;
    priceIsFetched?: boolean;
    scoreIsFetched?: boolean;
}
const DomesticHotelListSideBar: React.FC<Props> = props => {

    const { t } = useTranslation("common");
    const { t: tHotel } = useTranslation("hotel");

    const { allHotels, filteredHotels} = props;

    return (
        <>
            <div className="p-3 pb-0">

                <HotelNameFilter />

                <h5 className="mt-4 font-bold text-lg mb-2 border-t border-neutral-300 pt-5"> {t('filter')} </h5>

                {(filteredHotels && allHotels && allHotels > filteredHotels) && <p className="text-xs mb-3 font-semibold">
                    {tHotel("hotels-filtered-from-total", { total: props.allHotels, filtered: props.filteredHotels })}
                </p>}

                {!!props.priceIsFetched && <HotelAvailabilityFilter />}

                {!!props.priceIsFetched && <HotelPriceFilter />}

                <HotelRatingFilter />
                
            </div>

            <div className="p-3 pt-0">


                <HotelFacilityFilter />

                {!!props.scoreIsFetched && <HotelGuestPointFilter />}

                <HotelTypeFilter />

            </div>
        </>
    )
}

export default DomesticHotelListSideBar;