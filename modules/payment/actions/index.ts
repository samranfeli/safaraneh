import axios from 'axios';
import { Header, ServerAddress, Payment } from "../../../enum/url";

type DiscountType = "Undefined"| "HotelDomestic"| "FlightDomestic"| "Bus"| "Package"| "Flight"| "Hotel"| "PnrOutside"| "Cip"| "Activity";

export const validateDiscountCode = async (params:{prereserveKey:string, type:DiscountType, discountPromoCode:string}, acceptLanguage: string = 'fa-IR') => {
    try {
        const response = await axios({
            method: "post",
            data: {
                preReserve: params.prereserveKey,
                type: params.type,
                promoCode: params.discountPromoCode,
            },
            url: `${ServerAddress.Type}${ServerAddress.Crm}${Payment.ValidateDiscountCode}`,
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage,
                //Currency: "IRR",
                TenantId: process.env.PROJECT_SERVER_TENANTID,
            }
        });
        return (response)
    } catch (error: any) {
        return error.response
    }
}

export const registerDiscountCode = async (params:{reserveId:string, username:unknown, discountPromoCode:string}, acceptLanguage: string = 'fa-IR') => {
    try {
        const response = await axios({
            method: "post",
            data: {
           reserveId: params.reserveId,
           username: params.username,
           promoCode: params.discountPromoCode,
            },
            url: `${ServerAddress.Type}${ServerAddress.Crm}${Payment.RegisterDiscountCode}`,
            headers: {
                ...Header,
                "Accept-Language": acceptLanguage,
                //Currency: "IRR",
                TenantId: process.env.PROJECT_SERVER_TENANTID,
            }
        });
        return (response)
    } catch (error: any) {
        return error.response
    }
}

