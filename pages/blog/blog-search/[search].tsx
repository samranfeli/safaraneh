import {  GetCategories, getBlogs } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import Title from "@/modules/blogs/components/template/Title";
import Content from "@/modules/blogs/components/template/Content";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { createContext } from "react";

export const SearchData = createContext<any | null>(null)
const Search: NextPage<any> = ({ SearchBlog, LastBlogs, categories_name, pages }) => {
    
    const NavData = useRouter().query.search
    return (
        <div className="bg-white">
            <SearchData.Provider value={[SearchBlog, LastBlogs,categories_name]}>
                <NavbarBlog data={`جستوجوی"${NavData}"`} />
                <Title data={'جستجوی'} searchValue={NavData} />
                <Content Blogs={SearchBlog} LastBlogs={LastBlogs.slice(0,3)} CategoriesName={categories_name} blogPages={pages}/>
            </SearchData.Provider>
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
            ...await (serverSideTranslations(context.locale, ['common'])),
            categories_name: categories_name?.data || null,
            LastBlogs: recentBlogs?.data || null,
            pages: SearchBlog?.headers['x-wp-totalpages'],
            SearchBlog : SearchBlog?.data || null
        }
    })
    
}