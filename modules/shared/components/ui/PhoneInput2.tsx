import { Field } from 'formik';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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


const PhoneInput2: React.FC<Props> = props => {

    const { errorText, isTouched, emptyMessage } = props;

    const [value, setValue] = useState<string>('');
    const [country, setCountry] = useState<CountryObject>();


    const phoneInputChangeHandle = (value: string, countryObject: CountryObject) => {
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

    return (
        <>
            <Field
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

            </div>
        </>
    )
}

export default PhoneInput2;