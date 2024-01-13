import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Rating from '../../shared/components/ui/Rating';

const SuggestedHotels: React.FC = () => {

    const { t:tHome } = useTranslation('home');

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
                name: tHome('azadi-hotel-name'),
                rating: 5,
                alt: "رزرو هتل آزادی تهران"
            },
            {
                url: "hotel/هتل-پارس-شیراز",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-pars-thumb.jpg",
                name: tHome('pars-hotel-name'),
                rating: 5,
                alt: "رزرو هتل پارس شیراز"
            },
            {
                url: "hotel/هتل-مجلل-درویشی-مشهد",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-darvishi-thumb.jpg",
                name: tHome('darvishi-hotel-name'),
                rating: 5,
                alt: "رزرو هتل مجلل درویشی مشهد"
            },
            {
                url: "hotel/هتل-پارسیان-استقلال-تهران",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-esteghlal-thumb.jpg",
                name: tHome('esteghlal-hotel-name'),
                rating: 5,
                alt: "رزرو هتل استقلال تهران"
            },
            {
                url: "hotel/هتل-اسپیناس-آستارا",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-espinas-thumb.jpg",
                name: tHome('astara-hotel-name'),
                rating: 4,
                alt: "رزرو هتل اسپیناس آستارا"
            },
            {
                url: "hotel/هتل-میراژ-کیش",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-miraj-thumb.jpg",
                name: tHome('miraj-hotel-name'),
                rating: 5,
                alt: "رزرو هتل میراژ کیش"
            },
            {
                url: "hotel/هتل-داد-یزد",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-dad-thumb.jpg",
                name: tHome('dad-hotel-name'),
                rating: 4,
                alt: "رزرو هتل داد یزد"
            },
            {
                url: "hotel/هتل-پارسیان-کوثر-اصفهان",
                imageUrl: "/images/hotel-kowsar-thumb.jpg",
                name: tHome('kosar-hotel-name'),
                rating: 5,
                alt: "رزرو هتل کوثر اصفهان"
            }

        ]

    const responsive = {
        largeDesktop: {
            breakpoint: { max: 5000, min: 1200 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1200, min: 992 },
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
        <>
            <h2 className='text-xl font-semibold mb-4'>
                {tHome('suggested-hotels')}
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
                            <a href={hotel.url} className='block bg-white rounded-lg overflow-hidden' target='_blank'>
                                <Image
                                    onContextMenu={e => {e.preventDefault()}}
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
                                    {!!hotel.rating && <Rating number={hotel.rating} />}
                                </div>

                            </a>
                        </div>
                    ))}

                </Carousel>
            </div>
        </>

    )
}

export default SuggestedHotels;