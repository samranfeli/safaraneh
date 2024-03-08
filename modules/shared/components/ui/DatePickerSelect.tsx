import { useState, useEffect } from 'react';
import { dateDiplayFormat, persianNumbersToEnglish, shamsiToMiladi } from '../../helpers';
import { Field } from 'formik';

type Props = {
    min: string;
    max: string;
    shamsi?: boolean;
    label?: string;
    descending?: boolean;
    initialValue?: string;
    labelIsSimple?: boolean;
    onChange?: (value: string) => void;
    validateFunction?: (value: string) => void;
    value?: string;
    name?:string;
    id?: string;
    errorText?: string;
    isTouched?: boolean;
    setFieldValue?: any;
}

const DatePickerSelect: React.FC<Props> = props => {

    const { min, max, shamsi, descending } = props;

    const localizedInitialValue = props.initialValue ? persianNumbersToEnglish(dateDiplayFormat({ date: props.initialValue, locale: shamsi ? 'fa' : 'en', format: "YYYY-MM-DD" })) : "";
    const localalizedMin = persianNumbersToEnglish(dateDiplayFormat({ date: min, locale: shamsi ? 'fa' : 'en', format: "YYYY-MM-DD" }));
    const localalizedMax = persianNumbersToEnglish(dateDiplayFormat({ date: max, locale: shamsi ? 'fa' : 'en', format: "YYYY-MM-DD" }));

    const minYear = localalizedMin.split('-')[0];
    const maxYear = localalizedMax.split('-')[0];

    const minMonth = localalizedMin.split('-')[1];
    const maxMonth = localalizedMax.split('-')[1];

    const minDay = localalizedMin.split('-')[2];
    const maxDay = localalizedMax.split('-')[2];

    const initialYear = localizedInitialValue ? localizedInitialValue.split("-")[0] : "";
    const initialMonth = localizedInitialValue ? localizedInitialValue.split("-")[1] : "";
    const initialDay = localizedInitialValue ? localizedInitialValue.split("-")[2] : "";

    const [year, setYear] = useState<string>(initialYear);
    const [month, setMonth] = useState<string>(initialMonth);
    const [day, setDay] = useState<string>(initialDay);


    useEffect(() => {
        if (day && month && year) {

            const dateArray = shamsiToMiladi(+year, +month, +day);

            if(props.setFieldValue){
                props.setFieldValue(props.name,dateArray.join("-"), true);
            }

            if(props.onChange){
                props.onChange(dateArray.join("-"))
            }

        }
    }, [day, month, year]);


    let yearsArray = [];
    for (let i = +minYear; i <= +maxYear; i++) {
        yearsArray.push(i);
    }
    if (descending) {
        yearsArray.reverse()
    }

    const persianMonths = [
        '1 - فروردین',
        '2 - اردیبهشت',
        '3 - خرداد',
        '4 - تیر',
        '5 - مرداد',
        '6 - شهریور',
        '7 - مهر',
        '8 - آبان',
        '9 - آذر',
        '10 - دی',
        '11 - بهمن',
        '12 - اسفند'
    ];


    let monthsArray: string[] = [...persianMonths];

    if (year === maxYear) {
        monthsArray = persianMonths.filter(item => {
            const monthNumber = item.split(" - ")[0];
            return (+maxMonth >= +monthNumber);
        })
    }
    if (year === minYear) {
        monthsArray = persianMonths.filter(item => {
            const monthNumber = item.split(" - ")[0];
            return (+minMonth <= +monthNumber);
        })
    }

    const days = [];
    for (let i = 1; i <= 31; i++) {
        days.push(i.toString());
    }

    let daysArray: string[] = [...days];

    if (+month >= 7) {
        daysArray = [...daysArray].filter(item => +item !== 31)
    }

    if (year === maxYear && month === maxMonth) {
        daysArray = [...daysArray].filter(item => item <= maxDay);
    }

    if (year === minYear && month === minMonth) {
        daysArray = [...daysArray].filter(item => item >= minDay);
    }

    const selectClassName = `focus:border-blue-500 h-10 px-2 text-sm bg-white border outline-none rounded-md w-full ${props.errorText && props.isTouched ? "border-red-500" : "border-neutral-300 focus:border-blue-500"}`


    return (
        <div className='relative'>
            {!!props.label && (
                <label 
                    className={`select-none pointer-events-none block leading-4 ${props.labelIsSimple ? "mb-3 text-base" : "top-0 text-xs z-10 text-sm absolute px-2 bg-white transition-all duration-300 -translate-y-1/2 rtl:right-1 ltr:left-1"}  `}
                >
                    {props.label}
                </label>
            )}
            <div className='flex rtl:text-right gap-1 rtl:flex-row-reverse'>

                <select
                    className={selectClassName}
                    onChange={e => { setYear(e.target.value) }}
                    value={year}
                >
                    <option disabled value=""> سال </option>
                    {yearsArray.map(item => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    className={selectClassName}
                    onChange={e => { setMonth(e.target.value) }}
                    value={month}
                >
                    <option disabled value=""> ماه </option>
                    {monthsArray.map(item => {
                        const value = item.split(" - ")[0]
                        return (
                            <option
                                key={item}
                                value={value}
                            >
                                {item}
                            </option>
                        )
                    })}
                </select>


                <select
                    className={selectClassName}
                    onChange={e => { setDay(e.target.value) }}
                    value={day}
                >
                    <option disabled value=""> روز </option>
                    {daysArray.map(item => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

            </div>

            <Field
                hidden
                validate={props.validateFunction}
                dir='ltr'
                name={props.name}
                id={props.id}
                type='text'
                readOnly
                value={props.value}
                validateFunction={props.validateFunction}
            />
            
            {props.errorText && props.isTouched && <div className='text-red-500 text-xs'>{props.errorText}</div>} 

        </div>
    )
}

export default DatePickerSelect;