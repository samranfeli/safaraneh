import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarBlog: NextPage<any> = ({data , category}) => {
    
    console.log(useRouter());
    return (
        <div className={`w-full flex max-w-screen-xl ml-auto mr-auto text-xs space-x-1 pr-14 max-md:pr-4`}>
            <Link href='/' className={`${data && 'text-gray-400'}`}>
                Home
            </Link>
            <Link href='/blog' className={`${data && 'text-gray-400'}`}>
                بلاگ
            </Link>
            {
                category && <Link className="text-gray-400" href={`/blog/category/${category[1]}`}>{category[0]}</Link>
            }
            {
                data && <p>{data}</p>
            }
        </div>
    )
}

export default NavbarBlog;