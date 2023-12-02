import Link from "next/link";
import { useTranslation } from "next-i18next";

import TravelServices from "./travelServices";
import Language from "./Language";
import Logo from "../Logo";

export default function Header() {

    const { t } = useTranslation('common');

    return (
        <header className="bg-white z-30 relative">

            <div className="max-w-container mx-auto px-3 py-3 flex justify-center md:justify-between">
                <div className="flex gap-8 items-center">
                    <Link href="/" className="block">
                        <Logo />
                    </Link>
                    <TravelServices />
                </div>

                <div className="gap-4 items-center hidden md:flex">
                    <Language />

                    <button type="button" aria-label={t('retrieve-my-booking')} className="text-sm text-blue-700 hover:text-blue-500" >
                        {t('retrieve-my-booking')}
                    </button>

                    <button type="button" aria-label={t('sign-in-up')} className="text-sm text-blue-700 hover:text-blue-500" >
                        {t('sign-in-up')}
                    </button>
                </div>

            </div>

        </header>
    )
}