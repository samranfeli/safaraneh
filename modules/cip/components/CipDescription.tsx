import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import { NextPage } from "next";
import parse from 'html-react-parser';
import { DownCaret } from "@/modules/shared/components/ui/icons";
import { useState } from "react";


const CipDescription: NextPage<any> = ({ content }) => {
    
    const [open, setopen] = useState<boolean>(false)
    return (
        <div className="mt-10">
            <BreadCrumpt items={[{ label: 'تشریفات فرودگاهی' }]} />
            <h2 className="text-2xl font-bold">تشریفات فرودگاهی</h2>
            <div className={`mt-14 text-sm max-sm:text-xs ${!open && 'h-44'} overflow-hidden relative`}>
                {content && parse(content.Content)}
                <span className="bg-slate-100 opacity-50 h-14 absolute bottom-0 z-90 w-full"></span>
            </div>
            <div className="flex justify-center cursor-pointer" onClick={e => setopen(!open)}>
                <h5>{open ? 'بستن' : 'اطلاعات بیشتر'}</h5>
                <DownCaret className={`w-5 ${open && 'rotate-180'}`} /> 
            </div>
        </div>
    )
}

export default CipDescription;