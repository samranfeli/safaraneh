import { useTranslation } from 'next-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';

const PopularCities: React.FC = () => {

    const { t } = useTranslation('common');

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        rtl: true,
        responsive: [{
            breakpoint: 992,
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

            <Slider {...settings}>

                {cities.map(city => (
                    <div key={city.name} className='px-2'>
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

            </Slider>

        </div>

    )
}

export default PopularCities;