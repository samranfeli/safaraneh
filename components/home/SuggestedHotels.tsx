import { useTranslation } from 'next-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import Rating from '../shared/ui/Rating';

const SuggestedHotels: React.FC = () => {

    const { t } = useTranslation('common');

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        swipeToSlide: true,
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

    const hotels: {
        imageUrl: string;
        name: string;
        url: string;
        rating: number;
    }[] = [
            {
                url: "hotel/هتل-پارسیان-آزادی-تهران",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-azadi-thumb.jpg",
                name: t('azadi-hotel-name'),
                rating: 5
            },
            {
                url: "hotel/هتل-پارس-شیراز",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-pars-thumb.jpg",
                name: t('pars-hotel-name'),
                rating: 5
            },
            {
                url: "hotel/هتل-مجلل-درویشی-مشهد",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-darvishi-thumb.jpg",
                name: t('darvishi-hotel-name'),
                rating: 5
            },
            {
                url: "hotel/هتل-پارسیان-استقلال-تهران",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-esteghlal-thumb.jpg",
                name: t('esteghlal-hotel-name'),
                rating: 5
            },
            {
                url: "hotel/هتل-اسپیناس-آستارا",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-espinas-thumb.jpg",
                name: t('astara-hotel-name'),
                rating: 4
            },
            {
                url: "hotel/هتل-میراژ-کیش",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-miraj-thumb.jpg",
                name: t('miraj-hotel-name'),
                rating: 5
            },
            {
                url: "hotel/هتل-داد-یزد",
                imageUrl: "https://cdn2.safaraneh.com/images/home/hotel-dad-thumb.jpg",
                name: t('dad-hotel-name'),
                rating: 4
            },
            {
                url: "hotel/هتل-پارسیان-کوثر-اصفهان",
                imageUrl: "/images/hotel-kowsar-thumb.jpg",
                name: t('kosar-hotel-name'),
                rating: 5
            }

        ]

    return (
        <div className="max-w-container mx-auto p-5 md:py-10">

            <h2 className='text-xl font-bold mb-4'>
                {t('suggested-hotels')}
            </h2>

            <Slider {...settings}>

                {hotels.map(hotel => (
                    <div className='px-2' key={hotel.name} dir="rtl">
                        <a href={hotel.url} className='block bg-white rounded-lg overflow-hidden' target='_blank' title={hotel.name}>
                            <Image
                                src={hotel.imageUrl}
                                alt={hotel.name}
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






    )
}

export default SuggestedHotels;