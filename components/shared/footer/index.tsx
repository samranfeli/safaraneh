import Link from "next/link";

import { useTranslation } from "next-i18next";

export default function Footer() {

    const { t } = useTranslation('common');

    const linkClassNames = "block hover:text-blue-600 hover:underline";

    return (
        <footer>

            <div className="max-w-container mx-auto p-3 text-neutral-700 pt-8 pb-14">

                <div className="flex justify-center gap-1 sm:gap-4 mb-10">
                    <img src='/images/footer/tandis-01.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <img src='/images/footer/tandis-02.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <img src='/images/footer/tandis-03.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <img src='/images/footer/tandis-04.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <img src='/images/footer/tandis-05.png' className="h-12 sm:h-18 object-contain" alt='' width={62} height={72} />
                    <a href="#" aria-label="نماد اعتماد">
                        <img src='/images/footer/enamad.png' className="h-12 sm:h-18 object-contain" alt='' width={43} height={72} />
                    </a>
                    <a href="#" aria-label="رسانه">
                        <img src='/images/footer/resaneh.png' className="h-12 sm:h-18 object-contain" alt='' width={60} height={72} />
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

                <img src='/images/logofa.png' width={115} height={48} alt="سفرانه" className="block mx-auto mb-4" />

                <div className="flex gap-4 justify-center mb-4">
                    {t('support')}
                    <a href="tel:02126150051" className="text-lg font-bold">
                        02126150051
                    </a>
                </div>

                <div className="flex justify-center gap-3 items-center">
                    <a href="https://www.instagram.com/safaraneh.travel/" aria-label="Instagram" title="Instagram" >
                        <img src='/images/footer/Instagram.svg' width={30} height={30} className="block" alt="Instagram" />
                    </a>
                    <a href="https://twitter.com/safaraneh" aria-label="Twitter" title="Twitter" >
                        <img src='/images/footer/Twitter.svg' width={30} height={30} className="block" alt="Twitter" />
                    </a>
                    <a href="https://www.facebook.com/safaraneh.travel" aria-label="Facebook" title="Facebook" >
                        <img src='/images/footer/Facebook.svg' width={30} height={30} className="block" alt="Facebook" />
                    </a>
                    <a href="https://www.linkedin.com/company/safaraneh/" aria-label="Linkedin" title="Linkedin" >
                        <img src='/images/footer/Linkedin.svg' width={30} height={30} className="block" alt="Linkedin" />
                    </a>
                </div>

            </div>

        </footer>
    )
}