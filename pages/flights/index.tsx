import FlightTollbar from "@/modules/flights/FlightSidebarFilters";
import FlightsMain from "@/modules/flights/FlightsMain";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Flights: NextPage = () => {
    return (
        <div className="max-w-container m-auto p-5 max-md:p-3 flex gap-5">
            <FlightTollbar />
            <FlightsMain />
        </div>
    )
}

export default Flights;


export async function  getStaticProps (context: any)  {
    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
            },

        }
    )

}