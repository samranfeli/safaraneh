import { GetBlogPostDetails, GetCategories, getBlogs } from "@/modules/blogs/actions";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import Sidebar from "@/modules/blogs/components/template/Sidebar";
import ContentPost from "@/modules/blogs/components/BlogPostDetail/PostContent";
import TitlePost from "@/modules/blogs/components/BlogPostDetail/PostTitle";
import RelatedPost from "@/modules/blogs/components/BlogPostDetail/PostRelatedPost";
import DetailBlogAcordion from "@/modules/blogs/components/BlogPostDetail/PostFaq";
import GetComment from "@/modules/blogs/components/BlogPostDetail/PostGetComment";
import PostComment from "@/modules/blogs/components/BlogPostDetail/PostCommentAdd";


const DetailBlog: NextPage<any> = ({ BlogPost , CategoriesName , recentBlogs, AllBlogs }) => {
    
    const NavData = useRouter().query.DetailBlog
    return (
        <div className="bg-white">
            <div className="max-w-container m-auto">
                <NavbarBlog data={NavData} category={[BlogPost?.[0].categories_names[0],BlogPost?.[0].categories[0]]} />
                <TitlePost BlogPost={BlogPost} />
                <div className="grid grid-cols-8 gap-8 mt-10 p-5 max-sm:p-3 max-lg:grid-cols-1">
                <div className="text-sm leading-8 col-span-6">
                    <ContentPost content={BlogPost?.[0]} />
                </div>
                <div className="col-span-2 max-lg:col-span-6 w-full mt-5 ">
                    <Sidebar recentBlogs={recentBlogs?.slice(0,3)} CategoriesNames={CategoriesName} NotSticky={true} />
                </div>
                </div>
                <hr className="m-3 mt-10"/>
                <div className="p-5 mt-10"> 
                    <RelatedPost Post={BlogPost} AllPost={AllBlogs} />
                    <DetailBlogAcordion blog={BlogPost?.[0]} />
                    <GetComment />
                    <PostComment postId={BlogPost?.[0].id} />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: any) {

    const [BlogPost, recentBlogs, CategoriesName] = await Promise.all<any>([
        GetBlogPostDetails(context.query.DetailBlog),
        getBlogs({ page: 1 }),
        GetCategories()
    ]) 
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                BlogPost: BlogPost?.data || null,
                recentBlogs: recentBlogs?.data || null,
                CategoriesName: CategoriesName?.data || null,
                AllBlogs: BlogPost?.data || null
            }
        }
    )
}


export default DetailBlog;