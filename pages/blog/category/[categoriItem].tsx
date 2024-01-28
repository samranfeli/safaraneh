import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import Title from "@/modules/blogs/components/template/Title";
import { NextPage } from "next";
import { GetCategories, getBlogs } from "@/modules/blogs/actions";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { createContext } from "react";
import { useRouter } from "next/router";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


const Category: NextPage<any> = ({ LastBlogs, BlogCategory, categories_name, pages }:
    { LastBlogs?: BlogItemType[], BlogCategory?: BlogItemType[], categories_name: CategoriesNameType[], pages: string }) => {
    
    
    const query: any = useRouter().query.categoriItem;
    const NavData = categories_name?.find(item => item.id == +query)?.name || null
    const TitleData = BlogCategory?.find((item : any) => item.categories[0] == +query)?.categories_names?.[0]

    return (
        <div className="bg-white">
            <NavbarBlog data={NavData} />
            <Title data={TitleData} />
            <Content Blogs={BlogCategory} blogPages={pages}  LastBlogs={LastBlogs?.slice(0,3)} CategoriesName={categories_name} />
        </div>
    )
}

export default Category;


export async function getServerSideProps(context: any) {
    const categoryItemQuery: any = context.query.categoriItem
    const pageQuery : any = context.query.page || 1

    const [LastBlog, BlogCategory, categories_name] = await Promise.all<any>([
        getBlogs({page:1}),
        getBlogs({page:pageQuery,category:categoryItemQuery}),
        GetCategories()
    ])
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                LastBlogs: LastBlog?.data || null,
                pages: BlogCategory?.headers?.['x-wp-totalpages'],
                BlogCategory: BlogCategory?.data || null,
                categories_name: categories_name?.data || null,
            }
        }
    )
}
