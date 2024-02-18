import { Field } from 'formik';
import { ChangeEvent, useState, useEffect } from 'react';
import { Eye, Eye2 } from './icons';

type Props = {
    errorText?: string;
    isTouched?: boolean;
    label?: string;
    maxLength?: number;
    id?: string;
    name?: string;
    className?: string;
    validateFunction?: (value: string) => void;
    setFieldValue:any;
    onChange?: (value: string) => void;
    value: string;
    labelIsSimple?:boolean;
    showRequiredStar?:boolean;
    isPassword?:boolean;
}

const FormikField: React.FC<Props> = props => {

    const [labelUp, setLabelUp] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(props.isPassword || false);

    useEffect(()=>{
        if (props.labelIsSimple){
            return;
        }
        if (props.value){
            setLabelUp(true);
        }else{
            setLabelUp(false);
        }

    },[props.value]);

    let passwordToggleBtn = null;
    
    if (props.isPassword){
        passwordToggleBtn = <button
            type='button'
            className='absolute top-1/2 left-3 -translate-y-1/2 outline-none'
            tabIndex={-1}
            onClick={() => {setIsPassword(prevState => !prevState)}}
        >
            {isPassword ? (
                <Eye2 className='w-5 h-5 fill-neutral-500' /> 
            ):(
                <Eye className='w-5 h-5 fill-neutral-500' />
            )}            
        </button>
    }

    return (
        <div className={`${props.errorText ? "has-validation-error" : ""} ${props.className || ""}`}>
            <div className='relative'>
                {!!props.label && (
                    <label
                        htmlFor={props.id}
                        className={`select-none pointer-events-none block leading-4 ${props.labelIsSimple?"mb-3":"absolute px-2 bg-white transition-all duration-300 -translate-y-1/2 rtl:right-1 ltr:left-1"} ${props.labelIsSimple ? "text-base" : labelUp ? "top-0 text-xs" : "top-1/2 text-sm"}`}
                    >
                        {!!(props.labelIsSimple && props.showRequiredStar) && <span className='text-red-600'>* </span>}
                        {props.label}
                    </label>
                )}
                <div className='relative'>
                    <Field
                        maxLength={props.maxLength || undefined}
                        validate={props.validateFunction}
                        onFocus={() => {props.labelIsSimple? null :setLabelUp(true) }}
                        onBlur={(e: any) => { props.labelIsSimple? null : setLabelUp(e.currentTarget.value.trim()) }}
                        id={props.id}
                        name={props.name}
                        autoComplete="off"
                        className={`h-10 px-3 bg-white border ${props.errorText && props.isTouched ? "border-red-500" : "border-neutral-300 focus:border-blue-500"} outline-none rounded-md w-full`}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => {
                            props.setFieldValue(props.name, e.target.value, true);
                            if(props.onChange){
                                props.onChange(e.target.value);
                            }
                        }}
                        value={props.value}
                        type={isPassword?"password":"text"}

                    />
                    
                    {passwordToggleBtn}
                </div>
            </div>

            {props.errorText && props.isTouched && <div className='text-red-500 text-xs'>{props.errorText}</div>}

        </div>
    )
}

export default FormikField;