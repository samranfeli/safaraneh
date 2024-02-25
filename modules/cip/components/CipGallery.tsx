import { ImageGallery } from '@/modules/shared/components/ui/icons';
import { DomesticHotelDetailType } from '@/modules/domesticHotel/types/hotel';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

type Props = {
    images?: DomesticHotelDetailType['Gallery']
}

const CipGallery: React.FC<Props> = props => {

    const { t: tHotel } = useTranslation('hotel');
    const { images } = props;

    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);

    if (!images) {
        return <div>
            no image message...
        </div>
    }

    const slides = images.filter(item => item.Image).map(item => ({
        src: item.Image! as string,
        alt: item.Title || "",
        width: 1000,
        height: 700,
        description: item.Alt
    }));

    const openLightBox = (index?: number) => {
        setSlideIndex(index || 0);
        setOpen(true);
    }

    return (
        <>

            <div className='flex gap-1 h-480 max-xl:h-full'>
                <div className='grid grid-rows-1 grid-cols-3 gap-1 w-1/2 max-md:w-full relative'>

                        {slides.slice(0, 4).map((slide, index) => (
                            <Image
                                key={slide.src}
                                priority={!index}
                                onContextMenu={(e)=> e.preventDefault()}
                                src={slide.src}
                                alt={slide.alt}
                                sizes={index?"(max-width: 768px) 100vh, 578px" : "(max-width: 768px) 100vh, 287"}
                                width={index ? 287 : 430}
                                height={index ? 191 : 270}
                                onClick={() => { openLightBox(index); }}
                                className={`cursor-pointer w-full h-full object-cover ${!index && "col-span-3" }`}
                            />
                        ))}
                    
                </div>

                <div className='grid grid-cols-2 grid-rows-2 gap-1 w-1/2 max-md:hidden'>
                {slides.slice(4, 8).map((slide, index) => (
                            <Image
                                key={slide.src}
                                priority={!index}
                                onContextMenu={(e)=> e.preventDefault()}
                                src={slide.src}
                                alt={slide.alt}
                                sizes={index?"(max-width: 768px) 100vh, 578px" : "(max-width: 768px) 100vh, 287"}
                                width={index ? 287 : 430}
                                height={index ? 191 : 270}
                                onClick={() => { openLightBox(index); }}
                                className={`cursor-pointer w-full h-full object-cover `}
                            />
                        ))}
                </div>

            </div>

            <Lightbox
                index={slideIndex}
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                plugins={[Thumbnails, Captions]}
                captions={{ descriptionTextAlign: 'center' }}
                thumbnails={{ width: 80, height: 50 }}
            />

        </>
    )
}

export default CipGallery;