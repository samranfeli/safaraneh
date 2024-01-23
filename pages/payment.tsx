import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Payment: NextPage = () => {
  

  return (
    <>
    
    در حال توسعه... 
        
    </>
  )
}

export const getStaticProps = async (context: any) => {
  return ({
    props: {
      ...await serverSideTranslations(context.locale, ['common']),
      context: context
    }
  })
};

export default Payment;
