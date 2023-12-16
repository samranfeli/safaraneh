import axios from 'axios';

import { Header,ServerAddress, Hotel } from "../../../enum/url";

export const getpageByUrl = async (url: string, acceptLanguage: string = "fa-IR") => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Hotel_Main}${Hotel.GetPageByUrl}?url=${url}&isNewVisitor=true`,
            {
                headers: {
                    ...Header,
                    "Accept-Language": acceptLanguage,
                    "Apikey": process.env.PROJECT_SERVER_APIKEY
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}