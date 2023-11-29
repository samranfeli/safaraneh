import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Rating from '../shared/ui/Rating';
import Slider from '../shared/ui/Slider';


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

    return (
        <div className="max-w-container mx-auto p-5 md:py-6">

            <h2 className='text-xl font-bold mb-4'>
                {t('suggested-hotels')}
            </h2>

            <Slider
                className="suggested-hotels-slider"
                items={hotels.map(hotel => (
                    <div key={hotel.name} >
                        <a href={hotel.url} className='block bg-white rounded-lg overflow-hidden' target='_blank' title={hotel.name}>
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
                slidesPerView={4}
                navigation
                pagination
                spaceBetween={20}
                rtl
                responsive={{
                    1200: {
                        slidesPerView: 4
                    },
                    768: {
                        slidesPerView: 3
                    },
                    500: {
                        slidesPerView: 2
                    },
                    0: {
                        slidesPerView: 1
                    }

                }}

            />

        </div>

    )
}

export default SuggestedHotels;