import { GetAirportList, GetAirportsDetail } from "@/modules/cip/actions";
import { AirportDetailType } from "@/modules/cip/types/cip";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Cipreserve: NextPage<any> = ({ generalData }: { generalData: AirportDetailType[] }) => {
    console.log(generalData);
    
    return (
        <div className="max-w-container m-auto p-5 max-md:p-3">
            
        </div>
    )
}

export default Cipreserve;

export async function getStaticPaths() {
    const AirportsDetail: any = await GetAirportsDetail()
    const generalData = AirportsDetail?.data.result.items;

    const paths = generalData.map((airport : any) => {
        return { params: {CipDetail: airport.url} }
      });
    
    
    return {
        paths,
        fallback: true,
    };
}

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