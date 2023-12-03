import { getpageByUrl } from '@/actions';
import { getAccommodationById, getDomesticHotelDetailByUrl, getScore } from '@/actions/hotelActions';
import type { GetServerSideProps, NextPage } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { PageDataType } from '@/types/common';
import { DomesticHotelDetailType } from '@/types/hotel';
import { useRouter } from 'next/router';
import BackToList from '@/components/hotel/hotelDetails/BackToList';
import { Phone } from '@/components/shared/ui/icons';

type Props = {
  pageData: PageDataType;
  hotelData: DomesticHotelDetailType;
  hotelScoreData: any;
  accommodationData: any;
}

const HotelDetail: NextPage<Props> = props => {

  const { accommodationData, hotelData, hotelScoreData, pageData } = props;


  const router = useRouter();
  const searchInfo = router.asPath;

  let checkin: string = "";
  let checkout: string = "";

  if (searchInfo.includes("checkin-")) {
    checkin = searchInfo.split("checkin-")[1].split("/")[0];
  }
  if (searchInfo.includes("checkout-")) {
    checkout = searchInfo.split("checkout-")[1].split("/")[0];
  }


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


      <div className="max-w-container mx-auto p-5">
        <div className='bg-white p-3'>
          {!!hotelData.IsCovid && <div className='bg-emerald-700 p-4 text-white text-sm rounded-md flex gap-2 items-center m-1 mb-3'>
            <Phone className='w-6 h-6 fill-current block' />
            جهت رزرو با شماره <a href="tel:+982126150051" className='underline text-base'> 02126150051 </a> تماس بگیرید.
          </div>}
          <BackToList checkin={checkin} checkout={checkout} cityId={hotelData.CityId} cityName={hotelData.CityName} />



        </div>

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
