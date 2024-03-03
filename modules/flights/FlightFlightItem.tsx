import Image from "next/image";
import { ArrowLeft, RightCaret } from "../shared/components/ui/icons";

const FlightsFlightItem: React.FC = () => {
    return (
        <>
            <div className="shadow flex mt-10 ">
            <div className="w-4/5 border-e-2 border-gray-300 border-dashed relative">
            <span className="w-7 h-7 bg-slate-100 rounded-full absolute -left-4 -top-2"></span>    
            <div className="flex bg-white justify-between items-center p-8 pt-7 pb-7 max-sm:p-3 max-sm:grid max-sm:grid-cols-3 max-sm:gap-2 max-sm:justify-items-center">
                <div className="flex text-3xs max-sm:text-4xs leading-5 max-sm:col-span-3 max-sm:justify-self-start">
                    <Image src="https://cdn2.safaraneh.com/images/flights/i3.png" alt="pic" width={50} height={30} className="w-12 h-12 max-sm:w-8 max-sm:h-8" />
                    <span>
                        آتا <br/>
                        Boeing MD
                    </span>
                </div>

                <p className="text-lg font-bold">
                    اهواز <br />
                    11:40
                </p>
                <div className="text-center max-sm:hidden">
                    <p className="text-xs text-gray-400">یکشنبه 13 اسفند</p>
                    <ArrowLeft className="w-4 fill-gray-400 mx-auto mt-2 mb-2" />
                    <span className="pl-4 p-1 pr-4 text-gray-400 text-2xs shadow-md">چارتری</span>
                </div>
                <ArrowLeft className="w-4 fill-gray-400 m-auto hidden max-sm:inline" />        
                <p className="text-lg font-bold">
                    تهران <br />
                    12:40
                </p>
                <span className="w-7 h-7 bg-slate-100 rounded-full absolute -left-4 -bottom-2"></span>           
            </div>
                  
                <div className="justify-center text-xs bg-gray-100 text-gray-500 flex p-1">
                    جزییات پرواز
                    <span><RightCaret className="w-5 mt-1 rotate-90 fill-gray-500" /></span>
                </div>
                </div>

                <div className="grid grid-cols-1 place-content-center text-left pl-3 pr-3 bg-white w-1/5 max-sm:w-2/5">
                    <p className="text-xl max-lg:text-lg max-sm:text-base font-bold leading-5">
                    <span className="text-2xs font-bold block">ریال</span>
                        18,510,871
                    </p>
                    <button type="submit" className="flex w-11/12 justify-center place-self-end bg-blue-800 hover:bg-blue-600 max-md:text-xs
                     duration-200 text-white p-1 font-semibold max-md:pr-2 max-md:pl-2 rounded-md text-sm mt-2 whitespace-nowrap">
                        انتخاب پرواز
                        <RightCaret className="w-5 fill-white my-auto rtl:rotate-180 max-sm:hidden " />
                    </button>
                    <p className="text-3xs text-red-600">5 صندلی باقیمانده</p>
                </div>
            </div>
        </>
    )
}

export default FlightsFlightItem;