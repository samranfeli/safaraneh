import type { NextPage } from 'next';
import Head from 'next/head';
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
import { getPortal } from '@/modules/domesticHotel/components/portalActions';
import { PortalDataType } from '@/modules/shared/types/common';
import { setReduxPortal } from '@/modules/shared/store/portalSlice';
import { useAppDispatch, useAppSelector } from '@/modules/shared/hooks/use-store';
import Layout from '@/modules/shared/layout';

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

  const portalTitle = portalData?.MetaTags?.find(item => item.Name === "title")?.Content || "";
  const portalKeywords = portalData?.MetaTags?.find(item => item.Name === "keywords")?.Content || "";
  const portalDescription = portalData?.MetaTags?.find(item => item.Name === "description")?.Content || "";

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={favIconLink} />
        
        {!!portalTitle && <title>{portalTitle}</title>}
        {!!portalKeywords && <meta name="keywords" content={portalKeywords} />  }
        {!!portalDescription && <meta name="description" content={portalDescription} />  }

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

        <div className='max-w-container mx-auto px-5 pt-5 md:pt-10'>
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
        </div>
        

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
