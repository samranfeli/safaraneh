import Image from 'next/image';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

const CipGallery: React.FC = () => {

    const images = [
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/ika/cip-ika-01.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/ika/cip-ika-02.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/thr/cip-thr-02.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/tbz.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/thr/cip-thr-04.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/ika/cip-ika-04.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/awh/cip-awh-02.jpg',
            Alt: '',
            Title:''
        },
        {
            Image: 'https://cdn2.safaraneh.com/images/cip/thr/cip-thr-07.jpg',
            Alt: '',
            Title:''
       },
    ];

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

            <div className='flex gap-1 h-480 max-lg:h-full'>
                <div className='grid grid-rows-3 grid-cols-3 gap-1 w-1/2 max-md:w-full relative'>

                        {slides.slice(0, 4).map((slide, index) => (
                            <Image
                                key={slide.src}
                                priority={!index}
                                onContextMenu={(e)=> e.preventDefault()}
                                src={slide.src}
                                alt={slide.alt}
                                //sizes={index?"(max-width: 768px) 100vh, 578px" : "(max-width: 768px) 100vh, 287"}
                                width={index ? 252 : 800}
                                height={index ? 157 : 318}
                                onClick={() => { openLightBox(index); }}
                                className={`cursor-pointer w-full h-full object-cover ${!index && "col-span-3 row-span-2"  }`}
                            />
                        ))}
                    
                </div>

                <div className='grid grid-cols-2 grid-rows-2 gap-1 w-1/2 max-md:hidden'>
                {slides.slice(4, 8).map((slide, index) => (
                            <Image
                                key={slide.src}
                                onContextMenu={(e)=> e.preventDefault()}
                                src={slide.src}
                                alt={slide.alt}
                                //sizes={index?"(max-width: 768px) 100vh, 578px" : "(max-width: 768px) 100vh, 287"}
                                width={380}
                                height={238}
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