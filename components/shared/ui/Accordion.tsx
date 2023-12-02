import { useEffect, useRef, useState } from "react";
import { DownCaret } from "./icons";

type Props = {
    content: React.ReactNode;
    title: React.ReactNode;
    WrapperClassName?: string;
}

const Accordion: React.FC<Props> = props => {

    const contentRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);

    const toggle = () => { setOpen(prevState => !prevState) }

    useEffect(() => {
        if (open) {
            contentRef.current!.style.maxHeight = contentRef.current!.scrollHeight + "px";
        } else {
            contentRef.current!.style.maxHeight = "0";
        }
    }, [open]);

    return (
        <div className={`border border-neutral-200 rounded-lg text-sm sm:text-base text-neutral-700 ${props.WrapperClassName || ""}`}>
            <div onClick={toggle} className="select-none flex gap-3 leading-5 justify-between cursor-pointer p-3 sm:p-5">
                {props.title}
                <DownCaret className={`w-6 h-6 fill-curent transition-all shrink-0 duration-300 ${open ? "rtl:rotate-180 ltr:-rotate-180" : "rotate-0"}`} />
            </div>
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300"
            >
                <div className="bg-neutral-100 p-3 m-3 sm:p-5 sm:m-5 mt-0">
                    {props.content}
                </div>
            </div>
        </div>
    )
}

export default Accordion;