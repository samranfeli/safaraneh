import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker as MobiscrollDatepicker, setOptions, localeFa, localeEn } from '@mobiscroll/react';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';

import { CalendarToggle } from './icons';
import { dateDiplayFormat } from '../../helpers';
import { Field } from 'formik';

type Props = {
    onChange?: (args: any, inst: any) => void;
    rtl?: boolean;
    setFieldValue: any;
    locale?: any;
    initialvalue?: string;
    label?:string;
    labelIsSimple?:boolean;
    errorText?: string;
    isTouched?: boolean;
    name?: string;
    id?:string;
    fieldClassName?: string;
    validateFunction?: (value: string) => void;
}

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const DatePicker: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const [locale, setLocale] = useState<any>(localeFa);

    const [value, setValue] = useState<string | undefined>(props.initialvalue);

    const datePickerRef = useRef<any>(null);

    const [instance, setInstance] = useState<any>(null);

    useEffect(() => {
        if (props.locale){
            setLocale(props.locale);
        }
    }, [props.locale]);

    const fridays: string[] = [
        '2023-11-24',
        '2023-12-01',
        '2023-12-08',
        '2023-12-15',
        '2023-12-17',
        '2023-12-22',
        '2023-12-29',
        '2024-01-05',
        '2024-01-12',
        '2024-01-19',
        '2024-01-25',
        '2024-01-26'
    ];

    const marked = fridays.map(item => ({
        date: item,
        cellCssClass: "red"
    }));

    const goToday = () => {
        instance?.navigate(new Date(2016, 1, 1));
    }

    let dateValue = "";

    if (value) {
        dateValue = dateDiplayFormat({date:value, format:"yyyy/mm/dd", locale:locale === localeFa ? "fa": "en" });
    }

    useEffect(()=>{
        if (value){
            props.setFieldValue(props.name, value, true);
        }
    },[value]);

    return (
        <div className={`${locale === localeFa ? 'persian-datepicker-wrapper' : ''} relative text-xs`} >

            <div className='relative'>
                {!!props.label && (
                    <label
                        htmlFor={props.id}
                        className={`z-10 select-none pointer-events-none block leading-4 ${props.labelIsSimple ? "mb-3" : "absolute px-2 bg-white transition-all duration-300 -translate-y-1/2 rtl:right-1 ltr:left-1"} ${props.labelIsSimple ? "text-base" : value ? "top-0 text-xs" : "top-1/2 text-sm"}`}
                    >
                        {props.label}
                    </label>
                )}
                    <Field
                        validate={props.validateFunction}
                        id={props.id}
                        name={props.name}
                        value={dateValue}
                        autoComplete="off"
                        className={`${props.fieldClassName || ""} h-10 px-3 bg-white border ${props.errorText && props.isTouched ? "border-red-500" : "border-neutral-300 focus:border-blue-500"} outline-none rounded-md w-full`}
                    />
            </div>

            <div className='absolute top-0 left-0 right-0 h-full opacity-0'>
                <MobiscrollDatepicker
                    ref={datePickerRef}
                    onInit={(_, inst) => { setInstance(inst) }}
                    cssClass={`mobi-date-picker ${locale === localeFa ? 'persian-date-picker' : ''}`}
                    controls={['calendar']}
                    select="date"
                    returnFormat="iso8601"
                    rtl={locale === localeFa}
                    locale={locale}
                    responsive={{
                        small: {
                            pages: 1,
                            touchUi: true
                        },
                        large: {
                            pages: 1,
                            touchUi: false
                        }
                    }}
                    defaultSelection={props.initialvalue}
                    inputProps={{
                        inputStyle: 'box',
                        placeholder: 'انتخاب تاریخ'
                    }}
                    min={new Date()}
                    marked={marked}
                    value={value}
                    showRangeLabels={false}
                    onChange={(args:any) => {
                        setValue(args.value);
                    }}
                >

                    <footer className='direction-root font-samim mobi-date-picker-footer flex justify-center gap-5 md:justify-between items-center px-5 py-4 border-t border-neutral-300'>
                        <button type='button' onClick={goToday} className='text-primary-700 text-sm'>
                            {t('goToToday')}
                        </button>


                        <button
                            type='button'
                            className='text-primary-700 text-sm flex gap-2 items-center'
                            onClick={() => { setLocale((previousLocale: any) => previousLocale === localeFa ? localeEn : localeFa) }}
                        >
                            <CalendarToggle className='w-5 h-5 fill-current' /> {locale === localeFa ? t('gregorianCalendar') : t('iranianCalendar')}
                        </button>
                    </footer>


                </MobiscrollDatepicker>
            </div>

            {props.errorText && props.isTouched && <div className='text-red-500 text-xs'>{props.errorText}</div>}

        </div>
    )
}

export default DatePicker;