import { getBlogs , GetCategories, } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import Title from "@/modules/blogs/components/BlogList/Titile";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { GetStaticProps, NextPage } from "next";
import { createContext } from "react";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


export const AllData = createContext<any | null>(null)
const BlogList: NextPage<any> = ({ AllBlog, recentBlogs, categories_name }:
    { AllBlog?: BlogItemType[], recentBlogs?: BlogItemType[], categories_name?: CategoriesNameType[] }) => {
    
    return (
        <div className="bg-white">
            <AllData.Provider value={[ AllBlog, recentBlogs, categories_name ]}>
                <NavbarBlog data={'جدیدترین مقالات'} />
                <Title />
                <Content Blogs={AllBlog} LastBlogs={recentBlogs} CategoriesName={categories_name}/>
            </AllData.Provider>
        </div>
    )
}

export default BlogList;


export const getStaticProps: GetStaticProps = async (context: any) => {

    const [recentBlogs, AllBlog, categories_name] = await Promise.all<any>([
        getBlogs(3),
        getBlogs(100),
        GetCategories()
    ])
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                AllBlog: AllBlog?.data || null,
                recentBlogs: recentBlogs?.data || null,
                categories_name: categories_name?.data || null
            },
            revalidate : 60 * 60 * 24//12 Hours
        }
    )
}