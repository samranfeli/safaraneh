import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarBlog: NextPage<any> = ({data , category}) => {
    
    return (
        <div className={`w-full flex max-w-screen-xl ml-auto mr-auto text-xs space-x-3 rtl:pr-14 rtl:max-md:pr-4 ltr:pl-14 ltr:max-md:pl-4`}>
            <Link href='/' className={`${data && 'text-gray-400'}`}>
                Home
            </Link><p>/</p>
            <Link href='/blog' className={`${data && 'text-gray-400'}`}>
                بلاگ
            </Link><p>/</p>
            {
                category && <Link className="text-gray-400" href={`/blog/category/${category[1]}`}>{category[0]}</Link>
            }{category && <p>/</p>}
            {
                data && <p>{data}</p>
            }
        </div>
    )
}

export default NavbarBlog;