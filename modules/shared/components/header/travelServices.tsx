import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useState, useEffect, useRef } from "react";

import { Menu, DownCaret, Home, Close, User, UserAdd, Ticket, Wallet, Bed, Blog, Suitcase, Travel } from "../ui/icons";
import Image from "next/image";

type Props = {
    logo: string;
    siteName: string;
}

const TravelServices: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { logo, siteName } = props;

    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => { setOpenMenu(prevState => !prevState) }

    const linkClassName = 'px-5 py-1 block my-2 transition-all duration-200 hover:text-blue-700';
    const linkWithIconClassName = linkClassName + ' ' + 'flex items-center gap-3';

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setOpenMenu(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuWrapperClassNames = ` bg-white text-sm text-neutral-700 transition-all md:shadow-normal
    fixed top-0 h-screen rtl:right-0 rtl:left-1/4 ltr:left-0 ltr:right-1/4        
    md:absolute md:top-full md:h-auto md:rtl:left-auto md:ltr:right-auto md:rounded-lg md:w-80
    ${openMenu ? "translate-x-0 visible opacity-100 md:mt-0" : "translate-x-full md:translate-x-0 invisible opacity-0 md:-mt-3"}`

    const iconClassName = 'w-5 h-5 fill-current opacity-90';

    return (
        <div className="absolute rtl:right-0 ltr:left-0 top-0 h-full flex flex-col justify-center md:relative md:top-auto md:right-auto md:left-auto md:h-auto">
            <div className={`bg-black/50 backdrop-blur fixed left-0 right-0 top-0 bottom-0 block md:hidden transition-all duration-200 ${openMenu ? "opacity-100 visible" : "opacity-0 invisible"}`}></div>
            <div ref={wrapperRef}>
                <button type="button" aria-label='Button to open navigation' className="text-sm p-3 md:px-0 md:py-2 text-blue-700 hover:text-blue-500 flex gap-1 items-center" onClick={toggleMenu}>
                    <Menu className="w-8 h-8 fill-neutral-600 md:hidden" />
                    <span className="hidden md:block">
                        {t('TravelFacilities')}
                    </span>
                    <DownCaret className="fill-current w-5 h-5 hidden md:block" />
                </button>

                <div className={menuWrapperClassNames}  >
                    <div className="md:hidden border-b border-neutral-200 p-5 flex justify-between items-center">
                        <Link href="/" className="block">
                            <Image src={logo} alt={siteName} width={115} height={48} />
                        </Link>
                        <button aria-label={t('close-menu')} type="button" onClick={() => { setOpenMenu(false) }}>
                            <Close className="w-6 h-6 fill-neutral-400" />
                        </button>
                    </div>
                    <nav className="py-3 max-h-mobile-nav overflow-auto md:max-h-none">
                        <div>
                            <Link href="" className={`${linkWithIconClassName} md:hidden`}>
                                <Home className={iconClassName} />
                                {t('home')}
                            </Link>
                            <Link href="" className={`${linkWithIconClassName} md:hidden`}>
                                <User className={iconClassName} />
                                {t('sign-in')}
                            </Link>
                            <Link href="" className={`${linkWithIconClassName} md:hidden`}>
                                <UserAdd className={iconClassName} />
                                {t('create-account')}
                            </Link>
                            <Link href="" className={`${linkWithIconClassName} md:hidden`}>
                                <Ticket className={iconClassName} />
                                {t('retrieve-my-booking')}
                            </Link>
                            <Link href="" className={`${linkWithIconClassName} md:hidden`}>
                                <Wallet className={iconClassName} />
                                0 ریال
                            </Link>
                        </div>

                        <div className="border-b border-neutral-200 m-5 md:hidden" />

                        <div>
                            <Link href='/hotels-home' className={linkWithIconClassName} >
                                <Bed className={iconClassName} />
                                {t('domestic-hotel')}
                            </Link>
                            <Link href='/flights-home' className={linkWithIconClassName} >
                                <Travel className={iconClassName} />
                                {t('domestic-flight')}
                            </Link>
                            <Link href='/hotels-foreign-home' className={linkWithIconClassName} >
                                <Bed className={iconClassName} />
                                {t('foreign-hotel')}
                            </Link>
                            <Link href='/flight-foreign-home' className={linkWithIconClassName} >
                                <Travel className={iconClassName} />
                                {t('foreign-flight')}
                            </Link>
                            <Link href='/cip' className={linkWithIconClassName} >
                                <Suitcase className={iconClassName} />
                                {t('cip')}
                            </Link>
                            <Link href='/blog' className={linkWithIconClassName}>
                                <Blog className={iconClassName} />
                                {t('blog')}
                            </Link>
                        </div>

                        <div className="border-b border-neutral-200 m-5 md:hidden" />
                        
                        <div>
                            <Link href='/organizational-reservation' className={linkClassName} > {t('organizational-reservation')} </Link>
                            <Link href='/contact' className={linkClassName} > {t('contact-us')} </Link>
                            <Link href='/privacy' className={linkClassName} > {t('privacy')} </Link>
                            <Link href='/faq' className={linkClassName} > {t('faq')} </Link>
                            <Link href='/terms' className={linkClassName} > {t('rules-regulations')} </Link>
                            <Link href='/about' className={linkClassName} > {t('about-us')} </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default TravelServices;