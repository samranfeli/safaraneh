import Pagination from "@/modules/shared/components/ui/Pagination";
import { PricedHotelItem } from "../../types/hotel";
import HotelListItem from "./HotelListItem";

type Props ={
    hotels: PricedHotelItem[];
}

const HotelsList : React.FC<Props> = props => {

    const { hotels} = props;

    return(
        <>
        
        <Pagination
            onChange={() => {debugger}}
            onChangePerPage={() => {debugger}}
            totalItems={hotels?.length || 0}
        />

          {hotels.slice(0,20).map(hotel => <HotelListItem key={hotel.HotelId} hotel={hotel} />)}            
        
        <Pagination
            onChange={() => {debugger}}
            onChangePerPage={() => {debugger}}
            totalItems={hotels?.length || 0}
        />

        </>
    )
}

export default HotelsList;