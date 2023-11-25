import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Banner from '@/components/home/banner'

const Home:NextPage = () => {
  return (
    <Banner />
  )
}

export const getStaticProps = async (context:any) => ({
  props: {
    ...await serverSideTranslations(context.locale, ['common','home']),
    context:context
  }
});

export default Home;
