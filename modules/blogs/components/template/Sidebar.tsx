import { NextPage } from "next";
import Image from "next/image";
import RecentBlogSidebar from "./RecentBlogSidebar";
import SidebarSearchBlog from "./SidebarSearchBlog";
import Link from "next/link";
import BestHotels from "./BestHotelsSidebar";

const Sidebar: NextPage<any> = ({ recentBlogs, CategoriesNames , SearchItem }) => {
    
    return (
        <div className="sticky top-5 mb-5">
            <div className="border-b-4 border-blue-800">
                <p className="text-white p-2 rounded-md bg-blue-800 inline text-xs">دسته بندی</p>
            </div>
            <div>
                <ul className="divide-y p-1">
                    {
                        CategoriesNames && 
                        CategoriesNames.map((item : any) => 
                            <li key={item.name} className="p-2 text-sm hover:text-blue-800"><Link href={`/blog/category/${item.id}`}>{item.name}</Link></li>
                        )
                    }
                </ul>
            </div>
   
            {
                SearchItem && <SidebarSearchBlog />
            }

            <div className="mt-5">
                <div className=" border-b-4 border-blue-800">
                    <p className="p-2 text-white rounded-md bg-blue-800 inline text-xs">جدیدترین مطالب</p>
                </div>
            <div className="divide-y">
                    {
                        recentBlogs &&
                        recentBlogs.map((blog : any) => <RecentBlogSidebar key={blog.id} data={blog} /> )
                    }
            </div>
            </div>
            

            <div className="p-1 mt-7">
                <div className="border-b-4 border-blue-800">
                    <p className="text-xs bg-blue-800 rounded-md inline text-white p-2">پرطرفدارترین هتل های ایران</p>
                </div>
                <div className="w-full mt-7">
                <BestHotels />
                </div>    
            </div>
        </div>
    )
}

export default Sidebar;