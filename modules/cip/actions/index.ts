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