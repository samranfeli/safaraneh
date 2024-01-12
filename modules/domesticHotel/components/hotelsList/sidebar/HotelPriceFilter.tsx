import { useTranslation } from "next-i18next";

type Props = {

}

const HotelPriceFilter: React.FC<Props> = props => {

    const { t: tHotel } = useTranslation('hotel');
    const { t } = useTranslation('common');

    return (
        <>
            <div className="flex justify-between items-start mb-2 mt-4 border-t border-neutral-300 pt-5">
                <label className="font-semibold text-sm">
                {tHotel('total-price-for-stay')} ({t('rial')})
                </label>
                <button
                    type="button"
                    className="bg-red-500 text-white text-xs leading-5 px-2 rounded inline-block"
                >
                    {t('reset-filter')}
                </button>
            </div>
            
            <div className="grid gap-3 grid-cols-3 mb-3">
                <label className="block text-xs" > حداقل </label>
                <input 
                    type="text"
                    className="col-span-2 border border-neutral-300 rounded px-3 h-8 outline-none focus:border-neutral-600 block"
                    dir="ltr"
                />
            </div>

            <div className="grid gap-3 grid-cols-3 mb-3">
                <label className="block text-xs" > حداکثر </label>
                <input 
                    type="text"
                    className="col-span-2 border border-neutral-300 rounded px-3 h-8 outline-none focus:border-neutral-600 block"
                    dir="ltr"
                />
            </div>


        </>
    )
}

export default HotelPriceFilter;