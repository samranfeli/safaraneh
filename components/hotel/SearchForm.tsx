import { useTranslation } from "next-i18next";
import {useCallback,useEffect,useState} from 'react';
import { AxiosResponse } from 'axios';

import useHttp from '../../hooks/use-http';
import { Header } from '../../enum/url';
import AutoComplete from "../shared/ui/AutoComplete";
import { ApartmentOutline, Home2, Location } from "../shared/ui/icons";
import { EntitySearchResultItemType } from "@/types/hotel";

const SearchForm : React.FC = () => {

    const { t } = useTranslation('common');

    const [defaultDestinations,setDefaultDestinations] = useState<EntitySearchResultItemType[] | undefined>();

    const [selectedDestination,setSelectedDestination] = useState<EntitySearchResultItemType>();

    const {sendRequest } = useHttp();

    const url = 'https://hoteldomesticdata.safaraneh.com/api/services/app/Entity/Search';
    
    useEffect(()=>{
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

    },[]);


    return(
        <div>

            <div className="grid grid-cols-2 md:grid-cols-14 gap-2 py-5">
                <div className="relative col-span-2 md:col-span-6">
                    <label htmlFor="destination" className="absolute top-1 rtl:right-10 ltr:left-10 text-4xs z-10 leading-5">
                        {t('searchHotelDestination')}
                    </label>
                    <AutoComplete
                    defaultList = {defaultDestinations}
                    inputId="destination"
                    //checkTypingLanguage
                    noResultMessage={t('NoResultsFound')}
                    textPropertyName='displayName'
                    acceptLanguage="fa-IR"
                    renderOption={useCallback((option: EntitySearchResultItemType, direction: "ltr" | "rtl" | undefined) => (
                        <div className={`px-3 py-2 flex gap-3 hover:bg-neutral-800 hover:text-white items-center ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                                {option.type === "Hotel"?<ApartmentOutline className="w-5 h-5 fill-current" /> : option.type==="Province" ? <Home2 className="w-5 h-5 fill-current" /> : <Location className="w-5 h-5 fill-current" />}
                            <div className="leading-5">
                                <div className='text-xs'>{option.name}</div>
                                <div className='text-3xs'>{option.displayName}</div>
                            </div>
                        </div>
                    ), [])}
                    icon={<Location className="h-5 w-5 fill-current" />}
                    inputClassName={`w-full outline-none border rounded-lg border-neutral-400 pt-4 h-12 text-sm text-neutral-500 placeholder:text-neutral-500 focus:border-neutral-900`}
                    placeholder={t('search-hotel-or-city')}
                    min={3}
                    value={selectedDestination}
                    onChangeHandle={setSelectedDestination}
                    url={url}
                    />
                </div>
                <div className="col-span-1 md:col-span-3">
                    <input className='w-full border rounded-lg border-neutral-200 px-5 h-12 text-base text-neutral-500 placeholder:text-neutral-500' placeholder='ورود' />



                </div>
                <div className="col-span-1 md:col-span-3">
                    <input className='w-full border rounded-lg border-neutral-200 px-5 h-12 text-base text-neutral-500 placeholder:text-neutral-500' placeholder='خروج' />
                </div>
                <div className="col-span-2 md:col-span-2">
                    <button type='button' className='bg-primary-700 text-white rounded-lg px-5 text-center min-w-sm h-12 block w-full'>
                        جستجو
                    </button>
                </div>
            </div>




        </div>

        
    )
}

export default SearchForm;