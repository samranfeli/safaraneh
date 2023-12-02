import axios from 'axios';

import { Header } from "../enum/url";

export const getPortal = async (acceptLanguage: string = "fa-IR") => {

    try {
        const response = await axios({
            method: "get",
            url: "https://api.safaraneh.com/v2/Portal/GetPortal",
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage,
                "Apikey": process.env.PROJECT_SERVER_APIKEY
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}
