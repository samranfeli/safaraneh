import { useTranslation } from 'next-i18next';
import { useEffect, useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';

import { Header, ServerAddress, Hotel } from "../../../../enum/url";
import { DomesticHotelAvailability } from '@/modules/domesticHotel/types/hotel';
import useHttp from '@/modules/shared/hooks/use-http';
import { useRouter } from 'next/router';
import RoomItem from './RoomItem';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';

type Props = {
    hotelId: number;
}

const Rooms: React.FC<Props> = props => {

    const { hotelId } = props;

    const router = useRouter();
    const { asPath } = router;

    const { t: tHotel} = useTranslation('hotel');

    const [availabilites, setAvailabilities] = useState<DomesticHotelAvailability[] | undefined>();

    const [selectedRoomToken, setSelectedRoomToken] = useState<string>();

    const today =  dateFormat(new Date());
    const tomorrow = dateFormat(addSomeDays(new Date()));
    let checkin = today;
    let checkout =tomorrow;

    if (asPath.includes("checkin") && asPath.includes("checkout")) {
        checkin = asPath.split('checkin-')[1].split("/")[0];
        checkout = asPath.split('checkout-')[1].split("/")[0];
    }

    const { sendRequest, loading } = useHttp();

    const fetchRooms = useCallback((id: number, acceptLanguage?: "fa-IR" | "en-US") => {



        sendRequest({
            url: `${ServerAddress.Type}${ServerAddress.Hotel_Availability}${Hotel.GetRooms}?Id=${id}&CheckIn=${checkin}&CheckOut=${checkout}`,
            header: {
                ...Header,
                "Accept-Language": acceptLanguage || "fa-IR",
                Apikey: process.env.PROJECT_SERVER_APIKEY
            }
        }, (response: AxiosResponse) => {
            if (response.data.result) {
                setAvailabilities(response.data.result.availabilities);
            } else if (response.data.success) {
                debugger;
                //setReduxError()
                //setErrorText(noResultMessage || 'No result found!');
            }
        })
    }, [checkin, checkout]);

    useEffect(() => {
        if (hotelId) {
            fetchRooms(hotelId);
        }

    }, [hotelId, fetchRooms]);

    useEffect(()=>{
        if(selectedRoomToken){
            router.push("/hotel/checkout/123")
        }
    },[selectedRoomToken])

    const selectRoomHandle = (token:string, count: number) => {
        setSelectedRoomToken(token);
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

