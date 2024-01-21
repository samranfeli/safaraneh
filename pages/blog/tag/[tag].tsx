import { GetTags, GetTagName , GetCategories , getBlogs} from "@/modules/blogs/actions";
import Title from "@/modules/blogs/components/BlogTag/Title";
import NavbarBlog from "@/modules/blogs/components/template/NavbarBlog";
import { NextPage } from "next";
import { createContext } from "react";
import Content from "@/modules/blogs/components/template/Content";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


export const TagData = createContext<any | null>(null)
const Tag: NextPage<any> = ({ TagBlogs, TagName, categories_name, recentBlogs }) => {
  console.log(TagName);
  
    return (
        <div className="bg-white">
            <TagData.Provider value={[TagBlogs,recentBlogs,categories_name]}>
                <NavbarBlog data={TagName.name} />
                <Title title={TagName?.name} />
                <Content Blogs={TagBlogs} LastBlogs={recentBlogs} CategoriesName={categories_name} />
            </TagData.Provider>
        </div>
    )
}


export default Tag;


export async function getServerSideProps(context: any) {
    let tag = context.query.tag;

    let TagName : any = await GetTagName(+tag)
    let TagBlogs: any = await GetTags(+tag)
    let categories_name: any = await GetCategories()
    let recentBlogs: any = await getBlogs(3)
    
    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common'])),
            TagName: TagName?.data || null,
            TagBlogs: TagBlogs?.data || null,
            recentBlogs: recentBlogs?.data || null,
            categories_name: categories_name?.data || null
        }
    })
}