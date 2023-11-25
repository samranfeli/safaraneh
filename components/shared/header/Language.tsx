import { i18n } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Language: React.FC = () => {

    const router = useRouter();

    const languages = ["fa", "en"];

    const [open, setOpen] = useState<boolean>(false);

    const [currentLang, setCurrentLang] = useState<string>(i18n?.language || "");

    useEffect(() => {
        changeLocale(currentLang);
        setOpen(false);
    }, [currentLang]);

    const changeLocale = (locale: string) => {
        localStorage.setItem("publicLocale", locale);
        router.push(router.asPath, router.asPath, { locale: locale });
    }

    return (
        <div className='relative' >
            <button type='button' aria-label='language switch' className='px-3 py-2' onClick={() => { setOpen(prevState => !prevState) }} >
                {currentLang}
            </button>
            <div className={`absolute rounded overflow-hidden top-full left-0 right-0 shadow-normal bg-white ${open ? "transition-all visible opacity-100 mt-0" : "invisible opacity-0 -mt-3"}`} >
                {languages.map(lang => (
                    <div
                        key={lang}
                        onClick={() => { setCurrentLang(lang) }}
                        className='cursor-pointer text-center transition-all hover:bg-blue-100'
                    >
                        {lang}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Language;