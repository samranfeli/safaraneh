import { useTranslation } from 'next-i18next';
import { useEffect, useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';

import Header from '@/components/shared/header';
import { AvailabilityByIdItem, DomesticHotelMainType } from '@/types/hotel';
import SimilarHotelItem from './SimilarHotelItem';
import useHttp from '@/hooks/use-http';
import { useRouter } from 'next/router';
import moment from 'moment-jalaali';

type Props = {
    similarHotels?: DomesticHotelMainType[];
}

const SimilarHotels: React.FC<Props> = props => {

    const { similarHotels } = props;

    const router = useRouter();
    const { asPath } = router;

    const { t } = useTranslation('common');

    const [pricedResponse, setPricedResponse] = useState<AvailabilityByIdItem[] | undefined>();

    let checkin = moment().format("YYYY-MM-DD");
    let checkout = moment().add(1, "days").format("YYYY-MM-DD");

    if (asPath.includes("checkin") && asPath.includes("checkout")) {
        checkin = asPath.split('checkin-')[1].split("/")[0];
        checkout = asPath.split('checkout-')[1].split("/")[0];
    }

    const nights = moment(checkout).diff(checkin,'days');

    const { sendRequest, loading} = useHttp();


    const fetchPrices = useCallback((ids: number[], acceptLanguage?: "fa-IR" | "en-US") => {
        sendRequest({
            url: "https://hotelv4.safaraneh.com/api/services/app/Booking/AvailabilityByHotelId",
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

    }, [SimilarHotels, fetchPrices]);


    if (!SimilarHotels) {
        return "loading...";
    }

    if (!similarHotels!.length) {
        return null;
    }

    interface Hotels extends DomesticHotelMainType {
        salePriceFrom: number;
        boardPriceFrom?: number;
    }

    const hotels:Hotels[] = similarHotels!.map(hotelItem => {
        const pricedHotel = pricedResponse?.find(pricedItem => pricedItem.id === hotelItem.HotelId);        
        return ({
            ...hotelItem,
            salePriceFrom: pricedHotel?.salePrice,
            boardPriceFrom: pricedHotel?.boardPrice
        });

    }).filter(hotel => loading || hotel.salePriceFrom) as Hotels[];


    return (

        <>
            <h3 className='text-center text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10' > {t('similar-hotels')} </h3>
            <p className='text-center text-neutral-500 mb-4 md:mb-7' > {t('you-might-be-interested-this-hotels')} </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5'>
                {hotels?.map(hotel => <SimilarHotelItem nights={nights} loadingPrice={loading} hotel={hotel} key={hotel.HotelId} />)}
            </div>
        </>

    )
}

export default SimilarHotels;

