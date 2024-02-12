import { Home } from "@/modules/shared/components/ui/icons";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const BreadCrumpt: NextPage<any> = ({data , category , page}) => {
    
    return (
        <div
            className={`w-full select-none pt-3 pb-2 flex flex-wrap max-w-container ml-auto mr-auto text-xs max-sm:text-3xs space-x-2 rtl:pr-5 ltr:pl-5 rtl:max-sm:pr-3 `}>
            <Link href='/'>
                <Home className="w-5 opacity-30 hover:opacity-100 translation-all duration-300"/>
            </Link><p className="text-gray-400">/</p>
            <Link href={page == "بلاگ" ? '/blog' : useRouter().query} className={`${data && 'text-gray-400'} hover:text-black translation-all duration-300`}>
                {page}
            </Link><p className={`text-gray-400 ${!data && 'hidden'}`}>/</p>
            {
                category &&
                <Link className={`text-gray-400 ${!data && 'hidden'} hover:text-black translation-all duration-300`} href={`/blog/category/${category[1]}`}>{category[0]}</Link>
            }{category && <p className="text-gray-400">/</p>}
            {
                data && <p>{data}</p>
            }
        </div>
    )
}

export default BreadCrumpt;