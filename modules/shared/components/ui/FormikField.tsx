import { Field } from 'formik';
import { useState } from 'react';

type Props = {
    errorText?: string;
    isTouched?: boolean;
    label?: string;
    maxLength?:number;
    id?: string;
    name?: string;
    className?: string;
    validateFunction?: (value: string) => void;
}

const FormikField: React.FC<Props> = props => {

    const [labelUp, setLabelUp] = useState<boolean>(false);

    return (
        <div className={`${props.errorText ? "has-validation-error" : ""}`}>
            <div className='relative'>
                {!!props.label && (
                    <label
                        htmlFor={props.id}
                        className={`select-none pointer-events-none block leading-4 absolute px-2 bg-white transition-all duration-300 -translate-y-1/2 rtl:right-1 ltr:left-1 ${labelUp ? "top-0 text-xs" : "top-1/2 text-sm"}`}
                    >
                        {props.label}
                    </label>
                )}

                <Field
                    maxLength={props.maxLength || undefined}
                    validate={props.validateFunction}
                    onFocus={() => { setLabelUp(true) }}
                    onBlur={(e: any) => { setLabelUp(e.currentTarget.value.trim()) }}
                    id={props.id}
                    name={props.name}
                    autoComplete="off"
                    className={`h-10 px-3 bg-white border ${props.errorText && props.isTouched ? "border-red-500" : "border-neutral-300 focus:border-blue-500"} outline-none rounded-md w-full`}
                />

            </div>

            {props.errorText && props.isTouched && <div className='text-red-500 text-xs'>{props.errorText}</div>}

        </div>
    )
}

export default FormikField;