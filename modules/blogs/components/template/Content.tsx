import { NextPage } from "next";
import BlogItem from "../template/BlogItem";
import Sidebar from "../template/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AllData } from "@/pages/blog/blog-list";
import { BlogItemType, CategoriesNameType } from "../../types/blog";
import { useRouter } from "next/router";

interface Props {
    Blogs?: any,
    LastBlogs?: BlogItemType[],
    CategoriesName?: CategoriesNameType[]
}


const Content: NextPage<Props> = ({Blogs,LastBlogs,CategoriesName}) => {

    let listPage :any = []
    useEffect(() => {
        //This is for: how many page we need
            const pages : number = Math.ceil(Blogs?.length / 10)
            for (let i = 1; i <= pages; i++) {
                listPage.push(i)
                setpageNumber(listPage)
            }

    }, [])
    
    const pageclick = (item: number) => {
        if(item == 1) setlist([item - 1 , item + 9])
        else setlist([item * 10 - 10 , item * 10 ])
    }

    const [pageNumber, setpageNumber] = useState<any>([])
    const [list, setlist] = useState<[number , number]>([0 , 10])
    return (
        <div className="grid grid-cols-8 gap-5 max-w-container m-auto p-5 max-sm:p-2 max-lg:grid-cols-1">
            <div className="col-span-6">
                {
                    Blogs &&
                    Blogs?.slice(list[0] , list[1]).map((blog : any ) => <BlogItem data={blog} key={blog.id} />)
                }
                    <ul className="flex justify-center rounded mt-4 max-sm:m-4" style={{border:'solid 1px rgba(0,0,0,.2)'}}>
                    {
                        pageNumber.map((item: any) => <li key={item} onClick={e => pageclick(item)}
                            className={`p-2 max-sm:p-0 w-10 text-center rounded-3xl m-3 max-sm:m-2 cursor-pointer translation-all duration-300
                            ${item == list[1] / 10 ? 'bg-blue-700 text-white hover:bg-blue-400' : 'hover:bg-gray-200'}`}>
                        {item}
                        </li>)
                    }
                    </ul>
            </div>
            <div className="col-span-2 max-lg:col-span-6" >
                <Sidebar recentBlogs={LastBlogs} CategoriesNames={CategoriesName}
                    SearchItem={useRouter().asPath == "/blog/blog-list" || useRouter().query.search ? true : false} />
            </div>
        </div>
    )
}

export default Content;
