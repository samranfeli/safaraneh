import { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from 'next-i18next';

export default function Document() {
  return (
    <Html lang={i18n?.language === "en" ? "en" : "fa"} dir={i18n?.language === "en" ? "ltr" : "rtl"}>
      <Head>
      </Head>
      <body className="bg-body-background text-neutral-700 rtl:font-samim" >
        <Main />
        <div id="modal_portal" className='relative z-50'></div>
        <NextScript />
      </body>
    </Html>
  )
}
