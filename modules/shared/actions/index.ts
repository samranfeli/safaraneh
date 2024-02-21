import axios from 'axios';

import { Header,ServerAddress, Hotel , Reserve} from "../../../enum/url";

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

export const getReserveFromCoordinator = async (params:{reserveId:string, username:string}, acceptLanguage: string = "fa-IR") => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Coordinator}${Reserve.GetReserveFromCoordinator}?Id=${params.reserveId}&Username=${params.username}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'text/plain',
                    "Accept-Language": acceptLanguage,                   
                    "TenantId": process.env.PROJECT_SERVER_TENANTID
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const getUserAllReserves = async (params:{SkipCount?:number;MaxResultCount?:number;Statue?:string;}, token: string, acceptLanguage: string = "fa-IR") => {
    try {
        let response = await axios.get(
            `${ServerAddress.Type}${ServerAddress.Coordinator}${Reserve.GetUserAllReserves}`,
            {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'text/plain',
                    "Accept-Language": acceptLanguage,                   
                    "TenantId": process.env.PROJECT_SERVER_TENANTID,
                    Authorization: `Bearer ${token}`
                }
            },
        )
        return response
    } catch (error) {
        return error
    }
}