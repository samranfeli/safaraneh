import Link from "next/link";

import { useTranslation } from "next-i18next";

import Image from "next/image";

type Props = {
    logo: string;
    siteName: string;
    contactInfo: {
        tel?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        facebook?: string;
    }
}

const Footer: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { logo, siteName } = props;

    const linkClassNames = "block hover:text-blue-600 hover:underline";

    return (
        <footer>

            <div className="max-w-container mx-auto p-3 text-neutral-700 pt-8 pb-14">

                <div className="flex justify-center gap-1 sm:gap-4 mb-10">
                    <Image src='/images/footer/tandis-01.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <Image src='/images/footer/tandis-02.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <Image src='/images/footer/tandis-03.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <Image src='/images/footer/tandis-04.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <Image src='/images/footer/tandis-05.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <a href="#" aria-label="نماد اعتماد">
                        <Image src='/images/footer/enamad.png' className="h-12 sm:h-18 object-contain" alt='' width={43} height={72} />
                    </a>
                    <a href="#" aria-label="رسانه">
                        <Image src='/images/footer/resaneh.png' className="h-12 sm:h-18 object-contain" alt='' width={60} height={72} />
                    </a>
                </div>

                <nav className="hidden sm:flex justify-center gap-6 text-xs mb-6">
                    <Link title={t('contact-us')} href="/contact" className={linkClassNames} >
                        {t('contact-us')}
                    </Link>
                    <Link title={t('faq')} href="/faq" className={linkClassNames} >
                        {t('faq')}
                    </Link>
                    <Link title={t('rules-regulations')} href="/terms" className={linkClassNames} >
                        {t('rules-regulations')}
                    </Link>
                    <Link title={t('privacy')} href="/privacy" className={linkClassNames} >
                        {t('privacy')}
                    </Link>
                    <Link title={t("about-us")} href="/about" className={linkClassNames} >
                        {t("about-us")}
                    </Link>
                    <Link title={t('organizational-reservation')} href="/organizational-reservation" className={linkClassNames} >
                        {t('organizational-reservation')}
                    </Link>
                </nav>

                <Link href="/">
                    <Image src={logo} alt={siteName} width={115} height={48} className="block mx-auto mb-4" />
                </Link>

                <div className="flex gap-4 justify-center mb-4">
                    {t('support')}
                    <a href={`tel:${props.contactInfo.tel}`} className="text-lg font-semibold" dir="ltr">
                        {props.contactInfo.tel?.replace("+98", "0")}
                    </a>
                </div>

                <div className="flex justify-center gap-3 items-center">
                    <a href={props.contactInfo.instagram || "#"} aria-label="Instagram" title="Instagram" >
                        <Image src='/images/footer/Instagram.svg' width={30} height={30} className="block" alt="Instagram" />
                    </a>
                    <a href={props.contactInfo.twitter || "#"} aria-label="Twitter" title="Twitter" >
                        <Image src='/images/footer/Twitter.svg' width={30} height={30} className="block" alt="Twitter" />
                    </a>
                    <a href={props.contactInfo.facebook || "#"} aria-label="Facebook" title="Facebook" >
                        <Image src='/images/footer/Facebook.svg' width={30} height={30} className="block" alt="Facebook" />
                    </a>
                    <a href={props.contactInfo.linkedin || "#"} aria-label="Linkedin" title="Linkedin" >
                        <Image src='/images/footer/Linkedin.svg' width={30} height={30} className="block" alt="Linkedin" />
                    </a>
                </div>

            </div>

        </footer>
    )
}

export default Footer