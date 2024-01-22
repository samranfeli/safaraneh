import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarBlog: NextPage<any> = ({data , category}) => {
    
    return (
        <div
            className={`w-full flex max-w-screen-xl ml-auto mr-auto text-xs space-x-2 rtl:pr-14 rtl:max-xl:pr-6 ltr:pl-14 ltr:max-xl:pl-6 rtl:max-sm:pr-2 ltr:max-sm:pl-2`}>
            <Link href='/' className={`${data && 'text-gray-400'}`}>
                Home
            </Link><p className="text-gray-400">/</p>
            <Link href='/blog' className={`${data && 'text-gray-400'}`}>
                بلاگ
            </Link><p className="text-gray-400">/</p>
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