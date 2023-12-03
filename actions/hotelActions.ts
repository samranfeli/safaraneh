import axios from 'axios';

import { Header } from "../enum/url";

export const getDomesticHotelDetailById = async (id: number, acceptLanguage: string = 'fa-IR') => {
    try {
        const response = await axios({
            method: "get",
            url: `https://api.safaraneh.com/v2/Hotel/GetHotelById?hotelId=${id}`,
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage
            }
        });
        return (response)
    } catch (error: any) {
        return error
    }
}

export const getDomesticHotelDetailByUrl = async (url: string, acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.get(
            `https://api.safaraneh.com/v2/Hotel/GetHotelByUrl?url=${url}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage,
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const getScore = async (hotelId: number, acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.get(
            `https://api.safaraneh.com/v2/Comment/GetScore?pageId=${hotelId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage,
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}

export const getAccommodationById = async (hotelId: number, acceptLanguage: string = 'fa-IR') => {
    try {
        let response = await axios.get(
            `https://hoteldomesticdata.safaraneh.com/api/services/app/Accommodation/Get?Id=${hotelId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    apikey: process.env.PROJECT_SERVER_APIKEY,
                    'Accept-Language': acceptLanguage
                },
            },
        )
        return response
    } catch (error) {
        return error
    }
}
