import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Search } from "@/modules/shared/components/ui/icons";

const SidebarSearchBlog: NextPage = () => {
    const [search, setsearch] = useState(useRouter().query.search) || useState<string>('')
    
    return (
        <div>
            <div className="mt-3 border-b-4 border-blue-800">
                <h2 className="inline bg-blue-800 rounded text-white p-2 text-xs">جستجو</h2>
            </div>
            <div>
                <form className="flex mt-5">
                <input type="text" className="p-1 rounded w-full  outline-none focus:ring-1" value={search} onChange={e => setsearch(e.target.value)}
                placeholder="جستجوی مطلب..." style={{ border: '1px solid rgba(0,0,0,0.3)' }} />
                <Link href={search?.length ? `/blog/blog-search/${search}` : `${useRouter().asPath}`}>
                    <Search className="w-10 rtl:mr-2 ltr:ml-2 p-2 bg-blue-300 rounded"/>
                </Link>
                </form>    
            </div>    
        </div>
    )
}

export default SidebarSearchBlog;