import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const RelatedPost: NextPage<any> = ({ Post, AllPost }) => {
    
    
    const RelatedPost = AllPost?.filter((item: any) => item.categories == Post[0].categories[0] && item.id !== Post[0].id) || null
    console.log(RelatedPost);
    
    return (
        <div className="p-8">
            <h2 className="text-2xl mb-9" >مطالب مرتبط</h2>
        <div className="w-full grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 justify-center gap-4">
                {
                RelatedPost &&
                RelatedPost.slice(0, 3).map((post : any) => 
                    <Link href={`/blog/${post.slug}`} key={post.id} >
                        <Image src={post.images.large} width={900} height={200} alt="pic" className="rounded"/>
                        <div className="bg-white shadow-lg rounded-lg p-5 max-md:p-2 relative bottom-10 mr-2 ml-2 max-xl:text-xs hover:bottom-3 translation-all duration-500">
                            <Link href={`/blog/category/${post.categories[0]}`} className="text-red-500 text-xs mb-2 hover:text-red-300">
                                {post.categories_names}
                            </Link>
                            <p className="font-bold hover:text-blue-900">{post.title.rendered}</p>
                        </div>
                    </Link>
                    )
            }
        </div>
        </div> 
    )
}

export default RelatedPost;