import { NextPage } from "next";
import Image from "next/image";
import { AirportDetailType } from "../types/cip";
import Link from "next/link";
import { DownCaret, Location } from "@/modules/shared/components/ui/icons";
import parse from 'html-react-parser';


const CipItem: NextPage<any> = ({ AirportsAllData}) => {
    const Airports: AirportDetailType[] = AirportsAllData || null
    
    return (
        <div>
            <h2 className="mt-16 text-3xl">رزرو تشریفات فرودگاهی CIP</h2>
            {
                Airports && 
                Airports.map((airport: AirportDetailType , index) => 
                    <div className="grid grid-cols-3 max-sm:grid-cols-1 w-full mt-8 rounded-md overflow-hidden shadow-md" key={index}>
                        <Link href={airport.url}>
                            <Image src={airport.picture.path || ''} alt={airport.picture.altAttribute || airport.nameLong || 'cip-picture'} width={400} height={100}
                                className="w-full h-full object-cover"
                                priority={!index}
                                onContextMenu={e => e.preventDefault()}
                            />
                        </Link>
                        <div className="w-full bg-white col-span-2 p-5 pt-3 pb-2 max-sm:p-3">
                            <Link href={airport.url} className="font-bold">{airport.name}</Link>
                            <div className="flex gap-1">
                                <Location className="w-4 fill-gray-400" />
                                <p className="text-2xs text-gray-400">{airport.address}</p>
                            </div>
                            <div className="text-xs max-sm:text-2xs h-28 mt-2 text-gray-700 overflow-hidden relative">
                                {
                                    parse(airport.description || '')
                                }
                                <span className="h-18 w-full absolute bottom-0 left-0 right-0 z-20"
                                style={{background: "linear-gradient(0, #fff, transparent)"}}></span>
                            </div>
                            <div className="flex justify-between mt-2 max-sm:mt-5">
                                {
                                    airport.Price ?
                                        <div>
                                            <p className="max-sm:text-sm">{airport.Price.toLocaleString()} ریال</p>
                                            <p className="text-2xs max-sm:text-4xs text-gray-400 relative bottom-2">شروع قیمت</p>
                                        </div> :
                                        <p className="max-sm:text-xs text-gray-400">قیمت موجود نیست</p>
                                }
                                <Link href={airport.url}
                                    className="bg-blue-700 max-md:text-sm rounded-md flex h-fit relative
                                     text-white p-2 max-sm:p-1 pl-12 pr-12 whitespace-nowrap max-sm:pl-4 max-sm:pr-4 hover:bg-blue-600 duration-300">
                                    <p>مشاهده جزییات رزرو</p>
                                    <DownCaret className="w-5 rotate-90 ltr:rotate-45 absolute left-1 top-3 max-sm:static fill-white" />
                                </Link>
                            </div>    
                        </div>
                </div>
                )
            }
        </div>
    )
}

export default CipItem;