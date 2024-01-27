import { getBlogs , GetCategories, } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import Title from "@/modules/blogs/components/BlogList/Titile";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { GetStaticProps, NextPage } from "next";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";



const BlogList: NextPage<any> = ({ blogsPage, categories_name, pages,recentBlogs }:
    { blogsPage?: BlogItemType[], categories_name?: CategoriesNameType[] , pages:number,recentBlogs:BlogItemType[]}) => {

        return (
            <div className="bg-white">
                <NavbarBlog data={'جدیدترین مقالات'} />
                <Title />
                <Content Blogs={blogsPage} LastBlogs={recentBlogs?.slice(0, 3)} CategoriesName={categories_name} blogPages={pages} />
        </div>
    )
}

export default BlogList;


export async function  getServerSideProps (context: any)  {
    let route = context.query.page || 1
    const [ pageOne, blogsPage, categories_name] = await Promise.all<any>([
        getBlogs(1),
        getBlogs(+route),
        GetCategories()
    ])

    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                blogsPage: blogsPage?.data || null,
                pages: pageOne?.headers?.['x-wp-totalpages'],
                categories_name: categories_name?.data || null,
                recentBlogs: pageOne.data || null
            },

        }
    )

}