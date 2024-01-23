import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const Capacity: NextPage = () => {
  
  const {t:tHotel} = useTranslation('hotel');

  return (
    <>
        <Head>
            <title>{tHotel("checking-capacity")}</title>
        </Head>
    
    در حال توسعه... 
        
    </>
  )
}

export const getStaticProps = async (context: any) => {
  return ({
    props: {
      ...await serverSideTranslations(context.locale, ['common','hotel']),
      context: context
    }
  })
};

export default Capacity;
