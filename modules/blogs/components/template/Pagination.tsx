import { ArrowLeft, ArrowRight } from "@/modules/shared/components/ui/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Pagination: NextPage<any> = ({ perPage }) => {

    const router = useRouter()
    const page: any = useRouter().query.page || 1
    const routerQuery : any = useRouter().query

    const list : any = []
    useEffect(() => {
        for (let i = 1; i <= +perPage; i++) {
            list.push(i)
        }
        setListPage(list)
        
    } ,[])
    const [listPage,setListPage] : any = useState([])
    
    const btnClick = (a : any , b : any) => {
        if (a) router.replace({ query: { ...routerQuery, page: a } })
        else router.replace({ query: { ...routerQuery, page: b } })
    }
    return (
        <div className="flex flex-wrap justify-center rounded mt-4 max-sm:m-4 p-3 max-md:gap-8 max-sm:gap-5 gap-10" style={{ border: 'solid 1px rgba(0,0,0,.2)' }}>
            
            <span
                className={`${+page == listPage[0] && 'hidden'} cursor-pointer w-7 text-center bg-gray-200 hover:bg-gray-300 translation-all duration-300 rounded ltr:hidden`}
                onClick={() => btnClick(false, +page - 1)} >P</span>
    
            <span
                className={`${+page - listPage[0] <= 2 && 'hidden'} cursor-pointer pl-2 pr-2 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(listPage[0], false)}>{listPage[0]}
            </span>

            
            <span className={ `${+page - listPage[0] <= 2 && 'hidden'} text-gray-400`}>...</span>

            
            <span
                className={` ${!listPage.includes(+page - 2) && 'hidden'} cursor-pointer pl-2 pr-2 scale-90 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(+page - 2, false)} >{+page - 2}
            </span>
            <span
                className={` ${!listPage.includes(+page - 1) && 'hidden'} cursor-pointer pl-2 pr-2 scale-110 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(+page - 1, false)}>{+page - 1}
            </span>

            
            <span
                className={`cursor-pointer bg-blue-600 pl-3 pr-3 scale-125  rounded-sm text-white hover:bg-blue-200 translation-all duration-300`}
                onClick={() => btnClick(+page, false)}>{+page}
            </span>

            
            <span
                className={` ${!listPage.includes(+page + 1) && 'hidden'} cursor-pointer pl-2 pr-2 scale-110 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(+page + 1, false)}>{+page + 1}
            </span>
            <span
                className={` ${!listPage.includes(+page + 2) && 'hidden'} cursor-pointer pl-2 pr-2 scale-90 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(+page + 2, false)}>{+page + 2}
            </span>

            
            <span className={ `${+page + 2 >= listPage[+listPage.length - 1] && 'hidden'} text-gray-400`}>...</span>

            
            <span className={` ${+page + 2 >= listPage[+listPage.length - 1] && 'hidden'} cursor-pointer pl-2 pr-2 hover:bg-gray-200 rounded translation-all duration-300`}
                onClick={() => btnClick(listPage[+listPage.length - 1], false)}>
                {listPage[+listPage.length - 1]}
            </span>

            
            <span
                className={` ${+page == listPage[+listPage.length - 1] && 'hidden'} cursor-pointer bg-gray-200 w-7 text-center hover:bg-gray-300 translation-all duration-300 rounded ltr:hidden`}
                onClick={() => btnClick(false, +page + 1)} >N</span>

        </div>
    )
}

export default Pagination;