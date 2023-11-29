import { useTranslation } from 'next-i18next';
import Slider from '../shared/ui/Slider';
import Image from 'next/image';

const PopularCities: React.FC = () => {

    const { t } = useTranslation('common');

    const cities: {
        imageUrl: string;
        url: string;
        quantity: number;
        name: string;
        title: string;
    }[] = [
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/esfahancityhome.jpg",
                url: t('esfahan-city-link'),
                title: t('esfahan-city-name'),
                quantity: 115,
                name: "اصفهان"
            },
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/kishcityhome.jpg",
                url: t('kish-city-link'),
                title: t('kish-city-name'),
                quantity: 50,
                name: "کیش"
            },
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/shirazcityhome.jpg",
                url: t('shiraz-city-link'),
                title: t('shiraz-city-name'),
                quantity: 50,
                name: "شیراز"
            },
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/mashhadcityhome.jpg",
                url: t('mashhad-city-link'),
                title: t('mashhad-city-name'),
                quantity: 75,
                name: "مشهد"
            },
            {
                imageUrl: "https://cdn2.safaraneh.com/images/home/tehrancityhome.jpg",
                url: t('tehran-city-link'),
                title: t('tehran-city-name'),
                quantity: 90,
                name: "تهران"
            }

        ];

    return (
        <div className="max-w-container mx-auto p-5 md:py-6">

            <h2 className='text-xl font-bold mb-4'>
                شهرهای محبوب
            </h2>

            <Slider
                className='popular-cities-slider'
                items={cities.map(city => (
                    <a key={city.name} href={city.url} className='grid grid-cols-9 bg-white rounded-lg overflow-hidden' target='_blank' title={city.name}>
                        <Image
                            src={city.imageUrl}
                            alt={city.title}
                            width={272}
                            height={142}
                            className='col-span-5 h-auto'
                        />
                        <div className="col-span-4 p-2 text-xs">
                            <div className='mb-3'>
                                رزرو هتل در
                                <b className='text-sm'> {city.name} </b>
                            </div>
                            <small className='text-3xs'>بیش از {city.quantity} هتل</small>
                        </div>
                    </a>
                ))}
                slidesPerView={5}
                navigation
                pagination
                spaceBetween={20}
                rtl
                responsive={{
                    1200: {
                        slidesPerView: 5
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

export default PopularCities;