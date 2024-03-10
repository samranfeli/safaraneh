import Image from "next/image";
import { ArrowLeft, RightCaret } from "../../shared/components/ui/icons";
import { FlightType } from "../types/flights";

const FlightsFlightItem: React.FC<any> = ({ flightData } : {flightData : FlightType}) => {
    
    
    const arrivalTime = flightData?.arrivalTime?.split('T')[1].split(":").slice(0,2).join(":")
    const departureTime = flightData?.departureTime?.split('T')[1].split(":").slice(0,2).join(":")
    return (
        <>
            <div className="flex mt-6 border-1 shadow-sm border-gray-200">
            <div className="w-4/5 border-e-2 border-gray-300 border-dashed relative">
            <span className="w-6 h-6 bg-slate-100 rounded-full absolute -left-3 -top-2"></span>    
            <div className="flex bg-white justify-between items-center p-8 pt-6 pb-6 max-sm:p-3 max-sm:grid max-sm:grid-cols-3 max-sm:gap-2 max-sm:justify-items-center">
                <div className="flex text-3xs max-sm:text-4xs leading-5 max-sm:col-span-3 max-sm:justify-self-start">
                    <Image src={flightData?.airline?.picture?.path || ''}
                        alt={flightData?.airline?.picture?.altAttribute || ''}
                        width={50} height={30} className={`w-12 h-12 max-sm:w-8 max-sm:h-8 ${!flightData?.capacity ? 'grayscale' : ''}`} />
                    <span className="mr-1 ml-1">
                        {flightData?.airline?.name} <br/>
                        {flightData?.airCraft.name}
                    </span>
                </div>

                <p className="text-lg font-bold text-center">
                    {flightData?.departureAirport?.city?.name} <br />
                    {departureTime}
                </p>
                <div className="text-center max-sm:hidden">
                    <p className="text-xs text-gray-400">یکشنبه 13 اسفند</p>
                    <ArrowLeft className="w-4 fill-gray-400 mx-auto mt-2 mb-2 ltr:rotate-180" />
                    <span className="pl-2 pr-2 text-gray-400 border-1 border-gray-200 text-2xs ">
                        {
                             flightData?.flightType == 'System' ? 'سیستمی' :'چارتری'
                        }            
                    </span>
                </div>
                <ArrowLeft className="w-4 fill-gray-400 m-auto hidden max-sm:inline ltr:rotate-180" />        
                <p className="text-lg font-bold text-center">
                    {flightData.arrivalAirport?.city?.name} <br />
                    {arrivalTime}
                </p>
                <span className="w-6 h-6 bg-slate-100 rounded-full absolute -left-3 -bottom-2"></span>           
            </div>
                  
                  
                    
                <div className="justify-center text-xs bg-gray-100 text-gray-500 flex ">
                    جزییات پرواز
                    <span><RightCaret className="w-5 mt-1 rotate-90 fill-gray-500" /></span>
                </div>
                </div>

                <div className="grid grid-cols-1 place-content-center text-left pr-3 pl-3 bg-white w-1/5 max-sm:w-2/5">
                    {
                        flightData?.capacity ? 
                        <p className="text-xl max-lg:text-lg max-sm:text-base font-bold leading-5">
                        <span className="text-2xs font-bold block">ریال</span>
                            {flightData?.adultPrice}
                        </p> :
                        <p className="text-xs max-md:text-2xs font-semibold text-gray-400">ظرفیت تکمیل است</p>
                    }
                    {
                        flightData?.capacity ?
                            <button type="submit" className={`flex w-11/12 justify-center place-self-end bg-blue-800
                        duration-200 text-white p-1 font-semibold max-md:pr-2 max-md:pl-2 rounded-lg text-sm mt-2 whitespace-nowrap  hover:bg-blue-600 max-md:text-xs`}>
                                انتخاب پرواز
                                <RightCaret className="w-5 fill-white my-auto rtl:rotate-180 max-sm:hidden " />
                            </button> :
                            <button type="submit" className={`flex w-11/12 justify-center place-self-end bg-gray-400 cursor-not-allowed
                        duration-200 text-white p-1 font-semibold max-md:pr-2 max-md:pl-2 rounded-lg text-sm mt-2 whitespace-nowrap`}>
                                انتخاب پرواز
                                <RightCaret className="w-5 fill-white my-auto rtl:rotate-180 max-sm:hidden " />
                            </button>
                    }
                    {
                        flightData?.capacity < 5 && flightData?.capacity !== 0 &&
                        <p className="text-3xs text-red-600">{flightData.capacity} صندلی باقیمانده</p>
                    }
                </div>
            </div>
        </>
    )
}

export default FlightsFlightItem;