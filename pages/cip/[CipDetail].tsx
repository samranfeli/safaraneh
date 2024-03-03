import { getAirportByUrl } from "@/modules/cip/actions";
import CipDetailGallery from "@/modules/cip/components/cip-detail/CipDetailGallery";
import CipName from "@/modules/cip/components/cip-detail/CipName";
import { CipGetAirportByUrlResponseType } from "@/modules/cip/types/cip";
import { RightCaret } from "@/modules/shared/components/ui/icons";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

const CipDetails: NextPage = ({ airportData }: { airportData?: CipGetAirportByUrlResponseType }) => {

    if (airportData) {
        debugger;
    }
    let airportLocation: [number, number] | undefined = undefined;
    if (airportData?.latitude && airportData?.longitude) {
        airportLocation = [+(airportData.latitude.replace("/", ".")), +(airportData.longitude.replace("/", "."))]
    }

    return (
        <div className="max-w-container m-auto p-5 max-md:p-3">
            <div className="p-3 bg-white flex justify-between items-center">
                <Link
                    href="/cip-home"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                >
                    <RightCaret className="w-6 h-6 fill-current inline-block ltr:rotate-180" />
                    مشاهده فرودگاه های دیگر
                </Link>
                <div className="text-sm font-semibold hidden sm:block">
                    شماره تلفن رزرو :
                    <a href="tel:+982126150051" className="rtl:mr-1 ltr:ml-1"> 02126150051 </a>
                </div>

            </div>

            {!!airportData && <CipDetailGallery items={airportData?.galleries} />}

            <CipName address={airportData?.address} name={airportData?.name} location={airportLocation} />

        </div>
    )
}

export default CipDetails;



export async function getStaticPaths() {
    return {
        paths: [{
            params: { CipDetail: "فرودگاه-بین-المللی-امام-خمینی-Cip-خدمات" }
        }],
        fallback: true,
    };
}

export async function getStaticProps(context: any) {

    const { locale, params } = context;

    const url = 'fa/cip/' + params?.CipDetail;

    const airportData: any = await getAirportByUrl(url, locale === "fa" ? "fa-IR" : "en-US");

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                airportData: airportData?.data?.result || null
            },

        }
    )

}
