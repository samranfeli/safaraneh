import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Rating from '../../shared/components/ui/Rating';

const BeachHotels: React.FC = () => {

    const { t:tHome } = useTranslation('home');

    const hotels: {
        imageUrl: string;
        name: string;
        url: string;
        rating: number;
    }[] = [
            {
                url: tHome("noor-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-noor-thumb.jpg",
                name: tHome('noor-hotel-beach-name'),
                rating: 4
            },
            {
                url: tHome("toranj-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-toranj-thumb.jpg",
                name: tHome('toranj-hotel-beach-name'),
                rating: 5
            },
            {
                url: tHome("parsian-chalos-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-azadi-khazar-thumb.jpg",
                name: tHome('parsian-chalos-hotel-beach-name'),
                rating: 5
            },
            {
                url: tHome("homa-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-homa-bandarabbas-thumb.jpg",
                name: tHome('homa-hotel-beach-name'),
                rating: 5
            },
            {
                url: tHome("lipar-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-lipar-thumb.jpg",
                name: tHome('lipar-hotel-beach-name'),
                rating: 5
            },
            {
                url: tHome("marina-hotel-beach-link"),
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-beach-marina-thumb.jpg",
                name: tHome('marina-hotel-beach-name'),
                rating: 5
            }


        ];

    const responsive = {
        desktop: {
            breakpoint: { max: 5000, min: 992 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 992, min: 460 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1
        }
    };

    return (
        <Fragment>
            <h2 className='text-xl font-semibold my-4 md:mt-10'>
                هتل‌‌های ساحلی
            </h2>
            <div className='sm:-mx-2'>

                <Carousel
                    className='home-carousel'
                    rtl
                    responsive={responsive}
                    renderDotsOutside
                    showDots
                >

                    {hotels.map(hotel => (
                        <div className='sm:px-2' key={hotel.name}>
                            <a href={hotel.url} className='outline-none block bg-white rounded-lg overflow-hidden' target='_blank' title={hotel.name}>
                                <Image
                                    onContextMenu={e => {e.preventDefault()}}
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

                </Carousel>
            </div>

        </Fragment>

    )
}

export default BeachHotels;