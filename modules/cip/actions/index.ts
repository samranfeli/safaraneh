import { Cip, ServerAddress } from "@/enum/url";
import axios from "axios";

export const GetAirportsDetail = async () => {
    try {
        const res = await axios.get('https://cip.safaraneh.com/api/services/app/Airport/GetAll')
        return res
    } catch (error : any) {
        console.log(error);
    }
}

export const GetAirportList = async () => {
    try {
        const res = await axios.get('https://api.safaraneh.com/v2/Cip/GetCipAirPortList')
        return res
    } catch (error) {
        console.log(error);
    }
}

export const getAirportByUrl = async (url :string , acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Cip}${Cip.GetAirportByUrl}?Url=${url}`,
            {
                headers: {
                    Accept: 'application/json;charset=UTF-8',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    "Accept-Language": acceptLanguage,
                    Tenantid: process.env.PROJECT_SERVER_TENANTID
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}
