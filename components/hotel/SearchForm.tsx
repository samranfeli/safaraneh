import { useTranslation } from "next-i18next";
import {useCallback} from 'react';

import AutoComplete from "../shared/ui/AutoComplete";
import { Location } from "../shared/ui/icons";

const SearchForm : React.FC = () => {

    const { t } = useTranslation('common');

    return(
        <div className="flex gap-2 py-5">
            <div className="relative grow">
                <label htmlFor="destination" className="absolute top-1 rtl:right-10 ltr:left-10 text-3xs z-10 leading-5">
                    {t('searchHotelDestination')}
                </label>
                <AutoComplete
                inputId="destination"
                checkTypingLanguage
                noResultMessage={t('NoResultsFound')}
                textPropertyName='Name'
                renderOption={useCallback((option: any, direction: "ltr" | "rtl" | undefined) => (
                    <div className={`flex ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                        <div className={`text-xl ${!direction ? "rtl:ml-2 ltr:mr-2" : direction === 'rtl' ? "ml-2" : "mr-2"}`}>
                            {/* <Place className='w-5 h-7 fill-current' /> */}
                        </div>
                        <div>
                            <div className='text-lg'>{option.name}</div>
                            <div className='text-sm'>{option.parentName}</div>
                        </div>
                    </div>
                ), [])}
                icon={<Location className="h-5 w-5 fill-current" />}
                inputClassName={`w-full border rounded-lg border-neutral-200 pt-4 h-12 text-base text-neutral-500 placeholder:text-neutral-500`}
                placeholder={t('search-hotel-or-city')}
                min={3}
                onChangeHandle={()=>{ debugger;}}
                // value={useMemo(() => locations[0], [locations[0]?.Name])}
                // onChangeHandle={useCallback((value: AirportAutoCompleteType | undefined) => {
                //     setLocations(prevLocations => ([
                //         { Code: value?.Code || "", Name: value?.Name || "" },
                //         prevLocations[1]
                //     ]));
                //     form.setFieldValue(['flight', flightIndex, 'originCode'], value?.Code || "");
                //     form.setFieldValue(['flight', flightIndex, 'originName'], value?.Name || "");
                //     form.validateFields([['flight', flightIndex, 'originCode']]);
                // }, [])}
                url="https://hoteldomesticdata.safaraneh.com/api/services/app/Entity/Search"
                />
            </div>
            <div className="grow">
                <input className='w-full border rounded-lg border-neutral-200 px-5 h-12 text-base text-neutral-500 placeholder:text-neutral-500' placeholder='ورود' />
            </div>
            <div className="grow">
                <input className='w-full border rounded-lg border-neutral-200 px-5 h-12 text-base text-neutral-500 placeholder:text-neutral-500' placeholder='خروج' />
            </div>
            <div className="grow">
                <button type='button' className='bg-blue-600 text-white rounded-lg px-5 text-center min-w-sm h-12 block w-full'>
                    جستجو
                </button>
            </div>
        </div>
    )
}

export default SearchForm;