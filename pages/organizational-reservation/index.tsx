import BreadCrumpt from "@/modules/blogs/components/template/BreadCrumpt";
import Section1 from "@/modules/organizational-reservation/Section1";
import Section2 from "@/modules/organizational-reservation/Section2";
import Section3 from "@/modules/organizational-reservation/Section3";
import Section4 from "@/modules/organizational-reservation/Section4";
import Section5 from "@/modules/organizational-reservation/Section5";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const organizational: NextPage<any> = () => {
    
    return (
        <div className="bg-white">
            <BreadCrumpt page="رزرو های سازمانی" />
            <div className="max-w-container m-auto p-5 relative max-sm:p-3">
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
            </div>
        </div>
    )
}

export default organizational;

export async function  getStaticProps (context: any)  {
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
            },

        }
    )

}