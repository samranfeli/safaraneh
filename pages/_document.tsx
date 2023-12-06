import { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from 'next-i18next';

export default function Document() {
  return (
    <Html lang={i18n?.language === "en" ? "en" : "fa"} dir={i18n?.language === "en" ? "ltr" : "rtl"}>

      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
        />
      </Head>

      <body className="bg-body-background text-neutral-700" >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
