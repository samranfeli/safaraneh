import { useTranslation, i18n } from "next-i18next";
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

import { getDomesticHotelSummaryDetailById } from "@/modules/domesticHotel/actions";
import { Header, ServerAddress, Hotel } from "../../../../enum/url";
import AutoComplete from "../../../shared/components/ui/AutoComplete";
import { ApartmentOutline, Calendar, Home2, Location } from "../../../shared/components/ui/icons";
import { EntitySearchResultItemType } from "@/modules/domesticHotel/types/hotel";
import { useAppDispatch } from "@/modules/shared/hooks/use-store";
import { setReduxError } from "@/modules/shared/store/errorSlice";
import DatePicker from "../../../shared/components/ui/RangePicker";
import { localeFa } from "@mobiscroll/react";
import Button from "../../../shared/components/ui/Button";
import DatePickerModern from "@/modules/shared/components/ui/DatePickerModern";
import { addSomeDays, checkDateIsAfterDate, dateDiplayFormat, dateFormat } from "@/modules/shared/helpers";



type Props = {
    defaultDestination?: EntitySearchResultItemType;
    defaultDates?: [string, string];
    wrapperClassName?: string;
}

const SearchForm: React.FC<Props> = props => {

    const { defaultDestination } = props;

    const { t } = useTranslation('common');

    const router = useRouter();
    const routerPath = router.asPath;

    const dispatch = useAppDispatch();

    const [dates, setDates] = useState<[string, string] | undefined>(props.defaultDates);

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const dateChangeHandle = (event: any) => {

        if (event.value[0] && event.value[1]) {
            setDates(event.value)
        }
    }

    const [defaultDestinations, setDefaultDestinations] = useState<EntitySearchResultItemType[] | undefined>();

    const [selectedDestination, setSelectedDestination] = useState<EntitySearchResultItemType>();

    useEffect(() => {
        if (defaultDestination) {
            setSelectedDestination(defaultDestination);
        }
    }, [defaultDestination?.name]);

    useEffect(() => {
        setSubmitLoading(false);
    }, [routerPath]);

    const autoCompleteUrl = `${ServerAddress.Type}${ServerAddress.Hotel_Data}${Hotel.GetEntity}`;

    useEffect(() => {

        if (!selectedDestination) {

            const localStorageDefaultDestinations = localStorage?.getItem('domesticHotelSearchDefaultDestinations');
            const initialDestinations = localStorageDefaultDestinations ? JSON.parse(localStorageDefaultDestinations) : undefined;

            if (initialDestinations) {

                setDefaultDestinations(initialDestinations);

            } else {
                const acceptLanguage = i18n && i18n.language === "fa" ? "fa-IR" : "en-US";

                const fetchDefaultDestinations = async () => {
                    try {
                        const response = await axios({
                            method: "post",
                            url: autoCompleteUrl,
                            headers: {
                                ...Header,
                                apikey: process.env.PROJECT_PORTAL_APIKEY,
                                "Accept-Language": acceptLanguage || "en-US",
                            }
                        })

                        if (response?.data?.result?.length) {

                            setDefaultDestinations(response.data.result);
                            localStorage?.setItem('domesticHotelSearchDefaultDestinations', JSON.stringify(response.data.result));

                        }

                    } catch (error: any) {
                        if (error.message) {
                            dispatch(setReduxError({
                                title: t('error'),
                                message: error.message,
                                isVisible: true
                            }))
                        }

                    }
                }
                fetchDefaultDestinations();

            }
        }

    }, [i18n?.language]);


    const submitHandler = async () => {
        if (!dates || dates.length < 2) {
            // TODO validation message
            return;
        }

        if (!selectedDestination) {
            // TODO validation message
            return;
        }

        setSubmitLoading(true);

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
                const hotelDetailsResponse = await getDomesticHotelSummaryDetailById(selectedDestination.id!, i18n?.language === "fa" ? "fa-IR" : "en-US");

                if (hotelDetailsResponse.data?.result?.url) {
                    url = hotelDetailsResponse.data.result.url;
                } else {
                    let message = "";
                    if (hotelDetailsResponse.response) {
                        message = hotelDetailsResponse.response.statusText || hotelDetailsResponse.response.data.error?.message || t('oopsSomethingWentWrong1');
                    } else if (!hotelDetailsResponse.request) {
                        message = hotelDetailsResponse.message;
                    } else {
                        message = t('oopsSomethingWentWrong2')
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

        let urlSegment = "";
        if (selectedDestination.id) {
            urlSegment = `/location-${selectedDestination.id}`;
        }

        url += `${urlSegment}/checkin-${dates[0]}/checkout-${dates[1]}`;

        router.push(url);

    }





    //start sholud be removed when modern datepicker replaced with mobiscroll:
    const [locale, setLocale] = useState<"fa"|"en">("fa");
    const onChangeCheckin = (d:string) => {
        setDates(prevState => {
            if (!d) {return prevState;}
            const prevCheckout = prevState?.length ? prevState[1] : "";
            if (prevCheckout){
                const isAfter  = checkDateIsAfterDate(new Date(d), new Date(prevCheckout));
                if (isAfter) {
                    const firstAvailableCheckout = dateFormat(addSomeDays(new Date(d)));
                    return ([d, firstAvailableCheckout]);
                }
            }
            return ( [d, prevCheckout])
        })
    }
    const onChangeCheckout = (d:string) => {
        setDates(prevState => {
            if (!d) {return prevState;}
            const prevCheckin = prevState?.length ? prevState[0] : "";
            return ( [prevCheckin, d])
        })
    }
    //end sholud be removed when modern datepicker replaced with mobiscroll:





    return (
        <div className={`domestic-hotel-search-form grid grid-cols-1 md:grid-cols-7 gap-2 ${props.wrapperClassName || ""}`}>
            <div className="relative z-20 col-span-1 md:col-span-3">
                <label htmlFor="destination" className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5">
                    {t('searchHotelDestination')}
                </label>
                <AutoComplete
                    type="hotel"
                    defaultList={defaultDestinations}
                    inputId="destination"
                    //checkTypingLanguage
                    noResultMessage={t('NoResultsFound')}
                    createTextFromOptionsObject={(item:EntitySearchResultItemType) => item.displayName || item.name || ""}
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
                    icon="location"
                    inputClassName={`w-full outline-none border rounded-lg border-neutral-400 pt-4 h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                    placeholder={t('search-hotel-or-city')}
                    min={2}
                    value={selectedDestination}
                    onChangeHandle={setSelectedDestination}
                    url={autoCompleteUrl}
                />
            </div>
            <div className="col-span-1 md:col-span-3 relative z-10">








                {/* TODO: delete when mobiscroll is activated */}
                <div className="modernCalendar-dates-wrapper grid grid-cols-2 gap-2">
                    <div className="relative modernDatePicker-checkin">
                        <DatePickerModern 
                            wrapperClassName="block"
                            minimumDate={dateDiplayFormat({date:new Date().toISOString(), locale:'en',format:"YYYY-MM-DD" })}
                            inputPlaceholder="ورود"
                            inputClassName="border border-neutral-400 h-12 rounded-lg focus:border-neutral-900 outline-none pt-7 text-xs w-full pr-10"
                            inputName="checkin"
                            toggleLocale={()=>{setLocale(prevState => prevState === 'fa'? "en":"fa")}}
                            locale={locale}
                            onChange={(v:string) => {onChangeCheckin(v)}}
                            value={dates ? dates[0] : undefined}
                        />
                        <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -mt-2.5 right-3 absolute z-[100] select-none pointer-events-none" />
                        <label className="absolute top-1.5 leading-5 rtl:right-10 text-4xs z-[100] select-none pointer-events-none">
                            تاریخ ورود
                        </label>
                    </div>
                    <div className="relative modernDatePicker-checkout">
                        <DatePickerModern 
                            wrapperClassName="block"
                            minimumDate={dateDiplayFormat({date:dates ? dateFormat(addSomeDays(new Date(dates[0]))) : dateFormat(addSomeDays(new Date())) , locale:'en',format:"YYYY-MM-DD" })}
                            inputPlaceholder="ورود"
                            inputClassName="border border-neutral-400 h-12 rounded-lg focus:border-neutral-900 outline-none pt-7 text-xs w-full pr-10"
                            inputName="checkin"
                            toggleLocale={()=>{setLocale(prevState => prevState === 'fa'? "en":"fa")}}
                            locale={locale}
                            onChange={(v:string) => {onChangeCheckout(v)}}
                            value={dates ? dates[1] : undefined}
                        />
                        <Calendar className="w-5 h-5 fill-neutral-600 top-1/2 -mt-2.5 right-3 absolute z-[100] select-none pointer-events-none" />
                        <label className="absolute top-1.5 leading-5 rtl:right-10 text-4xs z-[100] select-none pointer-events-none">
                            تاریخ خروج
                        </label>
                    </div>                    
                </div>
                

                {/* <DatePicker
                    value={dates}
                    onChange={dateChangeHandle}
                    rtl
                    locale={localeFa}
                /> */}







            </div>

            <div className="col-span-1 md:col-span-1 pt-5 md:pt-0">
                <Button
                    loading={submitLoading}
                    onClick={submitHandler}
                    className='rounded-lg h-12 block w-full'
                >
                    {t('search')}
                </Button>
            </div>
        </div>
    )
}

export default SearchForm;