import { GetCategories, GetSearchBlogPosts, getBlogs } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/template/NavbarBlog";
import Title from "@/modules/blogs/components/BlogSearch/Title";
import Content from "@/modules/blogs/components/template/Content";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { createContext } from "react";

export const SearchData = createContext<any | null>(null)
const Search: NextPage<any> = ({ SearchBlog, LastBlogs, categories_name }) => {
    
    const NavData = useRouter().query.search
    return (
        <div className="bg-white">
            <SearchData.Provider value={[SearchBlog, LastBlogs,categories_name]}>
                <NavbarBlog data={`جستوجوی"${NavData}"`} />
                <Title />
                <Content Blogs={SearchBlog} LastBlogs={LastBlogs} CategoriesName={categories_name} />
            </SearchData.Provider>
        </div>
    )
}

export default Search;


export async function getServerSideProps(context: any) { 
    const search = context.query.search;

    let SearchBlog: any = await GetSearchBlogPosts(search);
    let categories_name: any = await GetCategories();
    let recentBlogs: any = await getBlogs(3)

    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common'])),
            categories_name: categories_name?.data || null,
            LastBlogs: recentBlogs?.data || null,
            SearchBlog : SearchBlog?.data || null
        }
    })
    
}