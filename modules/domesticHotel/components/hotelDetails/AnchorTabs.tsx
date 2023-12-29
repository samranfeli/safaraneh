import { useTranslation } from 'next-i18next';
import AnchorTabItem from './AnchorTabItem';
import { useEffect, useRef, useState } from 'react';

const AnchorTabs: React.FC = () => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotelDetail');

    const [sticky, setSticky] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const wrapperHeight = wrapperRef.current?.offsetHeight;

    const items: { id: string, title: string }[] = [
        { id: "pictures_section", title: tHotel('pictures') },
        { id: "hotel_intro", title: tHotel('hotel-intro') },
        { id: "rooms_section", title: tHotel('choose-room') },
        { id: "amenities_section", title: tHotel('hotel-facilities') },
        { id: "terms_section", title: t('terms') },
        { id: "about_section", title: tHotel('about-hotel') },
        { id: "attractions_section", title: tHotel('attraction') },
        { id: "reviews_section", title: tHotel('suggestion') },
        { id: "similarhotels_section", title: tHotel('similar-hotels') }
    ];

    const makeSticky = () => {
        const wrapperTop = wrapperRef.current?.getBoundingClientRect().top;
        if (!wrapperTop) return;
        if (wrapperTop > 0) {
            setSticky(false);
        } else {
            setSticky(true);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', makeSticky);
        window.addEventListener("resize", makeSticky);

        return (() => {
            document.removeEventListener('scroll', makeSticky);
            window.removeEventListener("resize", makeSticky);
        });
    }, []);

    return (<div ref={wrapperRef} className='relative hidden lg:block' style={{ height: wrapperHeight + "px" }}>
        <div className={`transition-all ${sticky ? "fixed z-[1001] left-0 right-0 top-0 bg-white shadow" : ""}`}>
            <div className='max-w-container mx-auto px-3 sm:px-5'>
                <nav className='bg-white flex'>
                    {items.map(item => <AnchorTabItem key={item.id} title={item.title} target={item.id} />)}
                </nav>
            </div>
        </div>
    </div>)
}

export default AnchorTabs;