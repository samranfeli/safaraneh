import Link from "next/link";
import { useTranslation } from "next-i18next";

import TravelServices from "./travelServices";
import Language from "./Language";
import Image from "next/image";

type Props = {
    logo: string;
    siteName: string;
}

const Header:React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const {logo, siteName} = props;

    return (
        <header className="bg-white z-30 relative">

            <div className="max-w-container mx-auto px-3 md:px-5 py-3 clearfix">

                <Link href="/" className="block md:rtl:float-right md:ltr:float-left md:rtl:ml-5 md:ltr:mr-5">
                    <Image src={logo} alt={siteName} width={115} height={48} onContextMenu={e => {e.preventDefault()}} className="h-12 mx-auto"  />
                </Link>
                <TravelServices logo={logo} siteName={siteName} className="rtl:float-right ltr:float-left"  />

                {/* <div className="flex gap-8 items-center">
                </div>

                <div className="gap-4 items-center hidden md:flex">
                </div> */}
                
                <button type="button" aria-label={t('sign-in-up')} className="h-12 text-sm text-blue-700 hover:text-blue-500 ltr:float-right rtl:float-left hidden md:block" >
                    {t('sign-in-up')}
                </button>

                <button type="button" aria-label={t('retrieve-my-booking')} className="h-12 text-sm text-blue-700 hover:text-blue-500 ltr:float-right rtl:float-left rtl:ml-5 ltr:mr-5 hidden md:block" >
                    {t('retrieve-my-booking')}
                </button>

                <Language className="ltr:float-right rtl:float-left rtl:ml-5 ltr:mr-5 hidden md:block" buttonClassName="h-12"  />
            </div>

        </header>
    )
}

export default Header;