import { ArrowLeft } from "../shared/components/ui/icons";

const FlightSearchData: React.FC = () => {
    return (
        <div className="flex flex-wrap h-fit relative gap-10 max-md:gap-5 max-sm:gap-4 cursor-pointer
            max-sm:justify-around max-sm:border-2 max-sm:border-gray-200 max-sm:p-3 rounded">
                
                    <div>
                        <p className="text-sm max-md:text-2xs">SYZ</p>
                        <p className="text-gray-500 text-sm max-lg:text-xs max-md:text-3xs">شیراز</p>
                    </div>
                    <ArrowLeft className="w-5 max-sm:w-4 fill-gray-400" />
                    <div>
                        <p className="text-sm max-md:text-2xs">AWZ</p>
                        <p className="text-gray-500 text-sm max-lg:text-xs max-md:text-3xs">اهواز</p>
                    </div>

                    <span className="border-e-2 border-gray-200 h-14 max-sm:hidden"></span>
            
                    <div>
                        <p className="text-xs max-lg:text-4xs text-gray-400">تاریخ رفت</p>
                        <p className="text-sm max-md:text-2xs">یکشنبه 13 اسفند</p>
                    </div>
                    <div>
                        <p className="text-xs max-lg:text-4xs text-gray-400">مسافران</p>
                        <p className="text-sm max-md:text-2xs">1</p>
                    </div>
                    <div>
                        <p className="text-xs max-lg:text-4xs text-gray-400">کابین</p>
                        <p className="text-sm max-md:text-2xs">اکونومی</p>
                    </div>
                
                    <button className="bg-blue-800 text-white text-sm max-md:text-xs rounded-md p-1 pl-2 pr-2 h-fit whitespace-nowrap mt-auto mb-auto
                    absolute left-0 max-sm:sticky max-sm:w-full hover:bg-blue-600 duration-300"
                        type="submit">
                        تغییر جستجو
            </button>
            </div>
    )
}

export default FlightSearchData;