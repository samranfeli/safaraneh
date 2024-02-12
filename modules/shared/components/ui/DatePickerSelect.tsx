import { useState, useEffect } from 'react';
import { dateDiplayFormat, persianNumbersToEnglish } from '../../helpers';
import Select from './Select';
import InputSelect from './InputSelect';

type Props = {
    emptyDefault?: boolean;
    min: string;
    max: string;
    shamsi?: boolean;
    label?: string;
    descending?: boolean;
}

const DatePickerSelect: React.FC<Props> = props => {


    const localalizedMin = persianNumbersToEnglish(dateDiplayFormat({ date: props.min, locale: props.shamsi ? 'fa' : 'en', format: "YYYY-MM-DD" }));
    const localalizedMax = persianNumbersToEnglish(dateDiplayFormat({ date: props.max, locale: props.shamsi ? 'fa' : 'en', format: "YYYY-MM-DD" }));

    const initialValue = props.emptyDefault ? undefined : props.descending ? localalizedMax : localalizedMin;

    const [value, setValue] = useState<string | undefined>(initialValue);

    const minYear = localalizedMin.split('-')[0];
    const maxYear = localalizedMax.split('-')[0];

    const minMonth = localalizedMin.split('-')[1];
    const maxMonth = localalizedMax.split('-')[1];

    let yearsArray = [];
    for (let i = +minYear; i <= +maxYear; i++) {
        yearsArray.push(i);
    }
    if (props.descending) {
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

    const year = value?.split("-")[0];
    
    let monthsArray: string[] = [];

    if (year === maxYear){
        monthsArray = persianMonths.filter(item => {
            const monthNumber = item.split(" - ")[0];
            return (+maxMonth >= +monthNumber);
        })
    }else{
        monthsArray = [...persianMonths];
    }
    debugger

    const days = [];
    for (let i = 1; i <= 31; i++) {
        days.push(i.toString());
    }



    //const [months, setMonths] = useState([]);
    //const [days, setDays] = useState([]);

    // const initialYear = props.emptyDefault ? undefined : props.shamsi ? moment(props.min, props.format).jYear() : moment(props.min, props.format).get('year');
    // const [year, setYear] = useState(initialYear);

    // const initialMonth = props.emptyDefault ? undefined : props.shamsi ? moment(props.min, props.format).jMonth() : moment(props.min, props.format).get('month') + 1 ;
    // const [month, setMonth] = useState(initialMonth);

    // const initialDay = props.emptyDefault ? undefined : props.shamsi ? moment(props.min, props.format).jDate() : moment(props.min, props.format).get('date');
    // const [day, setDay] = useState(initialDay);




    const selectClassName = "h-10 px-2 text-sm bg-white border border-neutral-300 focus:border-blue-500 outline-none rounded-md w-full"

    const changeHandle = (value:any, type:"year"|"month"|"day") => {
        if(type === 'year'){
            setValue(`${value}-01-01`);
        }
    }

    return (
        <>
            {!!props.label && (
                <label className='select-none pointer-events-none block leading-4 mb-3 text-base'>
                    {props.label}
                </label>
            )}
            <div className='flex rtl:text-right gap-1 rtl:flex-row-reverse'>

            <select 
                    className={selectClassName}
                    onChange={e => { changeHandle(e, 'year') }}
                >
                    {yearsArray.map(item => <option key={item} value={item}> {item} </option>)}
                </select>

                <select 
                    className={selectClassName}
                    //onChange={e => { changeHandle(e, 'year') }}
                >
                    {monthsArray.map(item => <option key={item} value={item}> {item} </option>)}
                </select>

                
                <select 
                    className={selectClassName}
                    //onChange={e => { changeHandle(e, 'year') }}
                >
                    {days.map(item => <option key={item} value={item}> {item} </option>)}
                </select>

                {/* <InputSelect
                    items={yearsArray.map(item => ({ label: item.toString(), value: item.toString() }))}
                    onChange={e => { changeHandle(e, 'year') }}
                    value={year?.toString() || ""}
                    className={selectClassName}

                />

                <InputSelect
                    items={monthsArray.map(item => ({ label: item, value: item }))}
                    onChange={e => { debugger }}
                    value='1'
                    className={`${selectClassName}`}
                />

                <InputSelect
                    items={days.map(item => ({ label: item, value: item }))}
                    onChange={e => { debugger }}
                    value='1'
                    className={selectClassName}

                />  */}




            </div>
        </>
    )
}

export default DatePickerSelect;