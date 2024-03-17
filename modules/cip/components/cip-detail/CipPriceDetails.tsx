import Accordion from "@/modules/shared/components/ui/Accordion"
import { numberWithCommas } from "@/modules/shared/helpers"
import { CipAvailabilityItemType, CipFormCompanionItemType, CipFormPassengerItemType, CipPassengerType, CipValidateResponseType } from "../../types/cip";

type Props = {
    discountResponse?: any;
    passengers: CipFormPassengerItemType[];
    companions: CipFormCompanionItemType[];
    passengerServicesArray: CipAvailabilityItemType['passengerTypeServices'];
    validateResponse?: CipValidateResponseType;
    selectedTransport: { count: number, salePrice: number }[];
    selectedServicesArray?: CipValidateResponseType['optionalServices'];
    activeServices: number[];
}

const CipPriceDetails: React.FC<Props> = props => {


    const { discountResponse } = props;

    const getServiceObject = (passengerType: CipPassengerType, serviceId: number) => props.passengerServicesArray?.find(item => item.passengerType === passengerType)?.services?.find(item => item.id === serviceId);
    const getPersonPrice = (passengerType: CipPassengerType) => props.validateResponse?.rate?.passengers?.find(item => item.passengerType === passengerType);


    //passengers
    const passengersArray = props.passengers.map(item => {
        const servicesObj = item.services?.map(serviceItemId => getServiceObject(item.type, serviceItemId));
        const servicesNames = servicesObj?.map(serviceItem => serviceItem?.name);
        const servicesPrice = servicesObj?.reduce((total, serviceItem) => total + (serviceItem?.salePrice || 0), 0) || 0;
        const typePrice = getPersonPrice(item.type)?.salePrice || 0;
        return ({
            services: servicesNames,
            passengerTotalPrice: typePrice + servicesPrice
        });
    })
    const passengersTotalPrice = passengersArray.reduce((total, item) => total + item.passengerTotalPrice, 0);

    //accompanying
    const accompanyingArray = props.companions.map(item => {
        const servicesObj = item.services?.map(serviceItemId => getServiceObject("Accompanying", serviceItemId));
        const servicesNames = servicesObj?.map(serviceItem => serviceItem?.name);
        const servicesPrice = servicesObj?.reduce((total, serviceItem) => total + (serviceItem?.salePrice || 0), 0) || 0;
        const typePrice = getPersonPrice("Accompanying")?.salePrice || 0;
        return ({
            services: servicesNames,
            accompanyingTotalPrice: typePrice + servicesPrice
        });
    })
    const accompanyingsTotalPrice = accompanyingArray.reduce((total, item) => total + item.accompanyingTotalPrice, 0);


    //transports
    const transports = props.selectedTransport?.filter(item => item.count > 0);
    const transportsTotalPrice = transports.reduce((total, item) => total + (item.salePrice * item.count), 0)


    //extra services
    let extraServices;
    let extraServicesTotalPrice = 0;
    if (props.selectedServicesArray && props.activeServices) {
        extraServices = props.selectedServicesArray?.filter(item => props.activeServices.includes(item.id)).map(serviceItem => {
            const amount = (serviceItem.salePrice * (serviceItem.type === "Pet" ? serviceItem.count : 1))
                +
                ((serviceItem.type === "Conference" || serviceItem.type === "MeetingRoom") ? ((serviceItem.extraCount || 0) * (serviceItem.extraSalePrice || 0) + (serviceItem.hourCount || 0) * (serviceItem.hourSalePrice || 0)) : 0);

            return ({
                ...serviceItem,
                calculatedPrice: amount
            })
        });
        if (extraServices?.length) {
            extraServicesTotalPrice = extraServices.reduce((total, item) => total + item.calculatedPrice, 0);
        }
    }


    const totalPrice = passengersTotalPrice + accompanyingsTotalPrice + transportsTotalPrice + extraServicesTotalPrice;




    return (
        <div className='py-2 md:py-5'>
            <strong className="block font-semibold text-lg mb-5"> محاسبه هزینه </strong>

            <div className='bg-white inserted-content rounded-lg border border-neutral-300 p-5 md:p-8 text-base leading-8 pb-2 sm:pb-5'>
                <Accordion
                    title={(
                        <div className="flex justify between">
                            <span>مسافر  ({passengersArray.length} نفر)</span>
                            <b>{numberWithCommas(passengersTotalPrice)} ریال</b>
                        </div>
                    )}
                    content={(
                        <>
                            {passengersArray.map((passengerItem, index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            مسافر {index + 1}
                                            {passengerItem.services.length > 0 && (
                                                <span className='rtl:mt-2 ltr:ml-2'> ({passengerItem.services.join(" , ")}) </span>
                                            )}
                                        </div>

                                        <div>{numberWithCommas(passengerItem.passengerTotalPrice)} ریال</div>
                                    </div>
                                )
                            })}
                        </>
                    )}
                />

            </div>

        </div>)
}

export default CipPriceDetails;