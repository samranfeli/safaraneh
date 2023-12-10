import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

import { DomesticHotelMainType } from '@/types/hotel';
import { LeftCaret, Location } from '@/components/shared/ui/icons';
import Rating from '@/components/shared/ui/Rating';
import { numberWithCommas } from '@/helpers';
import Tooltip from '@/components/shared/ui/Tooltip';
import Button from '@/components/shared/ui/Button';


interface Hotel extends DomesticHotelMainType {
    salePriceFrom: number;
    boardPriceFrom?: number;
}

type Props = {
    hotel?: Hotel;
    loadingPrice?: boolean;
    nights: number;
    searchInfo: string;
}

const SimilarHotelItem: React.FC<Props> = props => {

    const { hotel } = props;

    const { t } = useTranslation('common');

    if (!hotel) {
        return null;
    }

    let boardPrice = null;

    if (hotel.boardPriceFrom && hotel.boardPriceFrom > hotel.salePriceFrom) {
        boardPrice = (<span className='text-neutral-400 text-xs line-through'>
            {numberWithCommas(hotel.boardPriceFrom)} {t('rial')}
        </span>);
    }

    let salePrice = <span className='text-xs font-semibold text-red-500'>قیمت نیازمند استعلام است </span>;
    let buttonText = "درخواست رزرو";

    if (hotel.salePriceFrom > 10000) {

        const salePriceTootlipText = (
            <div className='max-w-40 whitespace-nowrap leading-6'>
                {numberWithCommas(Math.floor(hotel.salePriceFrom / props.nights))} {t('rial')}
                <br />
                <small>
                    {t("Avg-per-night")}
                </small>
            </div>
        );

        salePrice = (<>
            <Tooltip title={salePriceTootlipText} position='end' >
                <div className='text-sm font-semibold rtl:text-left ltr:text-right leading-5'>{numberWithCommas(hotel.salePriceFrom)} {t('rial')}</div>
            </Tooltip>
            <p className='text-2xs'>{t('price-start-from')} {props.nights} {t('night')}</p>
        </>);


        buttonText = t('see-rooms');
    };


    return (
        <div className='bg-white border-2 border-white rounded-xl flex flex-col justify-between'>
            <div>
                <Link href={hotel.Url! + props.searchInfo} target='_blank'>
                    <Image
                        src={hotel.ImageUrl!}
                        alt={hotel.ImageAlt || hotel.ImageTitle || ""}
                        title={hotel.ImageTitle}
                        width={369}
                        height={224}
                        className='w-full h-56 object-cover rounded-t-xl'
                    />
                </Link>
                <div className='p-3'>
                    <Link href={hotel.Url! + props.searchInfo} target='_blank' className='block mb-2'>
                        <h3 className='font-semibold text-base'>
                            {hotel.HotelTypeName} {hotel.HotelName} {hotel.CityName}
                        </h3>
                    </Link>
                    {!!hotel.HotelRating && <Rating number={hotel.HotelRating} className='mb-3' />}

                    {hotel.Address && <p className='text-xs text-neutral-500 leading-5'>
                        <Location className='w-4 h-4 fill-current inline-block align-middle rtl:ml-1 ltr:mr-1' />
                        {hotel.Address}
                    </p>}
                </div>
            </div>

            <footer className='p-3 flex flex-col items-end justify-end'>

                {props.loadingPrice ? (
                    <span className="animate-spin block border-2 border-blue-200 rounded-full border-r-transparent border-t-transparent w-7 h-7 mb-4" />
                ) : (
                    <>
                        {boardPrice}
                        {salePrice}
                    </>
                )}

                <Button
                    href={hotel.Url! + props.searchInfo}
                    className='text-sm font-semibold px-5 h-10 rounded-md inline-flex'
                >
                    {buttonText}
                    <LeftCaret className='w-4 h-4 fill-current ltr:rotate-180' />
                </Button>
            </footer>

        </div>
    )
}

export default SimilarHotelItem;

