import { CountryCodes } from '@/enum/models';
import { Field } from 'formik';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type Props = {
    errorText?: string;
    isTouched?: boolean;
    label?: string;
    name?: string;
    className?: string;
    validateFunction?: (value: string) => void;
    onChange: (v: string) => void;
    emptyMessage?: string;
}

type CountryObject = {
    countryCode: string;
    dialCode: string;
    format: string
    name: string
}


const PhoneInput: React.FC<Props> = props => {

    const { errorText, isTouched, emptyMessage } = props;

    const [value, setValue] = useState<string>('');
    const [country, setCountry] = useState<CountryObject>();


    const phoneInputChangeHandle = (value: string, countryObject: CountryObject) => {
        debugger;
        setCountry(countryObject);
        setValue(value);
    }


    useEffect(() => {
        
        const expectedLength = country?.format?.replaceAll(" ", '')?.replaceAll('+', "")?.replaceAll("(", "")?.replaceAll(")", "")?.replaceAll('-', "")?.length;
        if (expectedLength === value.length) {
            props.onChange(value);
        } else {
            props.onChange("");
        }

    }, [value, country?.format]);

    let isEmpty = true;
    if (value.length && country?.countryCode && value.split(country.countryCode)[1]?.length && emptyMessage) {
        isEmpty = false;
    }

    const items = CountryCodes;
    const ggg = CountryCodes.length;
    debugger;

    return (
        <>
            {/* <Field
                validate={props.validateFunction}
                type='hidden'
                id={"phone_Number"}
                name={'reserver.phoneNumber'}
                value={value}
            />

            <div className='relative'>
                <PhoneInput
                    placeholder={country?.format?.replaceAll(".", "-") || ""}
                    country="ir"
                    onChange={phoneInputChangeHandle}
                    enableSearch
                    inputClass={(errorText && isTouched) ? "has-error" : ""}
                />
                <label className="select-none pointer-events-none block leading-4 absolute px-2 bg-white -translate-y-1/2 rtl:right-1 ltr:left-1 top-0 text-xs">
                    {props.label}
                </label>

                {errorText && isTouched && <div className='text-red-500 text-xs'>
                    {isEmpty ? emptyMessage : errorText}
                </div>}

            </div> */}





            <div className='grid grid-cols-3'>

                <Field

                />

            <Field
                validate={props.validateFunction}
                type='hidden'
                id={"phone_Number"}
                name={'reserver.phoneNumber'}
                value={value}
            />

            </div>

            <div className='ltr'>
                {CountryCodes.map(item => {
                    return <div className='flex gap-2 items-center text-sm select-none cursor-pointer hover:bg-neutral-800 border-neutral-800 hover:text-white px-2' dir='ltr'>
                        <Image src={`/images/flags/${item[2]}.svg`}  alt={item[0]! as string} width={30} height={16} className='h-auto border' />
                        +{item[3]}
                        </div>
                })}
            </div>
        </>
    )
}

export default PhoneInput;