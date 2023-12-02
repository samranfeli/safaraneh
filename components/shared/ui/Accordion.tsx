import { useEffect, useRef, useState } from "react";
import { DownCaret } from "./icons";

type Props = {
    content: React.ReactNode;
    title: React.ReactNode;
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
        <div className="border border-neutral-200 rounded-lg text-base text-neutral-700 mb-4">
            <div onClick={toggle} className="select-none flex justify-between cursor-pointer p-5">
                {props.title}
                <DownCaret className={`w-6 h-6 fill-curent transition-all duration-300 ${open ? "rtl:rotate-180 ltr:-rotate-180" : "rotate-0"}`} />
            </div>
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300"
            >
                <div className="bg-neutral-100 p-5 m-5 mt-0">
                    {props.content}
                </div>
            </div>
        </div>
    )
}

export default Accordion;