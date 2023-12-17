
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
                ناشناخته ها
            </h2>
            <div className='sm:-mx-2'>
                <Carousel
                    className='home-carousel'
                    rtl
                    responsive={responsive}
                    renderDotsOutside
                    showDots
                >

                    {items.map(item => (
                        <div className='sm:px-2' key={item.title}>
                            <a href={item.url} className='block bg-white rounded-lg overflow-hidden' target='_blank' title={item.title}>
                                <div className='relative'>
                                    <Image
                                        onContextMenu={e => {e.preventDefault()}}
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

                </Carousel>
            </div>

        </Fragment>

    )
}

export default Unknowns;