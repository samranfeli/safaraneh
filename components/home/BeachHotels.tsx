import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Rating from '../shared/ui/Rating';
import Slider from '../shared/ui/Slider';

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

    return (
        <div className="max-w-container mx-auto p-5 md:py-6">
            <h2 className='text-xl font-bold mb-4'>
                هتل‌‌های ساحلی
            </h2>
            <Slider
                className="beach-hotels-slider"
                items={hotels.map(hotel => (
                    <a key={hotel.name} href={hotel.url} className='block bg-white rounded-lg overflow-hidden' target='_blank' title={hotel.name}>
                        <Image
                            src={hotel.imageUrl}
                            alt={`رزرو ${hotel.name}`}
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
                ))}
                slidesPerView={3}
                navigation
                pagination
                spaceBetween={20}
                rtl
                responsive={{
                    1200: {
                        slidesPerView: 3
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

export default BeachHotels;