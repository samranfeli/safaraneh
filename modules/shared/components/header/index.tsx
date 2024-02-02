import Link from "next/link";
import { useTranslation } from "next-i18next";

import TravelServices from "./travelServices";
import Language from "./Language";
import Image from "next/image";
import TrackOrder from "./TrackOrder";
import HeaderAuthentication from "@/modules/authentication/components/HeaderAuthentication";

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

                {!!logo && <Link href="/" className="block md:rtl:float-right md:ltr:float-left md:rtl:ml-5 md:ltr:mr-5">
                    <Image src={logo} alt={siteName} width={115} height={48} onContextMenu={e => {e.preventDefault()}} className="h-12 mx-auto"  />
                </Link>}
                <TravelServices logo={logo} siteName={siteName} className="rtl:float-right ltr:float-left"  />

                {/* <div className="flex gap-8 items-center">
                </div>

                <div className="gap-4 items-center hidden md:flex">
                </div> */}
                
                <HeaderAuthentication />

                <TrackOrder />

                <Language className="ltr:float-right rtl:float-left rtl:ml-5 ltr:mr-5 hidden md:block" buttonClassName="h-12"  />
            </div>

        </header>
    )
}

export default Header;