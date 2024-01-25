import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const RelatedPost: NextPage<any> = ({ Post, AllPost }) => {
    
    
    const RelatedPost = AllPost?.filter((item: any) => item.categories == Post[0].categories[0] && item.id !== Post[0].id) || null
    
    return (
        <div>
            <h2 className="text-3xl mb-10" >مطالب مرتبط</h2>
        <div className="w-full grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 justify-center gap-4">
                {
                RelatedPost &&
                RelatedPost.slice(0, 3).map((post : any) => 
                    <Link href={`/blog/${post.slug}`} key={post.id} >
                        <Image src={post.images.large} width={200} height={200} alt="pic" className="rounded w-full"/>
                        <div className="bg-white shadow-lg rounded-lg p-5 max-lg:p-3 relative bottom-10 mr-2 ml-2">
                            <Link href={`/blog/category/${post.categories[0]}`} className="text-red-500 text-xs mb-2 hover:text-red-300">
                                {post.categories_names}
                            </Link>
                            <p className="font-bold hover:text-blue-900 max-xl:text-sm">{post.title.rendered}</p>
                        </div>
                    </Link>
                    )
            }
        </div>
        </div> 
    )
}

export default RelatedPost;