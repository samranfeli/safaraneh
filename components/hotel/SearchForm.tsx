import { useTranslation, i18n } from "next-i18next";
import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useRouter } from "next/router";

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, setOptions, localeFa } from '@mobiscroll/react';


import useHttp from '../../hooks/use-http';
import { getHotelDetail } from "@/actions/hotelActions";
import { Header } from '../../enum/url';
import AutoComplete from "../shared/ui/AutoComplete";
import { ApartmentOutline, Home2, Location } from "../shared/ui/icons";
import { EntitySearchResultItemType } from "@/types/hotel";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxError } from "@/store/errorSlice";


setOptions({
    theme: 'ios',
    themeVariant: 'light'
});


const SearchForm: React.FC = () => {

    const { t } = useTranslation('common');

    const router = useRouter();

    const dispatch = useAppDispatch();

    const [dates, setDates] = useState([]);

    const dateChangeHandle = (event:any, inst:any) => {

        if (event.value[0] && event.value[1]){
            setDates(event.value)
        }
    }

    const [defaultDestinations, setDefaultDestinations] = useState<EntitySearchResultItemType[] | undefined>();

    const [selectedDestination, setSelectedDestination] = useState<EntitySearchResultItemType>();

    const { sendRequest } = useHttp();

    const url = 'https://hoteldomesticdata.safaraneh.com/api/services/app/Entity/Search';

    useEffect(() => {
        sendRequest({
            url: url,
            header: {
                ...Header,
                "Accept-Language": 'fa-IR',
            },
            method: 'post'
        }, (response: AxiosResponse) => {
            if (response.data.result) {
                setDefaultDestinations(response.data.result);
            }
        });

    }, [sendRequest]);


    //mobiscroll :
    // const [dates, setDates] = useState(null);
    // const onDatesChange = (ev:any) => {
    //     setDates(ev.value);
    // }



    const submitHandler = async () => {
        if (dates.length < 2) {
            // TODO validation message
            return;
        }

        if (!selectedDestination) {
            // TODO validation message
            return;
        }

        let url: string = "";

        switch (selectedDestination.type) {
            case "City":

                if (i18n && i18n.language === "fa") {
                    url = `/hotels/هتل-های-${selectedDestination.name!.replace(/ /g, "-")}`;
                } else if (i18n && i18n.language === "ar") {
                    url = `/hotels/فنادق-${selectedDestination.name!.replace(/ /g, "-")}`;
                } else {
                    url = `/hotels/${selectedDestination.name!.replace(/ /g, "-")}`;
                }

                break;

            case "Province":

                if (i18n && i18n.language === "fa") {
                    url = `/hotels/هتل-های-استان-${selectedDestination.name!.replace(/ /g, "-")}`;
                } else if (i18n && i18n.language === "ar") {
                    url = `/hotels/فنادق-محافظة-${selectedDestination.name!.replace(/ /g, "-")}`;
                } else {
                    url = `/hotels/${selectedDestination.name!.replace(/ /g, "-")}`;
                }

                break;

            case "Hotel":
                const hotelDetailsResponse = await getHotelDetail(selectedDestination.id, i18n?.language);

                if (hotelDetailsResponse.status === 200) {
                    url = hotelDetailsResponse.data.Url;
                } else {
                    let message = "";
                    if (hotelDetailsResponse.response) {
                        message = hotelDetailsResponse.response.statusText || hotelDetailsResponse.response.data.error?.message || t('oopsSomethingWentWrong');
                    } else if (!hotelDetailsResponse.request) {
                        message = hotelDetailsResponse.message;
                    } else {
                        message = t('oopsSomethingWentWrong')
                    }
                    dispatch(setReduxError({
                        title: t('error'),
                        message,
                        isVisible: true
                    }));
                    return;
                }

                break;

            default:
                url = "";
        }


        url += `/location-${selectedDestination.id}/checkin-${dates[0]}/checkout-${dates[1]}`;

        router.push(url);

    }


    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-2 py-5">
                <div className="relative col-span-1 md:col-span-3">
                    <label htmlFor="destination" className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5">
                        {t('searchHotelDestination')}
                    </label>
                    <AutoComplete
                        defaultList={defaultDestinations}
                        inputId="destination"
                        //checkTypingLanguage
                        noResultMessage={t('NoResultsFound')}
                        textPropertyName='displayName'
                        acceptLanguage="fa-IR"
                        renderOption={useCallback((option: EntitySearchResultItemType, direction: "ltr" | "rtl" | undefined) => (
                            <div className={`px-3 py-2 flex gap-3 hover:bg-neutral-800 hover:text-white items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                                {option.type === "Hotel" ? <ApartmentOutline className="w-5 h-5 fill-current" /> : option.type === "Province" ? <Home2 className="w-5 h-5 fill-current" /> : <Location className="w-5 h-5 fill-current" />}
                                <div className="leading-5">
                                    <div className='text-xs'>{option.name}</div>
                                    <div className='text-3xs'>{option.displayName}</div>
                                </div>
                            </div>
                        ), [])}
                        icon={<Location className="h-5 w-5 fill-current" />}
                        inputClassName={`w-full outline-none border rounded-lg border-neutral-400 pt-4 h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                        placeholder={t('search-hotel-or-city')}
                        min={2}
                        value={selectedDestination}
                        onChangeHandle={setSelectedDestination}
                        url={url}
                    />
                </div>
                <div className="col-span-1 md:col-span-3 relative">


                    {/* <Datepicker value={dates} onChange={onDatesChange} label={t('checkin-date')} /> */}



                    <label htmlFor="destination" className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5">
                        {t('checkin-date')} / {t('checkout-date')}
                    </label>
                    {/* <input
                        type="date"
                        id="checkin_date"
                        className='w-full outline-none border text-right rounded-lg border-neutral-400 px-3 pt-2 h-12 text-right text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900'
                        onChange={(e: any) => { setCheckin(e.target.value) }}
                    /> */}





<Datepicker
                controls={['calendar']}
                select="range"
                    returnFormat="iso8601"
                responsive={{
                    small:{
                        pages:1,
                        touchUi:true
                    },
                    large: {
                        pages:2,
                        touchUi:false
                        
                    }
                }}


                // responsive: {
                //     small: {
                //         display: 'bottom'
                //     },
                //     custom: { // Custom breakpoint
                //         breakpoint: 600,
                //         display: 'center'
                //     },
                //     large: {
                //         display: 'anchored'
                //     }
                // }
                rtl
                locale={localeFa}
                inputProps={{
                    inputStyle: 'box',
                    placeholder: 'انتخاب تاریخ'
                }}
                onActiveDateChange = {(event, inst) => {
                    // Logic for the active date change
                }}
                onCancel = {(event, inst) => {
                    // Logic for cancel button click
                }}
                onCellClick = {(event, inst) => {
                    // Logic for event click
                }}
                onCellHoverIn = {(event, inst) => {
                    // Logic for handling cell hover in
                }}
                onCellHoverOut = {(event, inst) => {
                    // Logic for handling cell hover out
                }}
                onChange = {dateChangeHandle}
                onClose = {(event, inst) => {
                    // Your custom event handler goes here
                }}
                onDestroy = {(event, inst) => {
                    // Your custom event handler goes here 
                }}
                onInit = {(event, inst) => {
                    // Logic running on component init
                }}
                onLabelClick = {(event, inst) => {
                    // Logic for label click
                }}
                onOpen = {(event, inst) => {
                    // Your custom event handler goes here 
                }}
                onPageChange = {(event, inst) => {
                    // Your custom event handler goes here 
                }}
                onPageLoaded = {(event, inst) => {
                    // Use it to inject custom markup & attach custom listeners
                }}
                onPageLoading = {(event, inst) => {
                    // Use it to load data on demand 
                }}
                onPosition = {(event:any, inst:any) => {
                    // Logic for component positioning
                }}
                onTempChange = {(event, inst)=> {
                    // Logic for temporary value change
                }}
            />






                </div>
                {/* <div className="col-span-1 md:col-span-3 relative">

                    <label htmlFor="checkout_date" className="absolute top-0 rtl:right-8 ltr:left-8 text-4xs z-10 leading-5">
                        {t('checkout-date')}
                    </label>


                    <input
                        id="checkout_date"
                        type="date"
                        className='w-full outline-none border rounded-lg border-neutral-400 px-3 pt-2 h-12 text-right text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900'
                        onChange={(e: any) => { setCheckout(e.target.value) }}
                    />
                </div> */}
                <div className="col-span-1 md:col-span-1 pt-5 md:pt-0">
                    <button
                        type='button'
                        className='bg-primary-700 text-white rounded-lg text-center min-w-sm h-12 block w-full'
                        onClick={submitHandler}
                    >
                        جستجو
                    </button>
                </div>
            </div>




        </div>


    )
}

export default SearchForm;