import { useTranslation } from 'next-i18next';
import { useEffect, useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';

import { Header,ServerAddress, Hotel } from "../../../enum/url";
import { AvailabilityByIdItem, DomesticHotelMainType } from '@/types/hotel';
import SimilarHotelItem from './SimilarHotelItem';
import useHttp from '@/hooks/use-http';
import { useRouter } from 'next/router';
import moment from 'moment-jalaali';
import { InfoCircle } from '@/components/shared/ui/icons';

type Props = {
    similarHotels?: DomesticHotelMainType[];
}

const SimilarHotels: React.FC<Props> = props => {

    const { similarHotels } = props;

    const router = useRouter();
    const { asPath } = router;

    const { t } = useTranslation('common');

    const [pricedResponse, setPricedResponse] = useState<AvailabilityByIdItem[] | undefined>();

    const [showAll, setShowAll] = useState<boolean>(false);

    let checkin = moment().format("YYYY-MM-DD");
    let checkout = moment().add(1, "days").format("YYYY-MM-DD");
    let searchInfo = '';

    if (asPath.includes("checkin") && asPath.includes("checkout")) {
        checkin = asPath.split('checkin-')[1].split("/")[0];
        checkout = asPath.split('checkout-')[1].split("/")[0];
        searchInfo = `/checkin-${checkin}/checkout-${checkout}`;
    }

    const nights = moment(checkout).diff(checkin, 'days');

    const { sendRequest, loading } = useHttp();


    const fetchPrices = useCallback((ids: number[], acceptLanguage?: "fa-IR" | "en-US") => {
        sendRequest({
            url: `${ServerAddress.Type}${ServerAddress.Hotel_Availability}${Hotel.AvailabilityByHotelId}`,
            header: {
                ...Header,
                "Accept-Language": acceptLanguage || "en-US",
                Currency: "IRR",
                Apikey: process.env.PROJECT_SERVER_APIKEY
            },
            data: {
                hotelIds: ids,
                checkIn: checkin,
                checkOut: checkout
            },
            method: 'post'
        }, (response: AxiosResponse) => {
            if (response.data.result) {
                setPricedResponse(response.data.result.hotels);
            } else if (response.data.success) {
                debugger;
                //setReduxError()
                //setErrorText(noResultMessage || 'No result found!');
            }
        })
    }, [checkin, checkout]);

    useEffect(() => {
        const ids = similarHotels?.map(item => item.HotelId!);
        if (ids?.length) {
            fetchPrices(ids);
        }

    }, [similarHotels, fetchPrices]);


    if (!similarHotels?.length) {
        return null;
    }

    interface Hotels extends DomesticHotelMainType {
        salePriceFrom: number;
        boardPriceFrom?: number;
    }

    const hotels: Hotels[] = similarHotels!.map(hotelItem => {
        const pricedHotel = pricedResponse?.find(pricedItem => pricedItem.id === hotelItem.HotelId);
        return ({
            ...hotelItem,
            salePriceFrom: pricedHotel?.salePrice,
            boardPriceFrom: pricedHotel?.boardPrice
        });

    }).filter(hotel => loading || hotel.salePriceFrom) as Hotels[];


    return (

        <div className='mb-14'>
            <h2 className='text-center text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10' > {t('similar-hotels')} </h2>
            <p className='text-center text-neutral-500 mb-4 md:mb-7' > {t('you-might-be-interested-this-hotels')} </p>

            {(hotels?.length) ? (
                <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5'>
                        {hotels.slice(0, 3).map(hotel => <SimilarHotelItem searchInfo={searchInfo} nights={nights} loadingPrice={loading} hotel={hotel} key={hotel.HotelId} />)}

                        {showAll && hotels.slice(3, 6).map(hotel => <SimilarHotelItem searchInfo={searchInfo} nights={nights} loadingPrice={loading} hotel={hotel} key={hotel.HotelId} />)}
                    </div>
                    <button
                        type='button'
                        onClick={() => { setShowAll(prevState => !prevState) }}
                        className='h-10 px-5 text-sm border rounded-lg text-primary-700 block border-primary-700 mt-8 hover:bg-primary-100 transition-all mx-auto'
                    >
                        {showAll ? t('close') : t('other-similar-hotels')}
                    </button>
                </>
            ):(
                <div className='bg-white p-5 rounded-xl flex gap-2 items-center'>
                    <InfoCircle className='w-5 h-5 fill-current' />
                    {t('no-similar-hotels')}
                </div>
            )}
        </div>

    )
}

export default SimilarHotels;

