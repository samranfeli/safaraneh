import type { NextPage } from 'next';
import {useEffect} from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
import Services from '@/components/home/Services';
import { getPortal } from '@/actions/portalActions';
import { PortalDataType } from '@/types/common';
import { setReduxPortal } from '@/store/portalSlice';
import { useAppDispatch,useAppSelector } from '@/hooks/use-store';

const Home:NextPage = ({blogs,portalData}:{blogs?:BlogItemType[],portalData?:PortalDataType}) => {

     const dispatch = useAppDispatch();
     const portalInformation = useAppSelector(state => state.portal);


useEffect(()=>{
  const fetchBlogPosts =async () => {
    const posts = await getBlogs(4);
  }

  fetchBlogPosts();
},[]);

     useEffect(()=>{
      if(portalData && !portalInformation.MetaTags?.length){
        dispatch(setReduxPortal({
            MetaTags: portalData.MetaTags,
            Phrases: portalData.Phrases
        }));
      }
     },[portalData]);

  return (
    <>
      <Banner />
      <ModulesBanner />
      <SuggestedHotels />
      <PopularCities />
      <BeachHotels />
      <Unknowns />
      {blogs && <RecentBlogs blogs={blogs} />}
      <Services />
      <AboutSummary />
      <HomeFAQ />
      <Newsletter />
    </>
  )
}

export const getStaticProps = async (context:any) => {
  
  const [recentBlogPost, portalData] = await Promise.all<[any,any]>([
    getBlogs(4),
    getPortal("fa-IR")
  ]);


  return({
    props: {
      ...await serverSideTranslations(context.locale, ['common','home']),
      context:context,
      blogs: recentBlogPost?.data || null,
      portalData: portalData?.data || null
    }
  })
};

export default Home;
