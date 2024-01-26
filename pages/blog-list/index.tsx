import { getBlogs , GetCategories, } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import Title from "@/modules/blogs/components/BlogList/Titile";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { GetStaticProps, NextPage } from "next";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";



const BlogList: NextPage<any> = ({ AllBlog, categories_name, pages,recentBlogs }:
    { AllBlog?: BlogItemType[], categories_name?: CategoriesNameType[] , pages:number,recentBlogs:BlogItemType[]}) => {
    
    console.log(AllBlog);
    

    const [Pages, setPages] = useState<any>(pages)
    const [blogs, setblogs] = useState<any>(AllBlog)

    const router = useRouter()
    
    

        return (
            <div className="bg-white">
                <NavbarBlog data={'جدیدترین مقالات'} />
                <Title />
                <Content Blogs={AllBlog} LastBlogs={recentBlogs?.slice(0, 3)} CategoriesName={categories_name} blogPages={Pages} />
        </div>
    )
}

export default BlogList;


export async function  getServerSideProps (context: any)  {
    let route = context.query.page || 1
    const [ AllBlog, blogsPage, categories_name] = await Promise.all<any>([
        getBlogs(1),
        getBlogs(+route),
        GetCategories()
    ])


    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                AllBlog: blogsPage?.data || null,
                pages: AllBlog?.headers['x-wp-totalpages'],
                categories_name: categories_name?.data || null,
                recentBlogs:AllBlog.data || null
            },

        }
    )
}