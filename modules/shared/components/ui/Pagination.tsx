import { useState } from "react";

type Props = {
    totalItems: number;
    itemsPerPage?: number;
    onChange: (activePage:number) => void;
    onChangePerPage : (perPage:number) => void;
    wrapperClassName?:string;
}

const Pagination: React.FC<Props> = props => {

    const [activePage, setActivePage ] = useState<number>(1);
    
    const itemsPerPage = props.itemsPerPage || 10;

    const totalPages = Math.floor(props.totalItems / itemsPerPage) + (props.totalItems % itemsPerPage > 0 ? 1 : 0);
    const pagesArray = [];
    for (let i = 0; i< totalPages; i++){
        pagesArray.push(i);
    }

    return (
        <div className={`flex gap-2 ${props.wrapperClassName}`}>

            {pagesArray.map((_,index) => (
                <button 
                    key={index}
                    type="button" 
                    onClick={() => {setActivePage(index+1)}}
                    className={`p-2 bg-white border rounded w-9 h-9 leading-4 text-center cursor-pointer select-none hover:text-blue-500 hover:border-blue-300 ${activePage === index+1 ? "text-blue-500 border-blue-300" : "text-neutral-700 border-neutral-200"}`}
                >
                    {index+1}
                </button>
            ))}

        </div>
    )
}

export default Pagination;