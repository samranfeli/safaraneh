import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Banner from '@/components/home/banner'
import ModulesBanner from '@/components/home/modules-banner';

const Home:NextPage = () => {
  return (
    <>
      <Banner />
      <ModulesBanner />
    </>
  )
}

export const getStaticProps = async (context:any) => ({
  props: {
    ...await serverSideTranslations(context.locale, ['common','home']),
    context:context
  }
});

export default Home;
