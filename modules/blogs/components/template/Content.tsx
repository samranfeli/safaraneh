import { NextPage } from "next";
import BlogItem from "../template/BlogItem";
import Sidebar from "../template/Sidebar";
import { useContext, useEffect, useState } from "react";
import { BlogItemType, CategoriesNameType } from "../../types/blog";
import { useRouter } from "next/router";
import Pagination from "./Pagination";

interface Props {
    Blogs?: any,
    LastBlogs?: BlogItemType[],
    CategoriesName?: CategoriesNameType[],
    blogPages:any
}


const Content: NextPage<Props> = ({Blogs,LastBlogs,CategoriesName,blogPages}) => {
    

    let listPage :any = []
    useEffect(() => {
            for (let i = 1; i <= +blogPages; i++) {
                listPage.push(i)
            }
        setpageNumber(listPage)
        
    }, [blogPages])
    

    const [pageNumber, setpageNumber] = useState<any>([])

    const router = useRouter()
    return (
        <div className="grid grid-cols-8 gap-5 max-w-container m-auto p-5 max-sm:p-2 max-lg:grid-cols-1">
            <div className="col-span-6">
                {
                    Blogs && blogPages ?
                    Blogs?.map((blog : any ) => <BlogItem data={blog} key={blog.id} /> ): <p>loading</p>
                }
                       <Pagination perPage={blogPages} />    
            </div>
            <div className="col-span-2 max-lg:col-span-6" >
                <Sidebar recentBlogs={LastBlogs} CategoriesNames={CategoriesName}
                    SearchItem={useRouter().asPath == "/blog-list" || useRouter().query.search ? true : false} />
            </div>

        </div>
    )
}

export default Content;
