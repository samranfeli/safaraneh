import { Home } from "@/modules/shared/components/ui/icons";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarBlog: NextPage<any> = ({data , category}) => {
    
    return (
        <div
            className={`w-full flex max-w-container ml-auto mr-auto text-xs space-x-2 rtl:pr-5 ltr:pl-5 rtl:max-sm:pr-3 `}>
            <Link href='/'>
                <Home className="w-5 opacity-30"/>
            </Link><p className="text-gray-400">/</p>
            <Link href='/blog' className={`${data && 'text-gray-400'}`}>
                بلاگ
            </Link><p className={`text-gray-400 ${!data && 'hidden'}`}>/</p>
            {
                category && <Link className="text-gray-400" href={`/blog/category/${category[1]}`}>{category[0]}</Link>
            }{category && <p className="text-gray-400">/</p>}
            {
                data && <p>{data}</p>
            }
        </div>
    )
}

export default NavbarBlog;