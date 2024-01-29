import { NextPage } from "next";
import parse from 'html-react-parser';
import Link from "next/link";
import Sidebar from "../template/Sidebar";


const ContentPost: NextPage<any> = ({ content, recentBlogs, CategoriesNames }) => {
    
    return (
        <div className="grid grid-cols-8 gap-8 mt-10 p-5 max-sm:p-3 max-lg:grid-cols-1">
            <div className="text-sm leading-8 col-span-6">
            {content && parse(content?.content.rendered)}
            <div className="flex mt-10">
                <p>تگ ها:</p>
                {
                    content &&
                    content.tags_names.map((tag: any, index: any) => <Link href={`/blog/tag/${content.tags[index]}`}
                    className="mr-8 hover:text-blue-800" key={tag}>#{tag}</Link>)
                }
            </div>
            </div>    
            <div className="col-span-2 max-lg:col-span-6 w-full mt-5 ">
                <Sidebar recentBlogs={recentBlogs?.slice(0,3)} CategoriesNames={CategoriesNames} NotSticky={true} />
            </div>    
        </div>
    )
}

export default ContentPost;