import { i18n } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next'; 
import type { AppProps } from 'next/app';
import App from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';

import '../styles/carousel.scss';
import '../styles/mobiscroll.scss';
import '../styles/globals.scss';
import '../styles/leaflet.css';

import { store } from '../modules/shared/store';
import { PortalDataType } from '@/modules/shared/types/common';
import { getPortal } from '@/modules/shared/actions/portalActions';
import Layout from '@/modules/shared/layout';

type TProps = Pick<AppProps, "Component" | "pageProps"> & {
  portalData?: PortalDataType;
};

function MyApp({ Component, pageProps, portalData }: TProps) {
  const router = useRouter();
  
  const { locale } = router;
  const dir = locale === 'fa' ? 'rtl' : 'ltr';
  
  useEffect(() => {
    i18n?.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.dir = dir;
  },[dir]);

  useEffect(()=>{
    const locale = localStorage.getItem("publicLocale");
    if (locale){
      router.push(router.asPath, router.asPath, { locale: locale });
    }
  },[]);


  const tel = portalData?.Phrases?.find(item => item.Keyword === "PhoneNumber")?.Value || "";
  const instagram = portalData?.Phrases?.find(item => item.Keyword === "Instagram")?.Value || "";
  const facebook = portalData?.Phrases?.find(item => item.Keyword === "Facebook")?.Value || "";
  const linkedin = portalData?.Phrases?.find(item => item.Keyword === "Linkedin")?.Value || "";
  const twitter = portalData?.Phrases?.find(item => item.Keyword === "Twitter")?.Value || "";

  const logo = portalData?.Phrases?.find(item => item.Keyword === "Logo")?.ImageUrl || "";
  const siteName = portalData?.Phrases?.find(item => item.Keyword === "Name")?.Value || "";
  const favIconLink = portalData?.Phrases?.find(item => item.Keyword === "Favicon")?.Value || "";

  const portalTitle = portalData?.MetaTags?.find(item => item.Name === "title")?.Content || "";
  const portalKeywords = portalData?.MetaTags?.find(item => item.Name === "keywords")?.Content || "";
  const portalDescription = portalData?.MetaTags?.find(item => item.Name === "description")?.Content || "";

  return (
    <Provider store={store}>
      
      <Head>
        
        <link rel="icon" type="image/x-icon" href={favIconLink} />
        
        {!!portalTitle && <title>{portalTitle}</title>}
        {!!portalKeywords && <meta name="keywords" content={portalKeywords} />  }
        {!!portalDescription && <meta name="description" content={portalDescription} />  }

      </Head>
      
      <Layout
          contactInfo={
          {tel: tel,
          instagram: instagram,
          linkedin: linkedin,
          twitter: twitter,
          facebook: facebook}
        }
        logo={logo}
        siteName={siteName}
      >

        <Component {...pageProps} portalData={portalData} />
      
      </Layout>
    
    </Provider>
  )
}

MyApp.getInitialProps = async (
  context: any
): Promise<any> => {
  const ctx = await App.getInitialProps(context);

  const portalData = await  getPortal(context?.locale === "en" ? "en-US" : "fa-IR")

  return { ...ctx, portalData: portalData?.data || null };
};

export default appWithTranslation(MyApp);
