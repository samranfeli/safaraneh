import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Fragment} from 'react';

import Rating from '../../shared/components/ui/Rating';
import {LeftCaretBold,RightCaretBold} from '../../shared/components/ui/icons';

const SuggestedHotels: React.FC = () => {

    const { t } = useTranslation('common');

    const hotels: {
        imageUrl: string;
        name: string;
        url: string;
        rating: number;
        alt: string;
    }[] = [
            {
                url: "hotel/هتل-پارسیان-آزادی-تهران",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-azadi-thumb.jpg",
                name: t('azadi-hotel-name'),
                rating: 5,
                alt: "رزرو هتل آزادی تهران"
            },
            {
                url: "hotel/هتل-پارس-شیراز",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-pars-thumb.jpg",
                name: t('pars-hotel-name'),
                rating: 5,
                alt: "رزرو هتل پارس شیراز"
            },
            {
                url: "hotel/هتل-مجلل-درویشی-مشهد",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-darvishi-thumb.jpg",
                name: t('darvishi-hotel-name'),
                rating: 5,
                alt: "رزرو هتل مجلل درویشی مشهد"
            },
            {
                url: "hotel/هتل-پارسیان-استقلال-تهران",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-esteghlal-thumb.jpg",
                name: t('esteghlal-hotel-name'),
                rating: 5,
                alt: "رزرو هتل استقلال تهران"
            },
            {
                url: "hotel/هتل-اسپیناس-آستارا",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-espinas-thumb.jpg",
                name: t('astara-hotel-name'),
                rating: 4,
                alt: "رزرو هتل اسپیناس آستارا"
            },
            {
                url: "hotel/هتل-میراژ-کیش",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-miraj-thumb.jpg",
                name: t('miraj-hotel-name'),
                rating: 5,
                alt: "رزرو هتل میراژ کیش"
            },
            {
                url: "hotel/هتل-داد-یزد",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-dad-thumb.jpg",
                name: t('dad-hotel-name'),
                rating: 4,
                alt: "رزرو هتل داد یزد"
            },
            {
                url: "hotel/هتل-پارسیان-کوثر-اصفهان",
                imageUrl: "/images/hotel-kowsar-thumb.jpg",
                name: t('kosar-hotel-name'),
                rating: 5,
                alt: "رزرو هتل کوثر اصفهان"
            }

        ]

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        rtl: true,
        nextArrow: <LeftCaretBold className='w-5 h-5 bg-neutral-400 rounded-full fill-white p-1 text-center' />,
        prevArrow: <RightCaretBold className='w-5 h-5 bg-neutral-400 rounded-full fill-white p-1 text-center' />,
        responsive: [{
            breakpoint: 1023,
            settings: {
                slidesToShow: 3,
                dots: true,
                arrows: false

            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 2,
                dots: true,
                arrows: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                dots: true,
                arrows: false
            }
        }]
    };

    return (
        <Fragment>

            <h2 className='text-xl font-semibold mb-4'>
                {t('suggested-hotels')}
            </h2>

            <div className='lg:mx-2 xl:-mx-2 pb-10'>
                <Slider {...settings}>

                    {hotels.map(hotel => (
                        <div className='px-2' key={hotel.name}>
                            <a href={hotel.url} className='block bg-white rounded-lg overflow-hidden' target='_blank'>
                                <Image
                                    src={hotel.imageUrl}
                                    alt={hotel.alt}
                                    width={272}
                                    height={142}
                                    className='w-full h-auto'
                                />
                                <div className='p-3'>
                                    <h2 className='mb-1 text-sm font-semibold'>
                                        {hotel.name}
                                    </h2>
                                    <Rating number={hotel.rating} />
                                </div>

                            </a>
                        </div>
                    ))}

                </Slider>
            </div>

        </Fragment>

    )
}

export default SuggestedHotels;