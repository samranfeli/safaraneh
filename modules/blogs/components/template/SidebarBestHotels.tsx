import { Star } from "@/modules/shared/components/ui/icons";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const rateHotel = [0,1,2,3,4]
const BestHotels: NextPage = () => {
    return (
        <div className="grid max-lg:grid-cols-3 max-sm:grid-cols-1 space-y-5 max-lg:space-y-0 max-sm:space-y-5">
                <Link href='/hotel/هتل-پارسیان-آزادی-تهران' className="relative max-lg:ml-2">
                <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={150} width={400} className="rounded w-full" onContextMenu={e => e.preventDefault()}/>
                <div className="text-xs absolute bottom-1/4 right-10 left-10 max-md:left-7 max-md:right-7  bg-white rounded text-center opacity-70 max-sm:opacity-100 hover:opacity-100 duration-300">
                    <p className="whitespace-nowrap">هتل پارسیان آزادی تهران</p>
                    <div className="flex justify-center">{rateHotel.map(item => <Star className="w-4" key={item}/>)}</div>
                </div>
                </Link>
                <Link href='/hotel/هتل-پارسیان-استقلال-تهران' className="relative max-lg:ml-2">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-esteghlal-thumb.jpg' alt='pic' height={150} width={400} className="rounded w-full" onContextMenu={e => e.preventDefault()}/>
                    <div className="text-xs absolute bottom-1/4 right-10 left-10 max-md:left-7 max-md:right-7 bg-white rounded text-center opacity-70 max-sm:opacity-100 hover:opacity-100 duration-300">
                    <p className="whitespace-nowrap">هتل پارسیان استقلال تهران</p>
                    <div className="flex justify-center">{rateHotel.map(item => <Star className="w-4" key={item}/>)}</div>
                </div>
                </Link>
                <Link href='/hotel/هتل-پارسیان-انقلاب-تهران' className="relative  max-lg:ml-2">
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-enghelab-thumb.jpg' alt='pic' height={150} width={400} className="rounded w-full" onContextMenu={e => e.preventDefault()}/>
                    <div className="text-xs absolute bottom-1/4 right-10 left-10 max-md:left-7 max-md:right-7 bg-white rounded text-center opacity-70 max-sm:opacity-100 hover:opacity-100 duration-300">
                    <p className="whitespace-nowrap">هتل پارسیان انقلاب تهران</p>
                    <div className="flex justify-center">{rateHotel.slice(0,4).map(item => <Star className="w-4" key={item}/>)}</div>
                </div>
                </Link>
        </div>
    )
}

export default BestHotels;