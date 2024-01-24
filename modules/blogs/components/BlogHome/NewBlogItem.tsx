import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { BlogItemType } from "../../types/blog";
import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";
import parse from 'html-react-parser';


type Props = {
    blogs?: BlogItemType[];
}

const NewBlog: NextPage<Props> = (props) => {
    
    return (
        <div className="max-xl:p-5 max-w-container m-auto">
            <p className="text-2xl">جدیدترین مطالب</p>
            {
                props.blogs?.map(blog =>
                    <div key={blog.title.rendered}>
                    <div className="grid grid-cols-3 gap-4 mt-10 max-sm:grid-cols-1">
                    <div>
                        <Link href={`blog/${blog.slug}`}>
                            <Image src={blog.images.large}
                            alt={blog.title.rendered} height={100} width={300} className="rounded-md max-sm:mr-2 w-full" />
                        </Link>
                    </div>
    
                    <div className="w-full col-span-2 rounded p-5 max-sm:p-2" style={{border:'solid 1px rgba(0,0,0,0.2)'}}>
                        <Link href={`/blog/category/${blog.categories[0]}`} className="pr-2 text-red-600 block hover:text-red-400 translation-all duration-300">
                                {blog.categories_names[0]}
                        </Link>
                        <Link href={`/blog/${blog.slug}`} className="leading-9 font-bold text-lg max-sm:text-base p-2 hover:text-blue-900 block translation-all duration-300">
                            {blog.title.rendered}
                        </Link>
                        <div className="text-sm text-gray-500 pr-2 max-sm:mt-1">{parse(blog.excerpt.rendered)} </div>
                        <div className="flex justify-between text-xs mt-4">
                            <div className="flex w-52 justify-between text-gray-500 pr-2">
                                <p>{blog.date}</p>
                                <p className="font-bold text-3xl">.</p>
                                <p>{blog.acf.time_read}</p>
                            </div>
                            <Link href={`blog/${blog.slug}`} className="flex ml-4 font-bold text-sm hover:text-blue-700 translation-all duraction-300 max-sm:hidden">        
                                    <p>ادامه مطلب</p>
                                    <ArrowLeft
                                    className="w-7 mr-2 bg-gray-200 rounded-2xl p-1 ltr:hidden hover:bg-blue-600 translation-all duration-300" />
                                    <ArrowRight
                                    className="w-7 mr-2 bg-gray-200 rounded-2xl p-1 rtl:hidden hover:bg-blue-500 translation-all duration-300" />    
                            </Link>
                        </div>
                    </div>
                </div>
                    </div>
                )
            }
            {!props.blogs && <p className="text-center">خطا در اتصال به شبکه</p>}
                <Link href='/blog/blog-list'>
                    <div  className="w-full rounded text-center p-4 mt-10 hover:bg-gray-100 translation-all duration-300" style={{border:'solid 1px rgba(0,0,0,0.1)'}}>
                        <p>مشاهده مطالب بیشتر</p>
                    </div>
                </Link>
            
        </div>
    )
}


export default NewBlog;