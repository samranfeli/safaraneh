import type { NextPage } from 'next';
import Head from 'next/head';
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
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import Layout from '@/components/shared/layout';

const Home: NextPage = ({ blogs, portalData }: { blogs?: BlogItemType[], portalData?: PortalDataType }) => {

  const dispatch = useAppDispatch();
  const portalInformation = useAppSelector(state => state.portal);

  if (portalData && !portalInformation.Phrases.length ){
    dispatch(setReduxPortal({
      MetaTags: portalData.MetaTags,
      Phrases: portalData.Phrases
    }));
  }

  let logo = "";
  let siteName = "";
  let favIconLink = "favicon.ico";
  let tel = "";
  let instagram = "";
  let facebook = "";
  let linkedin = "";
  let twitter = "";

  if (portalData) {
    logo = portalData.Phrases.find(item => item.Keyword === "Logo")?.ImageUrl || "";
    siteName = portalData.Phrases.find(item => item.Keyword === "Name")?.Value || "";
    favIconLink = portalData.Phrases.find(item => item.Keyword === "Favicon")?.Value || "";

    tel = portalData.Phrases.find(item => item.Keyword === "PhoneNumber")?.Value || "";
    instagram = portalData.Phrases.find(item => item.Keyword === "Instagram")?.Value || "";
    facebook = portalData.Phrases.find(item => item.Keyword === "Facebook")?.Value || "";
    linkedin = portalData.Phrases.find(item => item.Keyword === "Linkedin")?.Value || "";
    twitter = portalData.Phrases.find(item => item.Keyword === "Twitter")?.Value || "";
  }

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={favIconLink} />
      </Head>

      <Layout
        logo={logo}
        siteName={siteName}
        contactInfo={{
          instagram:instagram,
          facebook: facebook,
          linkedin: linkedin,
          twitter: twitter,
          tel: tel
        }}
      >

        <Banner />
        <ModulesBanner />
        <SuggestedHotels />
        <PopularCities />
        <BeachHotels />
        <Unknowns />
        {blogs && <RecentBlogs blogs={blogs} />}
        <Services siteName={siteName} />
        <AboutSummary
          logo={logo}
          siteName={siteName}
        />
        <HomeFAQ />
        <Newsletter />

      </Layout>
    </>
  )
}

export const getStaticProps = async (context: any) => {

  const [recentBlogPost, portalData] = await Promise.all<[any, any]>([
    getBlogs(4),
    getPortal("fa-IR")
  ]);


  return ({
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'home']),
      context: context,
      blogs: recentBlogPost?.data || null,
      portalData: portalData?.data || null
    }
  })
};

export default Home;
