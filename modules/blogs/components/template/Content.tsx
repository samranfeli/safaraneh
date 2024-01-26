import { NextPage } from "next";
import BlogItem from "../template/BlogItem";
import Sidebar from "../template/Sidebar";
import { useContext, useEffect, useState } from "react";
import { BlogItemType, CategoriesNameType } from "../../types/blog";
import { useRouter } from "next/router";

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
                    Blogs?.map((blog : any, blogIndex:number ) => <BlogItem data={blog} key={blog.id} index={blogIndex} /> ): <p>loading</p>
                }
                    <ul className="flex flex-wrap justify-center rounded mt-4 max-sm:m-4 p-3" style={{border:'solid 1px rgba(0,0,0,.2)'}}>
                    {
                        pageNumber.length ?
                        pageNumber.map((item: any) => <li key={item} onClick={() => router.push({query:{...router.query , page:item}})}
                            className={`scale-50 w-1 text-center rounded-3xl ml-2  max-sm:m-2 cursor-pointer translation-all duration-300`}>
                        {item}
                        </li>) : 
                            <p>loading</p>
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
