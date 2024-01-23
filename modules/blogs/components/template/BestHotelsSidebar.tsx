import { Star } from "@/modules/shared/components/ui/icons";
import { NextPage } from "next";
import Image from "next/image";

const rateHotel = [0,1,2,3,4]
const BestHotels: NextPage = () => {
    return (
        <div className="grid max-lg:grid-cols-3 max-md:grid-cols-1 space-y-5">
                <div className="relative max-lg:mt-5 max-lg:m-1">
                <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={150} width={400} className="rounded w-full" />
                <div className="text-xs absolute bottom-1/4 right-10 left-10  bg-white rounded text-center opacity-70 max-sm:opacity-100 hover:opacity-100 translation-all duration-300">
                    <p className="whitespace-nowrap">هتل پارسیان آزادی تهران</p>
                    <div className="flex justify-center">{rateHotel.map(item => <Star className="w-4" key={item}/>)}</div>
                </div>
                </div>
                <div className="relative max-lg:m-1">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-esteghlal-thumb.jpg' alt='pic' height={150} width={400} className="rounded w-full" />
                    <div className="text-xs absolute bottom-1/4 right-10 left-10 bg-white rounded text-center opacity-70 max-sm:opacity-100 hover:opacity-100 translation-all duration-300">
                    <p className="whitespace-nowrap">هتل پارسیان استقلال تهران</p>
                    <div className="flex justify-center">{rateHotel.map(item => <Star className="w-4" key={item}/>)}</div>
                </div>
                </div>
                <div className="relative max-lg:m-1">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-enghelab-thumb.jpg' alt='pic' height={150} width={400} className="rounded w-full" />
                    <div className="text-xs absolute bottom-1/4 right-10 left-10 bg-white rounded text-center opacity-70 max-sm:opacity-100 hover:opacity-100 translation-all duration-300">
                    <p className="whitespace-nowrap">هتل پارسیان انقلاب تهران</p>
                    <div className="flex justify-center">{rateHotel.slice(0,4).map(item => <Star className="w-4" key={item}/>)}</div>
                </div>
                </div>
        </div>
    )
}

export default BestHotels;