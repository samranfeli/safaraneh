import CipImages from "@/modules/cip/components/cip-home/CipImages";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetAirportList, GetAirportsDetail } from "../modules/cip/actions/index";
import CipDescribtion from "@/modules/cip/components/cip-home/CipDescription";
import CipAirportsList from "@/modules/cip/components/cip-home/CipAirportsList";
import CipRules from "@/modules/cip/components/cip-home/CipRules";
import CipFaq from "@/modules/cip/components/cip-home/CipFaq";
import CipServices from "@/modules/cip/components/cip-home/CipServices";
import { AirportDetailType } from "@/modules/cip/types/cip";

const CipMainPage: NextPage<any> = ({ generalData, priceData }: { generalData: AirportDetailType[]; priceData: any}) => {

    const airportsList =  generalData?.map(item => {
        
        const displayPrice = priceData?.AirPorts.find((i:any) => i.AirportId === item.id)?.Price;
        
        return({
            ...item,
            Price: displayPrice
        })
    })
    
    return (
        <>
            <CipImages  />
            <div className="max-w-container m-auto pr-5 pl-5 max-md:p-3">
                <CipDescribtion content={priceData?.Content} />
                <CipAirportsList AirportsAllData={airportsList}  />
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
    const priceData = AirportsList?.data
    const generalData = AirportsDetail?.data.result.items

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                priceData: priceData || null,
                generalData: generalData || null
            },

        }
    )

}