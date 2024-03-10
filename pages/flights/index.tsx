import { GetAvailability, GetFlights } from "@/modules/flights/actions";
import FlightSidebarFilters from "@/modules/flights/components/sidebar/FlightSidebarFilters";
import FlightsMain from "@/modules/flights/components/FlightsMain";
import { FlightType } from "@/modules/flights/types/flights";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { createContext, useEffect } from "react";

export const FlightsDataContext = createContext<any>('')

const Flights: NextPage<any> = ({ FlightsData } : {FlightsData : FlightType[]}) => {
    console.log(FlightsData);
    let a = new Date();
    console.log(`${a.getFullYear()}-${a.getMonth()}-${a.getDay()}`);
    
    
    const router = useRouter()
    useEffect(() => {
        router.replace({
            query: {
                ...router.query,
                departureCode: 'AHW',
                returnCode: 'THR',
                adult: 1,
                child: 0,
                infant: 0,
                step: 'result',
                departing: '2024-03-07'
            }
        })

    },[])
    return (
        <div className="max-w-container m-auto p-5 max-md:p-3 flex gap-5">
            <FlightsDataContext.Provider value={FlightsData}>
                <FlightSidebarFilters />
                <FlightsMain />
            </FlightsDataContext.Provider>
        </div>
    )
}

export default Flights;


export async function getStaticProps(context: any) {
    const getdata = await GetAvailability(
        {
            adult: 1,
            child: 0,
            departureCode: "AWZ",
            departureTime: "2024-03-11",
            infant: 0,
            returnCode: "THR"
        }
    )

    const data = getdata?.data
    const FlightsData = await GetFlights(data.result)

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
                FlightsData: FlightsData?.data.result?.departureFlights || null
            },

        }
    )

}