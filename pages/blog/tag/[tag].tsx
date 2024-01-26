import { GetTags, GetTagName , GetCategories , getBlogs} from "@/modules/blogs/actions";
import Title from "@/modules/blogs/components/BlogTag/Title";
import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import { NextPage } from "next";
import { createContext } from "react";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


const Tag: NextPage<any> = ({ TagBlogs, TagName, categories_name, recentBlogs }) => {
  console.log(TagName);
  
    return (
        <div className="bg-white">
                <NavbarBlog data={TagName.name} />
                <Title title={TagName?.name} />
                <Content Blogs={TagBlogs}  LastBlogs={recentBlogs} CategoriesName={categories_name}  />
        </div>
    )
}


export default Tag;


export async function getServerSideProps(context: any) {
    let tag = context.query.tag;

    const [TagName, TagBlogs, categories_name, recentBlogs] = await Promise.all<any>([
        GetTagName(+tag),
        GetTags(+tag),
        GetCategories(),
        getBlogs(3)
    ])
    
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