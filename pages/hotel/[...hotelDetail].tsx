import { getpageByUrl } from '@/modules/domesticHotel/components';
import { getAccommodationById, getDomesticHotelDetailByUrl, getScore } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { InView } from 'react-intersection-observer';
import Head from 'next/head';
import { PageDataType, PortalDataType } from '@/modules/shared/types/common';
import { DomesticAccomodationType, DomesticHotelDetailType, EntitySearchResultItemType, HotelScoreDataType } from '@/modules/domesticHotel/types/hotel';
import { useRouter } from 'next/router';
import BackToList from '@/modules/domesticHotel/components/hotelDetails/BackToList';
import { Phone } from '@/modules/shared/components/ui/icons';
import Gallery from '@/modules/domesticHotel/components/hotelDetails/Gallery';
import HotelName from '@/modules/domesticHotel/components/hotelDetails/HotelName';
import SearchForm from '@/modules/domesticHotel/components/shared/SearchForm';
import HotelFacilities from '@/modules/domesticHotel/components/hotelDetails/HotelFacilities';
import HotelTerms from '@/modules/domesticHotel/components/hotelDetails/HotelTerms';
import HotelAbout from '@/modules/domesticHotel/components/hotelDetails/HotelAbout';
import { getPortal } from '@/modules/domesticHotel/components/portalActions';
import Attractions from '@/modules/domesticHotel/components/hotelDetails/Attractions';
import { useAppDispatch, useAppSelector } from '@/modules/shared/hooks/use-store';
import { setReduxPortal } from '@/modules/shared/store/portalSlice';
import FAQ from '@/modules/domesticHotel/components/hotelDetails/FAQ';
import SimilarHotels from '@/modules/domesticHotel/components/hotelDetails/SimilarHotels';
import Comments from '@/modules/domesticHotel/components/hotelDetails/comments';
import Layout from '@/modules/shared/layout';
import Rooms from '@/modules/domesticHotel/components/hotelDetails/Rooms';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import AnchorTabs from '@/modules/domesticHotel/components/hotelDetails/AnchorTabs';

type Props = {
  pageData: PageDataType;
  hotelData: DomesticHotelDetailType;
  hotelScoreData: HotelScoreDataType;
  accommodationData: DomesticAccomodationType;
  portalData: PortalDataType;
}

const HotelDetail: NextPage<Props> = props => {

  const { accommodationData, hotelData, hotelScoreData, pageData, portalData } = props;

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotelDetail');

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

  let defaultDestination: EntitySearchResultItemType | undefined = undefined;

  if (hotelData && hotelData.HotelId) {
    defaultDestination = {
      name: hotelData.HotelName,
      displayName: hotelData.HotelCategoryName + " " + hotelData.HotelName + " " + hotelData.CityName,
      type: 'Hotel',
      id: hotelData.HotelId
    }
  }

  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));
  let defaultDates: [string, string] = [today, tomorrow];

  if (checkin && checkout) {
    defaultDates = [checkin, checkout];
  }


  const dispatch = useAppDispatch();
  const portalInformation = useAppSelector(state => state.portal);

  if (portalData && !portalInformation.Phrases.length) {
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
  let siteURL = "";

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

  if (!hotelData) {
    return null;
  }

  return (
    <>
      <Head>

        <link rel="icon" type="image/x-icon" href={favIconLink} />

        {pageData && <>
          <title>{pageData.PageTitle}</title>
          {pageData.MetaTags?.map((item) => <meta name={item.Name} content={item.Content} key={item.Name} />)}
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

        <div className="max-w-container mx-auto px-3 sm:px-5 pt-5">
          <div className='bg-white p-3'>
            {!!hotelData.IsCovid && <div className='bg-emerald-700 leading-4 p-3 sm:p-4 text-white text-xs sm:text-sm rounded-md flex flex-wrap gap-2 items-center m-1 mb-3'>
              <Phone className='w-5 h-5 sm:w-6 sm:h-6 fill-current block' />
              جهت رزرو با شماره <a href="tel:+982126150051" className='underline text-sm sm:text-base'> 02126150051 </a> تماس بگیرید.
            </div>}

            <BackToList checkin={checkin} checkout={checkout} cityId={hotelData.CityId} cityName={hotelData.CityName} />
          </div>

          {!!hotelData.Gallery?.length && <Gallery images={hotelData.Gallery} />}
        </div>


        <AnchorTabs />

        <div className="max-w-container mx-auto px-3 sm:px-5" id="intro_section">

          <HotelName hotelData={hotelData} scoreData={hotelScoreData} />

          <h2 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'>{t('change-search')}</h2>

          <SearchForm
            defaultDestination={defaultDestination}
            defaultDates={defaultDates}
          />

        </div>

        {!!hotelData.HotelId && <Rooms hotelId={hotelData.HotelId} />}

        {!!hotelData.Facilities?.length && <HotelFacilities facilities={hotelData.Facilities} />}

        {!!(hotelData.Policies?.length || accommodationData.instruction?.length || accommodationData.mendatoryFee?.length) && <HotelTerms
          instruction={accommodationData.instruction}
          mendatoryFee={accommodationData.mendatoryFee}
          policies={hotelData.Policies}
        />}

        {!!siteName && <HotelAbout siteName={siteName} siteUrl={siteURL} description={accommodationData.description} />}

        {!!hotelData.DistancePoints?.length && (
          <div id="attractions_section" className="max-w-container mx-auto px-3 sm:px-5">
            <h2 className='text-lg lg:text-3xl font-semibold mt-5 mb-3 md:mt-10 md:mb-7'>{tHotel('attraction')}</h2>
            <div className='p-5 lg:p-7 bg-white rounded-xl'>
              <Attractions attractions={hotelData.DistancePoints} />
            </div>
          </div>
        )}

        {pageData.Id && <Comments hotelScoreData={hotelScoreData} pageId={pageData.Id} />}

        <InView triggerOnce={true}>
          {({ inView, ref }) =>
            <div ref={ref} id='similarhotels_section' className="max-w-container mx-auto px-3 sm:px-5">
              {inView && <SimilarHotels similarHotels={hotelData.Similars} />}
            </div>}
        </InView>

        {!!accommodationData.faqs?.length && <FAQ faqs={accommodationData.faqs} />}

      </Layout>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const url = encodeURI(`/${locale}/hotel/${query.hotelDetail![0]}`);

  const fetchPageDetailsAndScore = async (url: string, acceptLanguage: string) => {
    const pageInfo: any = await getpageByUrl(url, acceptLanguage);
    const scoreInfo = await getScore(pageInfo.data?.Id, acceptLanguage);
    return { pageInfo, scoreInfo };
  }

  const fetchHotelDetailsAndAccomodation = async (url: string, acceptLanguage: string) => {
    const hotelInfo: any = await getDomesticHotelDetailByUrl(url, acceptLanguage);
    const accomodationInfo = await getAccommodationById(hotelInfo.data?.HotelId, acceptLanguage);
    return { hotelInfo, accomodationInfo };
  }

  const [{ pageInfo, scoreInfo }, { hotelInfo, accomodationInfo }, portalData] = await Promise.all<any>([
    fetchPageDetailsAndScore(url, locale === "en" ? "en-US" : "fa-IR"),
    fetchHotelDetailsAndAccomodation(url, locale === "en" ? "en-US" : "fa-IR"),
    getPortal(locale === "en" ? "en-US" : "fa-IR")
  ]);

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotelDetail'])),
      pageData: pageInfo.data || null,
      hotelData: hotelInfo.data || null,
      hotelScoreData: scoreInfo.data || null,
      accommodationData: accomodationInfo.data?.result || null,
      portalData: portalData.data || null

    },
  })
}


export default HotelDetail;
