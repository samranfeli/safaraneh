import { getPortal } from '@/modules/domesticHotel/components/portalActions';
import Layout from '@/modules/shared/layout';
import { PortalDataType } from '@/modules/shared/types/common';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = {
  portalData: PortalDataType;
  locale: any;
  query: any;
}

const HotelList:NextPage<Props> = (props) => {

  const {portalData} = props;

  const { t } = useTranslation('common');

  if (props.portalData){
    debugger;
  }

  let logo = "";
  let siteName = "";
  let favIconLink = "favicon.ico";
  let tel = "";
  let instagram = "";
  let facebook = "";
  let linkedin = "";
  let twitter = "";
  let siteURL ="";

  if (portalData) {
    logo = portalData.Phrases.find(item => item.Keyword === "Logo")?.ImageUrl || "";
    siteName = portalData.Phrases.find(item => item.Keyword === "Name")?.Value || "";
    favIconLink = portalData.Phrases.find(item => item.Keyword === "Favicon")?.Value || "";

    tel = portalData.Phrases.find(item => item.Keyword === "PhoneNumber")?.Value || "";
    instagram = portalData.Phrases.find(item => item.Keyword === "Instagram")?.Value || "";
    facebook = portalData.Phrases.find(item => item.Keyword === "Facebook")?.Value || "";
    linkedin = portalData.Phrases.find(item => item.Keyword === "Linkedin")?.Value || "";
    twitter = portalData.Phrases.find(item => item.Keyword === "Twitter")?.Value || "";
    siteURL = portalData.PortalName || "";
  }

  return (
    <Layout 
      logo={logo}
      siteName={siteName}
      contactInfo={{
        instagram: instagram,
        facebook: facebook,
        linkedin: linkedin,
        twitter: twitter,
        tel: tel
      }}
    >
    <div>
      <h1 className='text-4xl flex h-60 items-center justify-center'>
          در حال توسعه ...
      </h1>
      <p className='text-center text-red-500 text-3xl font-bold'>
      {t('change-search')}
      </p>
    </div>
    </Layout>
  )
}



export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const portalData = await getPortal("fa-IR")

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'home'])),
      portalData: portalData.data || null,
      locale: locale || "nullLOCALE",
      query:query || "nullQUERY"

    },
  })
}





export default HotelList;
