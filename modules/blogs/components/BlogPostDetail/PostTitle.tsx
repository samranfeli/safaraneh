import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TitlePost: NextPage<any> = ({ BlogPost }) => {
    
    return (
        <div className="pl-14 pr-14  max-xl:pl-6 max-xl:pr-6 max-sm:p-2">
        <div className="overflow-hidden rounded-md flex items-center relative h-550 max-lg:h-full max-lg:mt-5">
                <div className="text-center absolute z-20 w-full p-4">
                    <Link href={`/blog/category/${BlogPost?.[0].categories[0]}`}
                        className="bg-white text-sm text-red-600 p-3 max-sm:p-1 rounded-2xl hover:text-white hover:bg-red-600 translation-all duration-300">
                    {BlogPost?.[0].categories_names[0]}</Link>
                    <p
                        className="font-bold text-4xl max-sm:text-2xl text-white mt-8 leading-9 text-center">
                        {BlogPost?.[0].title.rendered}
                    </p>
                </div>
                <div className="w-full h-full absolute z-10 bg-black/40 bottom-0"></div>
                <Image
                    src={BlogPost?.[0].images.large} alt={BlogPost?.[0].title.rendered}
                    width={400} height={250} className="w-full"/>
        </div>
            <div className="w-full flex justify-center max-sm:w-fit text-center"> 
                <div
                    className="bg-white shadow-2xl max-sm:shadow-none flex p-4 max-sm:pr-1 relative bottom-6
                     max-sm:-bottom-2 rounded-2xl text-sm justify-between w-72 max-sm:w-full text-gray-500 z-20">
                    <p>{BlogPost?.[0].date}</p>
                    <p className="text-4xl font-bold max-sm:ml-6 max-sm:mr-6">.</p>
                    <p>{BlogPost?.[0].time_read}</p>
                </div>
            </div>
        </div>
    )
}

export default TitlePost;