import { i18n, useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import { DomesticHotelAvailability } from '@/modules/domesticHotel/types/hotel';
import { useRouter } from 'next/router';
import RoomItem from './RoomItem';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import { GetRooms, domesticHotelValidateRoom } from '../../actions';

type Props = {
    hotelId: number;
}

const Rooms: React.FC<Props> = props => {

    const { hotelId } = props;

    const router = useRouter();
    const { asPath } = router;

    const { t: tHotel } = useTranslation('hotel');

    const [availabilites, setAvailabilities] = useState<DomesticHotelAvailability[] | undefined>();

    const [selectedRoomToken, setSelectedRoomToken] = useState<string>();

    const today = dateFormat(new Date());
    const tomorrow = dateFormat(addSomeDays(new Date()));
    let checkin = today;
    let checkout = tomorrow;

    if (asPath.includes("checkin") && asPath.includes("checkout")) {
        checkin = asPath.split('checkin-')[1].split("/")[0].split("?")[0];
        checkout = asPath.split('checkout-')[1].split("/")[0].split("?")[0];
    }

    
    useEffect(() => {
        if (hotelId) {
            
            const fetchRooms = async () => {
        
                const response : any = await GetRooms({id:hotelId, checkin:checkin, checkout:checkout}, i18n?.language === "fa"? "fa-IR" : "en-US");

                if (response?.data.result) {
                    setAvailabilities(response.data.result.availabilities);
                } else if (response.data.success) {
                    debugger;
                }
            };

            fetchRooms();
        }

    }, [hotelId]);

    useEffect(() => {
        if (selectedRoomToken) {
            router.push("/hotel/checkout/123")
        }
    }, [selectedRoomToken])

    const selectRoomHandle = async (token: string, count: number) => {
        setSelectedRoomToken(token);

        let utm: undefined | { utmSource: string; utmKey: string };
        if (router.query && router.query.utm_source && router.query.utm_key) {
            utm = {
                utmSource: router.query.utm_source! as string,
                utmKey: router.query.utm_key! as string
            }
        }

        const preReserveResponse: any = await domesticHotelValidateRoom({
            bookingToken: token,
            checkin: checkin,
            checkout: checkout,
            count: count,
            MetaSearchName: utm?.utmSource || null,
            MetaSearchKey: utm?.utmKey || null
        });

        if (preReserveResponse.data) {
            const key = preReserveResponse.data.result.preReserveKey;
            router.push(`/hotel/checkout/key=${key}`);
        }

    }

    return (

        <div id="rooms_section" className="max-w-container mx-auto px-3 sm:px-5 pt-7 md:pt-10">
            <h2 className="text-lg lg:text-3xl font-semibold mb-3 md:mb-7"> {tHotel('choose-room')}  </h2>

            {availabilites?.map(availability => {
                return availability.rates?.map(rateItem => (
                    <RoomItem
                        key={rateItem.bookingToken}
                        rate={rateItem}
                        room={availability.rooms![0]}
                        onSelectRoom={selectRoomHandle}
                        selectedRoomToken={selectedRoomToken}
                    />
                ))
            })}
        </div>

    )
}

export default Rooms;

