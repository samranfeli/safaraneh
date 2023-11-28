import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker as MobiscrollDatepicker, setOptions, localeFa, localeEn } from '@mobiscroll/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Calendar,CalendarToggle } from './icons';

type Props = {
    onChange: (args: any, inst: any) => void;
    rtl?: boolean;
    range?: boolean;
    locale?: any;
}

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const DatePicker: React.FC<Props> = props => {

    const { rtl, range } = props;

    const { t } = useTranslation('common');

    const [locale, setLocale] = useState<any>(localeFa);

    const [values, setValues] = useState<[string, string]>(["", ""]);

    useEffect(() => {
        setLocale(props.locale);
    }, [props.locale]);

    const onChange = (args: any, inst: any) => {
        setValues(args.valueText?.split('-'));
        props.onChange(args, inst);
    }

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
        date:item,
        cellCssClass:"red"
    }));
    

    return (
        <div className={`${locale === localeFa ? 'persian-datepicker-wrapper' : ''} relative`} >
            <Calendar className='w-5 h-5 fill-current absolute right-2 top-1/2 -mt-2.5 z-10 pointer-events-none' />
            <MobiscrollDatepicker
                cssClass={`mobi-date-picker ${locale === localeFa ? 'persian-date-picker' : ''}`}
                controls={['calendar']}
                select={range ? "range" : "date"}
                returnFormat="iso8601"
                rtl={rtl || false}
                locale={locale}
                responsive={{
                    small: {
                        pages: 1,
                        touchUi: true
                    },
                    large: {
                        pages: 2,
                        touchUi: false
                    }
                }}
                inputProps={{
                    inputStyle: 'box',
                    placeholder: 'انتخاب تاریخ'
                }}
                min={new Date()}
                marked={marked}


                onChange={onChange}

            >
                <div className='mobi-date-picker-footer flex justify-center md:justify-between items-center p-5 border-t border-neutral-300'>

                    {values && values[0] ? (
                        <div className='items-center gap-1 justify text-sm hidden md:flex'>
                            ورود
                            <span className='px-3 font-bold'>
                                {(values && values[0]) || " "}
                            </span>
                            -
                            خروج
                            <span className='px-3 font-bold'>

                                {(values && values[1]) || " "}
                            </span>
                        </div>
                    ) : (
                        <div />
                    )}

                    <button
                        type='button'
                        className='text-primary-700 text-sm flex gap-2 items-center'
                        onClick={() => { setLocale((previousLocale: any) => previousLocale === localeFa ? localeEn : localeFa) }}
                    >
                        <CalendarToggle className='w-5 h-5 fill-current' /> {locale === localeFa ? t('gregorianCalendar') : t('iranianCalendar')}
                    </button>
                </div>

            </MobiscrollDatepicker>
        </div>
    )
}

export default DatePicker;