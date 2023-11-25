import { i18n } from 'next-i18next';
import { useRouter } from 'next/router';

const Language: React.FC = () => {

    const router = useRouter();
    const languages = ["fa", "en"]

    const changeLocale = (locale : string) => {
        localStorage.setItem("publicLocale",locale);
        router.push(router.asPath, router.asPath, { locale: locale });
    }
    
    return (
        <select onChange={e => {changeLocale(e.target.value)}} value={i18n?.language} className="outline-none text-neutral-600">
            {languages.map(lang => (
                <option value={lang} key={lang}>
                    {lang}
                </option>
            ))}
        </select>
    )
}

export default Language;