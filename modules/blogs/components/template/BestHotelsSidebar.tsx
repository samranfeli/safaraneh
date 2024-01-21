import { NextPage } from "next";
import Image from "next/image";

const BestHotels: NextPage = () => {
    return (
        <div>
                <div>
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg' alt='pic' height={150} width={400} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100">هتل پارسیان آزادی تهران</p>
                </div>
                <div>
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-esteghlal-thumb.jpg' alt='pic' height={150} width={400} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100"> هتل پارسیان استقلال تهران</p>
                </div>
                <div>
                    <Image src='https://cdn2.safaraneh.com/images/blog/hotel-enghelab-thumb.jpg' alt='pic' height={150} width={400} className="rounded" />
                    <p className="text-xs relative bottom-14 bg-white mr-2 ml-2 rounded text-center opacity-70 hover:opacity-100">هتل پارسیان انقلاب تهران</p>
                </div>
        </div>
    )
}

export default BestHotels;