import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HotelList:NextPage = () => {

  const { t } = useTranslation('common');

  return (

    <div>
      <h1 className='text-4xl flex h-60 items-center justify-center'>
          در حال توسعه ...
      </h1>
      <p className='text-center text-red-500 text-3xl font-bold'>
      {t('change-search')}
      </p>
    </div>

  )
}



export const getServerSideProps: GetServerSideProps = async (context: any) => {

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'home']))
    },
  })
}





export default HotelList;
