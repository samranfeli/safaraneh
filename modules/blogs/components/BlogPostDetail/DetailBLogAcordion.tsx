import Accordion from "@/modules/shared/components/ui/Accordion";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const DetailBlogAcordion: NextPage<any> = ({ blog }) => {
console.log(blog);

    const answers : any = []
    useEffect(() => {
        for (let i = 0; i <= 4; i++) {
            answers.push(Object.values(blog.acf.pp_faq)[i])
        }
        seta(answers)
    } ,[])
    let [a,seta] = useState()

    return (
        <div className="space-y-5 mt-20">
            <h2 className="text-3xl mb-10">سوالات متداول</h2>
            <Accordion title={a?.[1]} content={a?.[2]}/>
            <Accordion title={a?.[3]} content={a?.[4]} />
        </div>
    )
}

export default DetailBlogAcordion;