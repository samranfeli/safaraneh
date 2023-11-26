import axios from 'axios';

import {Header} from "../enum/url";

export const getHotelDetail = async (id:number, acceptLanguage:string = 'fa-IR') => {
    try{
        const response = await axios({
            method: "get",
            url: `https://api.safaraneh.com/v2/Hotel/GetHotelById?hotelId=${id}`,
            headers:{
                ...Header,
                "Accept-Language" : acceptLanguage
            }
        });
        return (response)
    }catch (error:any){
        return error
    }
}