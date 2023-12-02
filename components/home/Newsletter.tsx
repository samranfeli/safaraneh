import { useTranslation } from 'next-i18next';
import { Send } from '../shared/ui/icons';

const Newsletter: React.FC = () => {

    const { t } = useTranslation('common');

    return (
        <div className="max-w-container mx-auto p-5 md:py-10">

            <div className="bg-white p-5 sm:p-7 md:py-10 rounded-lg leading-10 text-justify">
                <div className='grid items-center grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className='text-neutral-600'>
                        <h3 className='text-lg sm:text-3xl font-semibold mb-3'>{t('subscribe')}</h3>
                        <p className='leading-6 text-xs sm:text-sm'>{t('subscribe-desc')}</p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-9 gap-3'>
                        <input 
                            type='text' 
                            name="fullName"
                            className='px-5 border border-neutral-300 h-12 sm:col-span-4 rounded-md outline-none focus:border-neutral-700'
                            placeholder={t('firstname-and-family')}
                        />
                        <input 
                            type='email' 
                            name='email'
                            className='px-5 border border-neutral-300 h-12 sm:col-span-4 rounded-md outline-none focus:border-neutral-700'
                            placeholder={t('email')}
                        />
                        <button 
                            type='button'
                            aria-label="subscribe"
                            title="subscribe"
                            className='bg-red-500 hover:bg-red-600 text-white h-12 w-full sm:w-12 sm:col-span-1 rounded-md flex items-center justify-center'
                        >
                            <Send className='w-6 h-6 fill-current rtl:rotate-180' />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Newsletter;