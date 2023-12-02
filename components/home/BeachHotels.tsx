import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Rating from '../shared/ui/Rating';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {LeftCaretBold,RightCaretBold} from '../shared/ui/icons';

const BeachHotels: React.FC = () => {

    const { t } = useTranslation('common');
    
    const hotels: {
        imageUrl: string;
        name: string;
        url: string;
        rating: number;
    }[] = [
            {
                url: t("noor-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-noor-thumb.jpg",
                name: t('noor-hotel-beach-name'),
                rating: 4
            },
            {
                url: t("toranj-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-toranj-thumb.jpg",
                name: t('toranj-hotel-beach-name'),
                rating: 5
            },
            {
                url: t("parsian-chalos-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-azadi-khazar-thumb.jpg",
                name: t('parsian-chalos-hotel-beach-name'),
                rating: 5
            },
            {
                url: t("homa-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-homa-bandarabbas-thumb.jpg",
                name: t('homa-hotel-beach-name'),
                rating: 5
            },
            {
                url: t("lipar-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-lipar-thumb.jpg",
                name: t('lipar-hotel-beach-name'),
                rating: 5
            },
            {
                url: t("marina-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-marina-thumb.jpg",
                name: t('marina-hotel-beach-name'),
                rating: 5
            }


        ]
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
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
        <div className="max-w-container mx-auto p-5 md:py-6">
            <h2 className='text-xl font-bold mb-4'>
                هتل‌‌های ساحلی
            </h2>
            <div className='lg:mx-2 xl:-mx-2'>

                <Slider {...settings}>

                    {hotels.map(hotel => (
                        <div className='px-2' key={hotel.name}>
                            <a href={hotel.url} className='outline-none block bg-white rounded-lg overflow-hidden' target='_blank' title={hotel.name}>
                                <Image
                                    src={hotel.imageUrl}
                                    alt={`رزرو ${hotel.name}`}
                                    width={376}
                                    height={183}
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

        </div>

    )
}

export default BeachHotels;