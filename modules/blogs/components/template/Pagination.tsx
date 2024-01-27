import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Pagination: NextPage<any> = ({ perPage }) => {

    const page = useRouter()
    const router : any = useRouter().query.page || 1

    const list : any = []
    useEffect(() => {
        for (let i = 1; i <= +perPage; i++) {
            list.push(i)
        }
        setListPage(list)
        
    } ,[])
    const [listPage,setListPage] : any = useState([])
    
    const btnClick = (a : any , b : any) => {
        if (a) page.replace({ query: { ...page.query, page: a } })
        else page.replace({ query: { ...page.query, page: b } })
    }
    return (
        <div className="flex flex-wrap justify-center rounded mt-4 max-sm:m-4 p-3 max-md:gap-8 max-sm:gap-1 gap-10" style={{ border: 'solid 1px rgba(0,0,0,.2)' }}>
            
            <span
                className={`${+router == listPage[0] && 'hidden'} cursor-pointer w-7 text-center bg-gray-200 hover:bg-gray-300 translation-all duration-300 rounded ltr:hidden`}
                onClick={() => btnClick(false, +router - 1)} >P</span>

            
            <span
                className={`${+router - listPage[0] <= 2 && 'hidden'} cursor-pointer pl-2 pr-2 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(listPage[0], false)}>{listPage[0]}
            </span>

            
            <span className={ `${+router - listPage[0] <= 2 && 'hidden'} text-gray-400`}>...</span>

            
            <span
                className={` ${!listPage.includes(+router - 2) && 'hidden'} cursor-pointer pl-2 pr-2 scale-90 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(+router - 2, false)} >{+router - 2}
            </span>
            <span
                className={` ${!listPage.includes(+router - 1) && 'hidden'} cursor-pointer pl-2 pr-2 scale-110 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(+router - 1, false)}>{+router - 1}
            </span>

            
            <span
                className={`cursor-pointer bg-blue-600 pl-2  pr-2 scale-125  rounded-sm text-white hover:bg-blue-200 translation-all duration-300`}
                onClick={() => btnClick(+router, false)}>{+router}
            </span>

            
            <span
                className={` ${!listPage.includes(+router + 1) && 'hidden'} cursor-pointer pl-2 pr-2 scale-110 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(+router + 1, false)}>{+router + 1}
            </span>
            <span
                className={` ${!listPage.includes(+router + 2) && 'hidden'} cursor-pointer pl-2 pr-2 scale-90 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(+router + 2, false)}>{+router + 2}
            </span>

            
            <span className={ `${+router + 2 >= listPage[+listPage.length - 1] && 'hidden'} text-gray-400`}>...</span>

            
            <span className={` ${+router + 2 >= listPage[+listPage.length - 1] && 'hidden'} cursor-pointer pl-2 pr-2 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(listPage[+listPage.length - 1], false)}>
                {listPage[+listPage.length - 1]}
            </span>

            
            <span
                className={` ${+router == listPage[+listPage.length - 1] && 'hidden'} cursor-pointer bg-gray-200 w-7 text-center hover:bg-gray-300 translation-all duration-300 rounded ltr:hidden`}
                onClick={() => btnClick(false, +router + 1)} >N</span>

        </div>
    )
}

export default Pagination;