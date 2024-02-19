import { CountryCodes } from '@/enum/models';
import { Field } from 'formik';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { validateMobileNumberId } from '../../helpers/validation';
import { useTranslation } from 'next-i18next';

type Props = {
    disabled?:boolean;
    errorText?: string;
    isTouched?: boolean;
    label?: string;
    name?: string;
    className?: string;
    onChange: (v: string) => void;
    defaultCountry: {
        countryCode: string;
        dialCode: string;
        format?: string
    }
    initialValue?: string;
    labelIsSimple?: boolean;
    showRequiredStar?: boolean;
    showNotConfirmedBadge?: boolean;
}

type CountryObject = {
    countryCode: string;
    dialCode: string;
    format?: string
}


const PhoneInput: React.FC<Props> = props => {

    const { errorText, isTouched, defaultCountry, initialValue } = props;

    const { t } = useTranslation('common');

    const codeRef = useRef<HTMLDivElement>(null);

    let initialCountry: CountryObject | undefined = undefined;

    let initialNumberValue: string = "";

    if (initialValue) {

        const initialCountryArray = CountryCodes.find(item => initialValue.replace("+", "").startsWith(item[3].toString()));
        if (initialCountryArray) {
            initialCountry = {
                countryCode: initialCountryArray[2] as string,
                dialCode: initialCountryArray[3] as string,
                format: initialCountryArray[4] as string
            }
            const code = initialCountryArray[3] as string;

            initialNumberValue = initialValue.replace("+", "").substring(code?.length || 0);
        }
    }

    const [typedCode, setTypedCode] = useState<string>("");
    const [openCodes, setOpenCodes] = useState<boolean>(false);
    const [country, setCountry] = useState<CountryObject>(initialCountry || defaultCountry);
    const [phoneNumberValue, setPhoneNumberValue] = useState<string>(initialNumberValue);

    const [labelUp, setLabelUp] = useState<boolean>(!!initialNumberValue);

    const handleClickOutside = (e: any) => {
        if (codeRef.current && !codeRef.current.contains(e.target)) {
            setOpenCodes(false);
        }
    };

    const closeOnTab = (event: any) => {
        if (event.keyCode === 9) {
            setOpenCodes(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', closeOnTab);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', closeOnTab);
        };
    }, []);


    useEffect(() => {
        setTypedCode("");
    }, [country?.dialCode]);

    useEffect(() => {
        if (country && phoneNumberValue) {
            props.onChange("+" + country.dialCode + phoneNumberValue)
        }
    }, [country.dialCode, phoneNumberValue])

    const selectCountry = (item: any[]) => {
        setOpenCodes(false);
        setTypedCode("+" + item[3]);
        const itemCountryObject = {
            countryCode: item[2],
            dialCode: item[3],
            format: item[4] || "",
            name: item[0]
        }
        setCountry(itemCountryObject);
    };

    let typedValue = typedCode.toLowerCase();
    if (typedCode[0] === "+") {
        typedValue = typedValue.substring(1);
    }

    const filterCodeItems = (CountryCodes.filter((item) => {

        if (!typedCode || country) {
            return true;
        }
        return (item[0].toString().toLocaleLowerCase().includes(typedValue)) ||
            (item[2].toString().toLocaleLowerCase().includes(typedValue)) ||
            (item[3].toString().toLocaleLowerCase().includes(typedValue))
    }).sort(b => {
        if (b[3].toString().startsWith(typedValue) || b[0].toString().startsWith(typedValue) || b[2].toString().startsWith(typedValue)) {
            return -1;
        }
        return 1
    })
    );

    const expectedLength = country?.format?.replaceAll(" ", '')?.replaceAll('+', "")?.replaceAll("(", "")?.replaceAll(")", "")?.replaceAll('-', "")?.length;
    const expectedTotalLength = expectedLength ? expectedLength + country.dialCode.length : undefined;

    return (
        <div className={props.className || ""}>
            <div className='relative'>
                <div className='flex justify-between items-start'>
                    {!!props.label ? (
                        <label
                            className={`select-none pointer-events-none block leading-4 ${props.labelIsSimple ? "mb-3" : "z-10 absolute px-2 bg-white transition-all duration-300 -translate-y-1/2 right-1"} ${props.labelIsSimple ? "text-base" : labelUp ? "top-0 text-xs" : "top-1/2 text-sm"}`}
                        >
                            {!!(props.labelIsSimple && props.showRequiredStar) && <span className='text-red-600'>* </span>}
                            {props.label}
                        </label>
                    ) : (<div />)}
                    {props.showNotConfirmedBadge && (
                        <div className='bg-amber-100 text-xs text-neutral-500 leading-6 px-3 rounded-lg before:inline-block before:w-2 before:h-2 before:bg-amber-400 before:rounded-full before:align-middle before:ltr:mr-1 before:rtl:ml-1'>
                            تایید نشده
                        </div>
                    )}
                </div>
                <div className='relative grid grid-cols-5 text-sm' dir='ltr' ref={codeRef}>

                    {!typedCode && <div className='absolute left-3 top-1/2 -translate-y-1/2 flex gap-2 items-center pointer-events-none'>
                        <Image
                            src={`/images/flags/${country?.countryCode || defaultCountry.countryCode}.svg`}
                            alt={country?.countryCode || defaultCountry.countryCode}
                            width={30}
                            height={16}
                            className='w-8 h-5 object-cover border'
                        /> +{country?.dialCode}
                    </div>}

                    <Field
                        className={`h-10 border ${errorText && isTouched ? "border-red-500" : "border-neutral-300 focus:border-blue-500"} px-22 rounded-l-md col-span-2 px-2 outline-none`}
                        type='text'
                        autoComplete="off"
                        disabled={props.disabled}
                        onChange={(e: any) => { setTypedCode(e.target.value) }}
                        value={typedCode || ""}
                        onFocus={() => { setOpenCodes(true); }}
                    />

                    <input
                        disabled={props.disabled}
                        type='text'
                        onFocus={() => { setLabelUp(true) }}
                        onBlur={(e: any) => { setLabelUp(e.currentTarget.value.trim()) }}
                        autoComplete="off"
                        onChange={(e: any) => { if (["0", "۰", "٠"].includes(e.target.value[0])) return; setPhoneNumberValue(e.target.value) }}
                        value={phoneNumberValue}
                        maxLength={expectedLength || 15}
                        className={`h-10 border ${errorText && isTouched ? "border-red-500" : "border-neutral-300 focus:border-blue-500"} px-2 col-span-3 border-l-none rounded-r-md outline-none`}
                    />

                    <Field
                        validate={(value: string) => validateMobileNumberId({
                            expectedLength: expectedTotalLength,
                            invalidMessage: t('invalid-phone-number'),
                            reqiredMessage: t('please-enter-phone-number'),
                            value: value
                        })}
                        type='hidden'
                        name={props.name}
                    />

                    {!!openCodes && <div className='absolute top-full left-0 min-w-full bg-white shadow z-10 max-h-44 overflow-auto'>
                        {filterCodeItems.map(item => {
                            return (
                                <div
                                    className='flex gap-2 items-center text-sm select-none cursor-pointer hover:bg-neutral-800 border-neutral-800 hover:text-white px-2'
                                    dir='ltr'
                                    key={item[2].toString()}
                                    onClick={() => { selectCountry(item) }}
                                >
                                    <Image src={`/images/flags/${item[2]}.svg`} alt={item[0]! as string} width={30} height={16} className='w-8 h-5 object-cover border' />
                                    +{item[3]}
                                </div>
                            )
                        })}
                    </div>}

                </div>
            </div>
            {errorText && isTouched && <div className='text-red-500 text-xs'>{errorText}</div>}
        </div>
    )
}

export default PhoneInput;