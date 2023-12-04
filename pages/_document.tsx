import { Html, Head, Main, NextScript } from 'next/document';
import { i18n } from 'next-i18next';

export default function Document() {
  return (
    <Html lang={i18n?.language === "en" ? "en" :"fa"} dir={i18n?.language === "en" ? "ltr" :"rtl"}>
      <Head />
      <body className="bg-body-background text-neutral-700" >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
