import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

import Banner from '@/components/home/banner'
import ModulesBanner from '@/components/home/modules-banner';
import SuggestedHotels from '@/components/home/SuggestedHotels';
import PopularCities from '@/components/home/PopularCities';
import BeachHotels from '@/components/home/BeachHotels';
import Unknowns from '@/components/home/Unknowns';
import { getBlogs } from '@/actions/blogActions';
import RecentBlogs from '@/components/home/RecentBlogs';
import { BlogItemType } from '@/types/blog';
import AboutSummary from '@/components/home/AboutSummary';
import HomeFAQ from '@/components/home/HomeFAQ';
import Newsletter from '@/components/home/Newsletter';

const Services = dynamic(() =>
  import('@/components/home/Services'),
)

const Home:NextPage = ({blogs}:{blogs?:BlogItemType[]}) => {

  return (
    <>
      <Banner />
      <ModulesBanner />
      <SuggestedHotels />
      <PopularCities />
      <BeachHotels />
      <Unknowns />
      <RecentBlogs blogs={blogs} />
      <Services />
      <AboutSummary />
      <HomeFAQ />
      <Newsletter />
    </>
  )
}

export const getStaticProps = async (context:any) => {
  
  const recentBlogPost = await getBlogs(4);

  return({
    props: {
      ...await serverSideTranslations(context.locale, ['common','home']),
      context:context,
      blogs: recentBlogPost?.data
    }
  })
};

export default Home;
