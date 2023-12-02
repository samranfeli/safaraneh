
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {LeftCaretBold,RightCaretBold} from '../shared/ui/icons';

const Unknowns: React.FC = () => {

    const { t } = useTranslation('common');

    const items: {
        imageUrl: string;
        title: string;
        location: string;
        url: string;
    }[] = [
            {
                url: "https://www.instagram.com/p/CHVMUhqAFbV/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-busher-thumb.jpg",
                title: t('offer3-desc'),
                location: t('offer3')
            },
            {
                url: "https://www.instagram.com/p/CJdreyCASlk/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-hormoz-thumb.jpg",
                title: t('اقامتگاه لب ساحل هرمز'),
                location: t('جزیره هرمز')
            },
            {
                url: "https://www.instagram.com/p/CH2sdAqgK8i/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-lahijan-thumb.jpg",
                title: t('offer1-desc'),
                location: t('لاهیجان')
            },
            {
                url: "https://www.instagram.com/p/CHksBtmgZbl/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-matinabad-thumb.jpg",
                title: t('offer2-desc'),
                location: t('متین‌آباد')
            },
            {
                url: "https://www.instagram.com/p/CHK5VE2gatE/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-esfahan-thumb.jpg",
                title: t('offer4-desc'),
                location: t('offer4')
            },
            {
                url: "https://www.instagram.com/p/CKT3qG_gGTF/",
                imageUrl: "https://cdn2.safaraneh.com/images/home/unknown-yazd-thumb.jpg",
                title: t('هتل کاروانسرا'),
                location: t('یزد')
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
                ناشناخته ها
            </h2>
            <div className='lg:mx-2 xl:-mx-2'>
                <Slider {...settings}>

                    {items.map(item => (
                        <div className='px-2' key={item.title}>
                            <a href={item.url} className='block bg-white rounded-lg overflow-hidden' target='_blank' title={item.title}>
                                <div className='relative'>
                                    <Image
                                        src={item.imageUrl}
                                        alt={`رزرو ${item.title}`}
                                        width={272}
                                        height={142}
                                        className='w-full h-auto'
                                    />
                                    <div className='absolute bottom-3 px-5'>
                                        <span className='bg-primary-800 text-white px-5 pt-2 pb-3 inline-block leading-4 text-sm rounded-lg'> {item.location} </span>
                                    </div>
                                </div>
                                <div className='p-3'>
                                    <h2 className='mb-1 text-sm font-semibold'>
                                        {item.title}
                                    </h2>
                                    <div className="text-sm text-blue-700 rtl:text-left ltr:text-right">{t('more-details')}</div>
                                </div>

                            </a>
                        </div>
                    ))}

                </Slider>
            </div>

        </div>

    )
}

export default Unknowns;