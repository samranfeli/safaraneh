import { useRef, useEffect, useState } from "react";

type Props = {
    target: string;
    title: string;
}

const AnchorTabItem: React.FC<Props> = props => {

    const anchorRef = useRef<HTMLAnchorElement>(null);

    const [active, setActive] = useState<boolean>(false);

    const makeSticky = () => {

        const target = document.getElementById(props.target);

        if (!target) return;

        const targetTop = target.getBoundingClientRect().top;

        if (targetTop < 62) {

            const targetHeight = target.offsetHeight;

            if (Math.abs(targetTop) < (targetHeight - 62)) {
                setActive(true);
            } else {
                setActive(false);
            }

        } else {
            setActive(false);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', makeSticky);
        window.addEventListener("resize", makeSticky);

        return (() => {
            document.removeEventListener('scroll', makeSticky);
            window.removeEventListener("resize", makeSticky);
        });
    }, []);


    const scrollToTarget = (e: any) => {

        e.preventDefault();

        const target = document.getElementById(props.target);

        if (target) {

            const targetOffsetTop = target.offsetTop + 15;

            window.scrollTo({
                top: targetOffsetTop,
                behavior: "smooth"
           });

        }

    }

    return (
        <a
            ref={anchorRef}
            onClick={scrollToTarget}
            href={"#" + props.target}
            className={`font-semibold p-4 text-sm block border-b-2 ${active ? "text-blue-500 border-blue-500" : "border-transparent"}`}
        > {props.title} </a>
    )
}

export default AnchorTabItem;