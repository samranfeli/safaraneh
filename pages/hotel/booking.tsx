import Steps from '@/modules/shared/components/ui/Steps';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const Booking: NextPage = () => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');


    return (
        <>
            <Head>
                <title>{t('reserve-page')}</title>
            </Head>

            <div className='max-w-container mx-auto px-5 py-4'>

                <Steps
                    className='py-3 mb-2'
                    items={[
                        { label: t('completing-information'), status: 'done' },
                        { label: tHotel('checking-capacity'), status: 'done' },
                        { label: t('confirm-pay'), status: 'done' },
                        { label: t('complete-purchase'), status: 'active' }
                    ]}
                />
                جزییات رزرو هتل داخلی
            </div>

        </>
    )
}

export const getStaticProps = async (context: any) => {
    return ({
        props: {
            ...await serverSideTranslations(context.locale, ['common', 'hotel']),
            context: context
        }
    })
};

export default Booking;
