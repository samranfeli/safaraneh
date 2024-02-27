import CipImages from "@/modules/cip/components/CipImages";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetAirportList, GetAirportsDetail } from "../../modules/cip/actions/index";
import CipDescribtion from "@/modules/cip/components/CipDescription";
import CipItem from "@/modules/cip/components/CipAirports";
import CipRules from "@/modules/cip/components/CipRules";
import CipFaq from "@/modules/cip/components/CipFaq";
import CipServices from "@/modules/cip/components/CipServices";
import { AirportDetailType } from "@/modules/cip/types/cip";

const CipMainPage: NextPage<any> = ({ AirportsList, AirportsDetail }: { AirportsDetail: AirportDetailType[]; AirportsList: any}) => {
    
    const AirportsAllData = AirportsDetail.map((i: any) => Object.assign(i, { 'Price': AirportsList.AirPorts.find((e: any) => e.AirportId == i.id).Price }))
    
    return (
        <>
            <CipImages  />
            <div className="max-w-container m-auto pr-5 pl-5 max-md:p-3">
                <CipDescribtion content={AirportsList} />
                <CipItem AirportsAllData={AirportsAllData}  />
                <CipServices />
                <CipRules />
                <CipFaq />
            </div>
         </>   
    )
}

export default CipMainPage;

export async function getStaticProps(context: any) {
    const [AirportsDetail, AirportsList] = await Promise.all<any>([
        GetAirportsDetail(),
        GetAirportList()
    ])
    const data = AirportsList?.data
    const data2 = AirportsDetail?.data.result.items

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                AirportsList: data || null,
                AirportsDetail: data2 || null
            },

        }
    )

}