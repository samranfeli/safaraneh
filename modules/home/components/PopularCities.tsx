import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

    const responsive = {
        largeDesktop: {
            breakpoint: { max: 5000, min: 1200 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1200, min: 992 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 992, min: 460 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1
        }
    };


    return (
        <>

            <h2 className='text-xl font-semibold my-4 md:mt-10'>
                شهرهای محبوب
            </h2>

            <div className='sm:-mx-2'>
                <Carousel
                    className='home-carousel'
                    rtl
                    responsive={responsive}
                    renderDotsOutside
                    showDots
                >

                    {cities.map(city => (
                        <div key={city.name} className='sm:px-2'>
                            <a href={city.url} className='grid grid-cols-9 bg-white rounded-lg overflow-hidden' target='_blank' title={city.name}>
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
                        </div>

                    ))}

                </Carousel>
            </div>

        </>

    )
}

export default PopularCities;