import CipImages from "@/modules/cip/components/CipImages";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetAirportList, GetAirportsDetail } from "../../modules/cip/actions/index";
import CipDescribtion from "@/modules/cip/components/CipDescription";
import CipItem from "@/modules/cip/components/CipItems";

const CipMainPage: NextPage<any> = ({images, data , data2}) => {
    return (
        <div className="max-w-container m-auto pr-5 pl-5 max-sm:p-3">
            <CipImages images={images} />
            <CipDescribtion content={data} />
            <CipItem data2={data2} data={data} />
        </div>
    )
}

export default CipMainPage;

export async function getStaticProps(context: any) {
    const AirportsDetail = await GetAirportsDetail()
    const AirportsList = await GetAirportList()
    const data = AirportsList?.data
    const data2 = AirportsDetail?.data.result.items
    const images: any = []
    if (AirportsDetail) {
        console.log(AirportsDetail);
        
        for (let i = 0; i < 8; i++) {
            images.push(AirportsDetail?.data.result.items[0].galleries[i].path)
        }
    }

    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                images: images,
                data: data || null,
                data2: data2 || null
            },

        }
    )

}