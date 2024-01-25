import { getBlogs , GetCategories, } from "@/modules/blogs/actions";
import NavbarBlog from "@/modules/blogs/components/template/BreadCrumpt";
import Title from "@/modules/blogs/components/BlogList/Titile";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";
import { GetStaticProps, NextPage } from "next";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";



const BlogList: NextPage<any> = ({ AllBlog, categories_name }:
    { AllBlog?: BlogItemType[], recentBlogs?: BlogItemType[], categories_name?: CategoriesNameType[] }) => {
        
    const [Pages, setPages] = useState<any>()
    const [blogs, setblogs] = useState<any>()

    const router = useRouter()
    

    
    useEffect(() => {
        getBlogs(1)
            .then((res: any) => setPages(Object.values(res.headers)[3]) )
    
        setblogs(null)
        const getBlogsPages = async() => {
            const data: any = await getBlogs(+router.query.page)
            setblogs(data.data)
        }
        getBlogsPages()
    } ,[router])
    

        return (
            <div className="bg-white">
                <NavbarBlog data={'جدیدترین مقالات'} />
                <Title />
                <Content Blogs={router.query.page ? blogs : AllBlog} LastBlogs={AllBlog?.slice(0, 3)} CategoriesName={categories_name} blogPages={Pages} />
        </div>
    )
}

export default BlogList;


export const getStaticProps: GetStaticProps = async (context: any) => {

    const [ AllBlog, categories_name] = await Promise.all<any>([
        getBlogs(1),
        GetCategories()
    ])
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
                AllBlog: AllBlog?.data || null,
                categories_name: categories_name?.data || null
            },
            revalidate : 60 * 60 * 24//12 Hours
        }
    )
}