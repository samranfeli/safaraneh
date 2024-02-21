import Link from "next/link";
import { Home } from "./icons";
import React, { Fragment } from "react";

type Props = {
    items: {
        label: string;
        link?: string;
    }[]
}

const BreadCrumpt: React.FC<Props> = props => {

    const linksClassName = "text-neutral-400 hover:text-neutral-800 transition-all"
    return (
        <div className="flex flex-wrap items-center gap-2 text-2xs mb-4 ">
            <Link href="/" className={`${linksClassName}`} aria-label="home">
                <Home className="w-5 h-5 mb-1.5 fill-current" />
            </Link>
            {props.items.map(item => (
                <Fragment key={item.label}>
                    <span className="text-neutral-400"> / </span>
                    {item.link ? (
                        <Link href={item.link} className={linksClassName}> {item.label} </Link>
                    ) : (
                        <span className="text-neutral-800"> {item.label} </span>
                    )}
                </Fragment>
            ))}

        </div>
    )
}

export default BreadCrumpt;