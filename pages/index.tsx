import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Banner from '@/components/home/banner'
import ModulesBanner from '@/components/home/modules-banner';
import SuggestedHotels from '@/components/home/SuggestedHotels';

const Home:NextPage = () => {
  return (
    <>
      <Banner />
      <ModulesBanner />
      <SuggestedHotels />
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
