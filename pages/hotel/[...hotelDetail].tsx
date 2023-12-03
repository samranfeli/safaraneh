import { getpageByUrl } from '@/actions';
import { getAccommodationById, getDomesticHotelDetailByUrl, getScore } from '@/actions/hotelActions';
import type { GetServerSideProps, NextPage } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { PageDataType } from '@/types/common';
import { DomesticHotelDetailType } from '@/types/hotel';

type Props = {
  pageData: PageDataType;
  hotelData: DomesticHotelDetailType;
  hotelScoreData: any;
  accommodationData: any;
}

const HotelDetail: NextPage<Props> = props => {

  const { accommodationData, hotelData, hotelScoreData, pageData } = props;

  return (
    <>
      <Head>
        {pageData && <>
          <title>{pageData.PageTitle}</title>
          {pageData.MetaTags?.map((item) => (
            <meta name={item.Name} content={item.Content} key={item.Name} />
          ))
            || null}
        </>}

                  
          {hotelData && (
            <>
              <meta property="og:site_name" content="سفرانه" key="site_name" />
              <meta
                property="og:title"
                content={hotelData.PageTitle}
                key="title"
              ></meta>
              <meta
                name="description"
                content={hotelData.MetaDescription}
              ></meta>
              <meta
                property="og:description"
                content={hotelData.MetaDescription}
                key="description"
              ></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:url" content={hotelData.Url}></meta>
              <meta
                property="og:image"
                itemProp="image"
                content={hotelData.ImageUrl}
                key="image"
              ></meta>
              <meta name="og:locale" content="fa-IR" />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content="@safaraneh" />
              <meta name="twitter:title" content={hotelData.PageTitle} />
              <meta
                name="twitter:description"
                content={hotelData.MetaDescription}
              />
            </>
          )}

      </Head>



      <div>

      </div>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ locale, query, req }) => {

  const url = encodeURI(`/${locale}/hotel/${query.hotelDetail![0]}`);

  const pageDetails: any = await getpageByUrl(url, i18n?.language);
  const hotelData: any = await getDomesticHotelDetailByUrl(url, i18n?.language);
  const hotelScoreData: any = await getScore(hotelData.data.HotelId, i18n?.language);
  const accommodationData: any = await getAccommodationById(hotelData.data.HotelId, i18n?.language);


  return ({
    props: {
      ...await serverSideTranslations(locale as string, ['common', 'header']),
      pageData: pageDetails.data,
      hotelData: hotelData.data,
      hotelScoreData: hotelScoreData.data,
      accommodationData: accommodationData.data.result
    },
  })
}


export default HotelDetail;
