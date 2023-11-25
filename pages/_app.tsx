//import 'antd/dist/antd.css';
import { i18n } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next'; 
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';

import '../styles/globals.css';
//import '../styles/style.scss';
//import '../styles/custom-antd.scss';
import Layout from '../components/shared/layout';
import { store } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
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

  return (
    <Provider store={store}>
      <Head>
        <title>Safaranehf</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default appWithTranslation(MyApp);
