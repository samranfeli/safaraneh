import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TitlePost: NextPage<any> = ({ BlogPost }) => {
    
    return (
        <div className="pl-14 pr-14 max-md:p-4">
        <div className="overflow-hidden rounded-md w-full bg-cover bg-center bg-no-repeat p-52 max-xl:44 max-lg:p-32 max-md:p-20 h-auto "
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.6)),url(${BlogPost?.[0].images.large})`}}>
                <div className="text-center relative top-1/2 max-sm:top-1">
                    <Link href={`/blog/category/${BlogPost?.[0].categories[0]}`}
                        className="bg-white text-sm text-red-600 p-3 rounded-2xl hover:text-white hover:bg-red-600 translation-all duration-300">
                    {BlogPost?.[0].categories_names[0]}</Link>
                <p className="font-bold text-4xl max-md:text-sm text-white mt-8 leading-9 ">{BlogPost?.[0].title.rendered}</p>
                </div>
        </div>
            <div className="w-full flex justify-center text-center">
                <div className="bg-white shadow-2xl flex p-4 relative bottom-6 rounded-2xl text-sm justify-between w-72 text-gray-500">
                    <p>{BlogPost?.[0].date}</p>
                    <p className="text-4xl font-bold">.</p>
                    <p>{BlogPost?.[0].time_read}</p>
                </div>
            </div>    
        </div>    
    )
}

export default TitlePost;