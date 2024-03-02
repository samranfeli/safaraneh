import {  GetCategories, getBlogs } from "@/modules/blogs/actions";
import Title from "@/modules/blogs/components/template/Title";
import Content from "@/modules/blogs/components/template/Content";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";

const Search: NextPage<any> = ({ SearchBlog, LastBlogs, categories_name, pages }:
    {SearchBlog: BlogItemType[], LastBlogs:BlogItemType[], categories_name:CategoriesNameType[],pages:string}) => {
    
    const SearchValue = useRouter().query.search
    return (
        <div className="bg-white">
            <div className="max-w-container m-auto pr-5 pl-5 max-sm:p-4">
                <BreadCrumpt items={[{ label: "بلاگ", link: "/blog" }, { label: `جستجوی"${SearchValue}"` }]} />
            </div>
                <Title data={'جستجوی'} searchValue={`"${SearchValue}"`} />
                <Content Blogs={SearchBlog} LastBlogs={LastBlogs.slice(0,3)} CategoriesName={categories_name} blogPages={pages}/>
        </div>
    )
}

export default Search;


export async function getServerSideProps(context: any) { 
    const searchQuery = context.query.search;
    const pageQuery = context.query.page || 1

    const [SearchBlog, categories_name, recentBlogs] = await Promise.all<any>([
        getBlogs({page:pageQuery , search: searchQuery}),
        GetCategories(),
        getBlogs({page:1})
    ])
    return ({
        props: {
            ...await serverSideTranslations(context.locale, ['common']),
            categories_name: categories_name?.data || null,
            LastBlogs: recentBlogs?.data || null,
            pages: SearchBlog?.headers?.['x-wp-totalpages'],
            SearchBlog : SearchBlog?.data || null
        }
    })
    
}