import { NextPage } from "next";
import Image from "next/image";
import { AirportDetailType } from "../types/cip";
import Link from "next/link";
import { ArrowLeft, DownCaret } from "@/modules/shared/components/ui/icons";


const CipItem: NextPage<any> = ({ AirportsDetail, AirportsList }) => {
    const Airports: AirportDetailType[] = AirportsDetail || null
    
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
                            <p className="text-2xs text-gray-400">{airport.address}</p>
                            <div className="text-xs max-sm:text-2xs h-28 mt-2 text-gray-700 overflow-hidden relative">
                                {
                                    <p>{airport.description}</p>
                                }
                                <span className="w-full h-12 absolute bottom-0 opacity-50"
                                style={{backgroundImage: 'linear-gradient(rgba(250,250,250,0.5), rgba(250,250,250,05))'}}></span>
                            </div>
                            <div className="flex justify-between mt-2 max-sm:mt-5">
                                {
                                    AirportsList.AirPorts[index].Price ?
                                        <div>
                                            <p className="max-sm:text-sm">{AirportsList.AirPorts[index].Price} ریال</p>
                                            <p className="text-2xs text-gray-400 relative bottom-2">شروع قیمت</p>
                                        </div> :
                                        <p className="max-sm:text-xs text-gray-400">قیمت موجود نیست</p>
                                }
                                <Link href={airport.url}
                                    className="bg-blue-700 max-md:text-sm rounded-md flex h-fit relative
                                     text-white p-2 max-sm:p-1 pl-12 pr-12 whitespace-nowrap max-sm:pl-4 max-sm:pr-4 hover:bg-blue-600 duration-300">
                                    <p>مشاهده جزییات رزرو</p>
                                    <DownCaret className="w-5 rotate-90 ltr:rotate-45 absolute left-1 top-3 max-sm:static" />
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