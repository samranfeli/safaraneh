import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Banner from '@/modules/home/components/banner'
import ModulesBanner from '@/modules/home/components/modules-banner';
import SuggestedHotels from '@/modules/home/components/SuggestedHotels';
import PopularCities from '@/modules/home/components/PopularCities';
import BeachHotels from '@/modules/home/components/BeachHotels';
import Unknowns from '@/modules/home/components/Unknowns';
import { getBlogs } from '@/modules/blogs/actions';
import RecentBlogs from '@/modules/home/components/RecentBlogs';
import { BlogItemType } from '@/modules/blogs/types/blog';
import AboutSummary from '@/modules/home/components/AboutSummary';
import HomeFAQ from '@/modules/home/components/HomeFAQ';
import Newsletter from '@/modules/home/components/Newsletter';
import Services from '@/modules/home/components/Services';
import { PortalDataType } from '@/modules/shared/types/common';
import { setReduxPortal } from '@/modules/shared/store/portalSlice';
import { useAppDispatch, useAppSelector } from '@/modules/shared/hooks/use-store';

const Home: NextPage = ({ blogs, portalData }: { blogs?: BlogItemType[], portalData?: PortalDataType}) => {
  
  const dispatch = useAppDispatch();
  const portalInformation = useAppSelector(state => state.portal);

  if (portalData && !portalInformation.Phrases.length ){
    dispatch(setReduxPortal({
      MetaTags: portalData.MetaTags,
      Phrases: portalData.Phrases
    }));
  }
  
  const logo = portalData?.Phrases?.find(item => item.Keyword === "Logo")?.ImageUrl || "";
  const siteName = portalData?.Phrases?.find(item => item.Keyword === "Name")?.Value || "";

  return (
    <>
      <Banner />

      <div className='max-w-container mx-auto px-5'>
        <ModulesBanner />
        <SuggestedHotels />
        <PopularCities />
        <BeachHotels />
        <Unknowns />
      </div>

      <div className='max-w-container mx-auto px-5'>
        {blogs && <RecentBlogs blogs={blogs} />}
        <Services siteName={siteName} />
        <AboutSummary
          logo={logo}
          siteName={siteName}
        />
        <HomeFAQ />
        <Newsletter />
      </div>
        
    </>
  )
}

export const getStaticProps = async (context: any) => {

  const recentBlogPost : any = await getBlogs(4);

  return ({
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'home']),
      context: context,
      blogs: recentBlogPost?.data || null
    }
  })
};

export default Home;
