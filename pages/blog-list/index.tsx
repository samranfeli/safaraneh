import { getBlogs , GetCategories, } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import Title from "@/modules/blogs/components/template/Title";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { NextPage } from "next";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";



const BlogList: NextPage<any> = ({ blogsPage, categories_name, pages,recentBlogs }:
    { blogsPage?: BlogItemType[], categories_name?: CategoriesNameType[] , pages:number,recentBlogs:BlogItemType[]}) => {

        return (
            <div className="bg-white">
                <NavbarBlog data={'جدیدترین مقالات'} />
                <Title data={'جدیدترین مطالب'} />
                <Content Blogs={blogsPage} LastBlogs={recentBlogs?.slice(0, 3)} CategoriesName={categories_name} blogPages={pages} />
        </div>
    )
}

export default BlogList;


export async function  getServerSideProps (context: any)  {
    let pageQuery = context.query.page || 1
    const [ LastBLogs, blogsPage, categories_name] = await Promise.all<any>([
        getBlogs({page: 1}),
        getBlogs({page:+pageQuery}),
        GetCategories()
    ])

    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                blogsPage: blogsPage?.data || null,
                pages: LastBLogs?.headers?.['x-wp-totalpages'],
                categories_name: categories_name?.data || null,
                recentBlogs: LastBLogs.data || null
            },

        }
    )

}