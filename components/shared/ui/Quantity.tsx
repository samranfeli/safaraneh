import React, { useEffect, useState } from 'react';
import { Minus, Plus } from './icons';

type Props = {
    min: number;
    max: number;
    onChange: (value: number) => void;
    inputId?: string;
    disabled?: boolean;
}

const Quantity: React.FC<Props> = props => {

    const { max, min, onChange, disabled } = props;

    const [value, setValue] = useState(min != undefined ? min : 1);

    const decrease = () => {
        if (!disabled && value > min) {
            setValue(prevValue => prevValue - 1);
        };
    }

    const increase = () => {
        if (!disabled && value < max) {
            setValue(prevValue => prevValue + 1);
        };
    }
    useEffect(() => {
        onChange(value);
    }, [value]);

    return (
        <div className="flex" dir="ltr">
            <button type='button' className={`outline-none w-8 h-8 flex justify-center items-center rounded-md ${value <= min ? "bg-neutral-100 cursor-not-allowed text-neutral-200" : "bg-neutral-200 cursor-pointer text-neutal-600"}`} onClick={decrease}>
                <Minus className='w-4 h-4 fill-current block' />
            </button>

            <input id={props.inputId || undefined} type="text" readOnly value={value} className='font-semibold w-8 text-center text-lg pointer-events-none' />

            <button type='button' className={`outline-none w-8 h-8 flex justify-center items-center rounded-md ${value >= max ? "bg-neutral-100 cursor-not-allowed text-neutral-200" : "bg-neutral-200 cursor-pointer text-neutal-600"}`} onClick={increase}>
                <Plus className='w-4 h-4 fill-current block' />
            </button>
        </div>
    );
};

export default Quantity;