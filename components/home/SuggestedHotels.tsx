import { useTranslation } from 'next-i18next';

const SuggestedHotels : React.FC = () => {

    const { t } = useTranslation('common');

    return(
        <div className="max-w-container mx-auto p-5 md:py-10">

        <h2 className='text-xl font-bold mb-4'>{t('suggested-hotels')}</h2>
            SuggestedHotels
        </div>
    )
}

export default SuggestedHotels;