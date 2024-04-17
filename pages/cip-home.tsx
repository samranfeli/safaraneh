import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetAirportsAvailability, GetAirportsList, GetCipAirPortListforContent } from "../modules/cip/actions/index";
import CipDescription from "@/modules/cip/components/cip-home/CipDescription";
import CipAirportsList from "@/modules/cip/components/cip-home/CipAirportsList";
import CipRules from "@/modules/cip/components/cip-home/CipRules";
import CipFaq from "@/modules/cip/components/cip-home/CipFaq";
import CipServices from "@/modules/cip/components/cip-home/CipServices";
import { AirportDetailType, CipAvailibilityItem } from "@/modules/cip/types/cip";
import CipGallery from "@/modules/cip/components/cip-home/CipGallery";
import Head from "next/head";

const CipHome: NextPage<any> = ({ content, airports, priceData }: { content: any, airports: AirportDetailType[]; priceData: CipAvailibilityItem[] }) => {

    const airportslist = airports.map(airportItem => {

        const itemAvailibilityObject: CipAvailibilityItem | undefined = priceData.find(item => item.id === airportItem.id);

        if (itemAvailibilityObject) {

            const availabilitiesPrices = itemAvailibilityObject.availability.map(item => item.salePrice);

            return ({
                ...airportItem,
                displayPrice: Math.min(...availabilitiesPrices)
            })
        }

        return airportItem;

    })

    return (
        <>
            <Head>
                <title>تشریفات فرودگاهی cip||رزرو آنلاین هتل و بلیط هواپیما</title>
            </Head>

            <CipGallery />

            <div className="max-w-container m-auto pr-5 pl-5 max-md:p-3">

                {!!content && <CipDescription content={content} />}

                <CipAirportsList airports={airportslist} />

                <CipServices />

                <CipRules />

                <CipFaq />
            </div>
        </>
    )
}

export async function getStaticProps(context: any) {
    const [contentData, airportsList, airportsAvailability] = await Promise.all<any>([
        GetCipAirPortListforContent(),
        GetAirportsList(),
        GetAirportsAvailability([
            "IKA", "THR", "KIH", "MHD", "KSH", "AWH", "TBZ", "RAS"
        ])
    ]);

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                priceData: airportsAvailability?.data?.result || null,
                airports: airportsList?.data.result.items || null,
                content: contentData?.data?.Content || null
            },
        }
    )
}

export default CipHome;