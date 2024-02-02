import { Identity, ServerAddress, Header } from "@/enum/url"
import axios from "axios"

export const sendOtp = async (param: any, acceptLanguage: string = 'fa-IR') => {

    try {
        let response = await axios.post(
            `${ServerAddress.Type}${ServerAddress.Identity}${Identity.SendOTP}`,
            param,
            {
                headers: {
                    ...Header,
                    "Accept-Language": acceptLanguage,
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}
