import { GetTagName , GetCategories , getBlogs} from "@/modules/blogs/actions";
import Title from "@/modules/blogs/components/template/Title";
import BreadCrumpt from "@/modules/blogs/components/template/BreadCrumpt";
import { NextPage } from "next";
import Content from "@/modules/blogs/components/template/Content";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BlogItemType, CategoriesNameType } from "@/modules/blogs/types/blog";


const Tag: NextPage<any> = ({ TagBlogs, TagName, categories_name, recentBlogs, pages } :
    {TagBlogs : BlogItemType[] , TagName:any , categories_name:CategoriesNameType[], recentBlogs: BlogItemType[],pages:string}) => {
    
    return (
        <div className="bg-white">
                <BreadCrumpt data={TagName.name} page="بلاگ" />
                <Title data={TagName?.name} />
                <Content Blogs={TagBlogs} blogPages={pages}  LastBlogs={recentBlogs?.slice(0,3)} CategoriesName={categories_name}  />
        </div>
    )
}


export default Tag;


export async function getServerSideProps(context: any) {
    let tag = context.query.tag;
    const pageQuery = context.query.page || 1

    const [TagName, TagBlogs, categories_name, recentBlogs] = await Promise.all<any>([
        GetTagName(+tag),
        getBlogs({page:pageQuery ,tags:tag}),
        GetCategories(),
        getBlogs({page:1})
    ])
    
    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common'])),
            TagName: TagName?.data || null,
            TagBlogs: TagBlogs?.data || null,
            pages: TagBlogs?.headers?.['x-wp-totalpages'],
            recentBlogs: recentBlogs?.data || null,
            categories_name: categories_name?.data || null
        }
    })
}