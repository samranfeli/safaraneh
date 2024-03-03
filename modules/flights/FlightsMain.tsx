import FlightSearchData from "./FlightSearchData";
import FlightFilters from "./FlightsFilters";

const FlightsMain: React.FC = () => {
    return (
        <div className="w-3/4 max-lg:w-full">
            <FlightSearchData />
            <FlightFilters />
        </div>
    )
}

export default FlightsMain;