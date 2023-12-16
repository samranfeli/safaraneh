import React, { PropsWithChildren } from 'react';
import Link from 'next/link';

type Props = {
    onClick?:()=>void;
    loading?:boolean;
    disabled?:boolean;
    className?:string;
    type?:"submit" | "button";
    href?:string;
    target?: "_blank";
    color?:"red" | "blue";
}


const Button: React.FC<PropsWithChildren<Props>> = props => {
    
    const {color} = props;

    let className = `transition-all rounded-lg flex gap-3 items-center justify-center cursor-pointer select-none ${props.className}`;

    if(props.disabled){
        className += " text-white bg-neutral-200";
    }else if (!color){
        className += " text-white bg-primary-700 hover:bg-primary-800";
    }else if (color === 'blue'){
        className += " text-white bg-blue-700 hover:bg-blue-800"
    }else{
        className += " text-white bg-red-600 hover:bg-red-700"
    }
    if (props.href){
        return <Link href={props.href} target={props.target} className={className}>
            {props.children}
        </Link>
    }

    return(
        <div typeof={props.type || "button"} className={className} onClick={props.onClick}>
            {props.children}
            {props.loading ? <span className="animate-spin block border-2 border-white rounded-full border-r-transparent border-t-transparent w-5 h-5" /> : null}
        </div>
    )

};

export default Button;