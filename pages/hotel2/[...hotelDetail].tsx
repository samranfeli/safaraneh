import { getpageByUrl } from '@/modules/domesticHotel/components';
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

        <div className="max-w-container mx-auto px-3 sm:px-5" id="hotel_intro">          
          
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
          <div id="attractions_section" className="max-w-container mx-auto px-3 sm:px-5 pt-7 md:pt-10">
            <h2 className='text-lg lg:text-3xl font-semibold mb-3 md:mb-7'>{tHotel('attraction')}</h2>
            <div className='p-5 lg:p-7 bg-white rounded-xl'>
              <Attractions attractions={hotelData.DistancePoints} />
            </div>
          </div>
        )}

        {pageData.Id && <Comments hotelScoreData={hotelScoreData} pageId={pageData.Id} />}

        <InView triggerOnce={true}>
          {({ inView, ref }) =>
            <div ref={ref} id='similarhotels_section' className="max-w-container mx-auto px-3 sm:px-5 py-7 md:py-10">
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

  const [pageInfo, portalData] = await Promise.all<any>([
    getpageByUrl(url, locale === "en__" ? "en-US" : "fa-IR"),
    getPortal(locale === "en__" ? "en-US" : "fa-IR")
  ]);

const hotelInfo = {
  "HotelId": 245,
  "HotelName": "پارسیان استقلال",
  "HotelCategoryName": "هتل",
  "HotelCategoryId": 1,
  "CityName": "تهران",
  "CityId": 164,
  "HotelRating": 5,
  "IsInstant": false,
  "Tel": "02126150051",
  "Address": "تهران، پارک وی، تقاطع بزرگراه شهید چمران و ولی عصر",
  "BriefDescription": "وجود چهار رستوران ملل (فرانسوی، ایتالیایی، تایلندی، عربی) شما را بدون حضور در آن کشورها، میهمان لذیذترین غذاهای سرزمینهای دور خواهد کرد. پرسنل و نیروی انسانی جوان و مسلط به اصول هتلداری از دیگر مزایای هتل استقلال تهران است که در هتل های پیر تهران کمتر به چشم می خورد. در طراحی اتاقهای هتل استقلال تهران سعی بر آن شده تا تلفیقی از معماری مدرن و معماری سنتی به بهترین شکل ممکن به اجرا گذاشته شود. همه اتاقهای هتل &nbsp;در مجهز بودن به مینی بار، شبکه های ماهواره ایی، شبکه اختصاصی و تلویزیون کابلی برای پخش فیلم سینمایی مشترک هستند.",
  "Content": "<h3><strong>اطلاعات کلی درباره هتل استقلال تهران</strong></h3>\n<p>در تهران، احتمالاً گذرتان به چهارراه پارک‌وی افتاده و عظمت و بزرگی دو برج بلند سفید رنگ در این منطقه توجهتان را جلب کرده‌است. اینجا هتل پارسیان استقلال تهران است که قدیمی‌ترها آن را با نام سابقش یعنی هتل رویال هیلتون می‌شناسند. این هتل 5 ستاره در سال 1341 شمسی به عنوان شعبه تهران مجموعه هتل‌های بین‌المللی هیلتون افتتاح شد. پس از انقلاب اسلامی نام هتل به استقلال تغییر یافت و در دهه هفتاد شمسی به <a href=\"https://www.safaraneh.com/fa/blog/%D8%B4%D8%B1%DA%A9%D8%AA-%D9%87%D8%AA%D9%84%D9%87%D8%A7%DB%8C-%D9%BE%D8%A7%D8%B1%D8%B3%DB%8C%D8%A7%D9%86\">گروه هتل‌های پارسیان</a> پیوست.</p>\n<p>هتل پارسیان استقلال دارای دو بال غربی و شرقی است. بال غربی آن در همان سال 1341 و در 15 طبقه ساخته و افتتاح شد. بال شرقی ده سال بعد از آن، یعنی در سال 1351، مورد بهره‌برداری‌قرار‌گرفت. برج شرقی تا به حال چند بار مورد بازسازی قرار گرفته‌است. به همین خاطر نسبت به بال غربی هتل استقلال نوسازتر بوده و از امکانات و وسائل جدیدتری برخوردار است.</p>\n<p> </p>\n<h3><strong>اتاق‌های هتل استقلال تهران</strong></h3>\n<p>هتل پارسیان استقلال در مجموع دارای 552 باب واحد اقامتی در برج‌های غربی و شرقی است. این هتل انواع اتاق‌های یک تخته، دوتخته و سوئیت‌‌های جونیور و رویال را شامل می‌شود.</p>\n<p>کلیه اتاق‌های هتل دارای تراس هستند و برخی نمای کوه را داشته و برخی نمای شهر. چشم‌انداز سوئیت معمولی بال شرقی فقط رو به کوه است و دارای یک تخت دونفره در اتاق خواب می‌باشد. علاوه بر اتاق خواب این سوئیت دارای یک اتاق نشیمن با مبلمان راحت و لوکس نیز می‌باشد.</p>\n<p>لوکس‌ترین سوئیت هتل پارسیان استقلال، سوئیت رویال بزرگ است. این سوئیت چشم‌انداز کوه داشته و درون اتاق دارای میز ناهارخوری، اتاق جلسه در نظر گرفته‌شده‌است. صندلی ماساژ، جکوزی، وان، اتاق نشیمن با لوکس‌ترین مبلمان و کلیه امکانات این سوئیت لوکس هستند. برج غربی هتل در حال حاضر در حال بازسازی بوده و امکان رزرو اتاق‌ها و سوئیت‌های آن وجود ندارد و فقط بال شرقی قابل استفاده است.</p>\n<p> </p>\n<h3><strong>مقایسه قیمت هتل پارسیان استقلال تهران</strong></h3>\n<p>با اینکه این هتل یکی از لوکس‌ترین، باسابقه‌ترین و معدود هتل‌های پنج‌ستاره تهران می‌باشد، قیمت‌های آن با توجه به تخفیفات فصلی سفرانه و جشنواره‌های مختلف دوره‌ای به‌صرفه محسوب می‌شود.</p>\n<p> </p>\n<h3><strong>امکانات هتل پارسیان استقلال </strong></h3>\n<p>در کنار تمام ویژگی‌ها و امتیازات هتل پارسیان استقلال تهران، این هتل موقعیت استراتژیکی دارد. موقعیتی که این سال‌ها، آن را به اولین انتخاب بسیاری از مسافران برای رزرو هتل در تهران تبدیل نموده است. </p>\n<p>این هتل بزرگ پنج ستاره در کمترین فاصله با محل دائمی نمایشگاه‌های بین‌المللی تهران قرار دارد. مرکز همایش‌های صدا و سیما، سالن اجلاس سران، میدان تجریش، دانشگاه شهید بهشتی، باشگاه انقلاب و بسیاری دیگر از اماکن مهم تهران نیز در نزدیکی آن هستند. اگر هم به قصد گردش و تفریح به تهران سفر کرده باشید به دلیل دسترسی عالی هتل استقلال به جاذبه‌های توریستی و گردشگری شهر تهران نظیر مجموعه باغ فردوس، کاخ موزه سعدآباد، کاخ نیاوران، دربند، درکه، پل طبیعت، بام تهران و... رزرو هتل استقلال تهران انتخابی ایده‌آل خواهد بود.</p>\n<p>علاوه بر این، خدمات و امکاناتی که هتل پارسیان استقلال به عنوان یک هتل پنج ستاره به مسافران و مهمانان خود عرضه می‌کند، همیشه جزء نمونه‌های مثال‌زدنی در صنعت هتل‌داری بوده است. بسیاری از هتل‌های ایران در ارائه هرچه بهتر و باکیفیت‌تر خدمات خود هتل استقلال تهران را الگو قرار داده‌اند.</p>\n<p>اینترنت وای فای نامحدود، روم سرویس 24 ساعته، خانه‌داری 24 ساعته، تلویزیون ال‌سی‌دی، ماهواره، تلویزیون کابلی مخصوص پخش فیلم، صندوق امانات، بالکن با چشم‌انداز رو به شهر و کوه‌های شمال تهران و امکان کشیدن سیگار در اتاق، سیستم سرمایش و گرمایش، یخچال، مینی بار، حمام، وان، سرویس بهداشتی فرنگی، سشوار، اتو، میز کار، میز آرایش و...</p>\n<p>اما امکانات هتل استقلال تهران تنها به این موارد خلاصه نمی‌شود. با رزرو هتل استقلال، به صورت رایگان از صبحانه مفصل هتل، پارکینگ با ظرفیت بالا، استخر، سونا، جکوزی، زمین تنیس و اینترنت نامحدود در لابی هتل استفاده کنید. خدمات خشکشویی، بیزنس سنتر، مرکز خرید سوغاتی، غرفه صنایع دستی، خودپرداز بانک، صرافی، آرایشگاه مردانه و... از دیگر خدماتی است که در این هتل بی‌نظیر ارائه می‌گردد.</p>\n<p> </p>\n<h3><strong>رستوران‌ها و سالن‌های هتل پارسیان استقلال تهران</strong></h3>\n<p>رستوران‌ها و کافی‌شاپ‌های متنوع و متعدد هتل پارسیان استقلال یکی از دلایلی است که آن را به عنوان یک هتل پنج ستاره مقصد بسیاری از مهمانان جهت صرف غذا و نوشیدنی در فضایی دنج و ایده‌آل نموده است.</p>\n<p>لابی بزرگ هتل استقلال تهران که از شهرت و محبوبیت زیادی برخوردار است. این لابی هر روزه پذیرای تعداد زیادی از افرادی است که این مکان را وعده‌گاه قرارهای کاری و شخصی خود انتخاب می‌کنند.</p>\n<p>رستوران‌های رز، آبشار، رستوران سنتی خاتون و رستوران‌های ایتالیایی، فرانسوی و عربی هتل استقلال نیز با منوهای غذایی متنوع و جذاب و نیز فضا و دکوراسیونی خاص و چشم‌نواز، آماده بهترین پذیرایی از مهمانان مقیم در هتل و همچنین افرادی است که از خارج از هتل به قصد صرف غذا و نوشیدنی مراجعه‌می‌کنند.</p>\n<p>اما هرچه در مورد امتیازات و ویژگی‌های بی‌شمار هتل استقلال می‌دانیم یک طرف، سالن‌های پذیرایی و برگزاری مراسم این هتل پنج ستاره یک طرف!</p>\n<p>سالن دریای نور هتل پارسیان استقلال تهران را قطعا می‌توان به عنوان یکی از زیباترین، بزرگ‌ترین و باشکوه‌ترین تالارهای پذیرایی کشور دانست. ویژگی مهم این سالن در کنار شکوه و جلال و زیبایی خیره‌کننده‌اش، بی‌ستون بودن آن است. این مساله برگزاری انواع جشن‌ها، همایش‌های بزرگ و مراسم‌های رسمی و خانوادگی و پذیرایی از 1000 مهمان را به راحتی و در بهترین شکل آن و با انواع چیدمان‌های متناسب با مراسم‌های گوناگون، امکان‌پذیر می‌کند.</p>\n<p>سالن نوفل لوشاتو با فضایی کاملا فرانسوی و نوستالژیک در کنار سالن‌های یاس1 و یاس2 هرکدام برای برگزاری انواع مهمانی‌ها و ضیافت‌ها و مراسم‌ها با تعداد مهمانانی در حدود 150 نفر بسیار مناسب هستند.</p>\n<p>اگر هم قصد برگزاری جلسات کاری یا کارگاه‌های آموزشی با تعداد مدعوین 10 الی 20 نفر در فضایی ایده‌آل و با امکانات پیشرفته و متنوع صوتی و تصویری داشته باشید، می‌توانید از اتاق های جلسات هتل پارسیان استقلال بهره بگیرید.</p>",
  "ContentTitle": "هتل پارسیان استقلال تهران",
  "Latitude": 35.790538,
  "Longitude": 51.41316299999994,
  "Zoom": 14,
  "Priority": 1,
  "Url": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
  "Discount": null,
  "TopSelling": 3810,
  "Price": 13600000,
  "IsPromotion": true,
  "MostViewed": null,
  "ImageAlt": "هتل پارسیان استقلال - هتل تهران",
  "ImageTitle": "هتل پارسیان استقلال تهران",
  "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/استقلال-(2).jpg",
  "LanguageId": 1,
  "IsCovid": true,
  "ChangeFrequency": "Always",
  "PagePriority": 0.699999988079071,
  "ModifyDateTime": "2023-07-17T12:14:00",
  "MetaDescription": "بیشترین تخفیف رزرو هتل پارسیان استقلال تهران (هتل هیلتون سابق) همراه با جزئیات اتاق ها، عکس، آدرس و تلفن. رزرو قطعی همراه با دریافت تأییدیه و کامل ترین جزئیات در سفرانه.",
  "MetaKeyword": "هتل پارسیان استقلال تهران,هتل استقلال تهران,هتل استقلال,رزرو هتل استقلال تهران با تخفیف,رزرو هتل استقلال,هتل پارسیان استقلال",
  "PageTitle": "رزرو هتل استقلال تهران | %تخفیف% اطلاعات + عکس | سفرانه",
  "VoteNumbers": 6255,
  "VoteResult": 4.5,
  "RoomCount": null,
  "NeighborhoodKeywords": [
    "Park Eram",
    "Tehran International Exhibition"
  ],
  "Gallery": [
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-021.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-021.jpg",
      "Alt": "هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-001.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-001.jpg",
      "Alt": "اتاق دو تخته دبل شرقی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-002.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-002.jpg",
      "Alt": "باشگاه ورزشی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-003.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-003.jpg",
      "Alt": "اتاق دو تخته توئین شرقی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-004.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-004.jpg",
      "Alt": "اتاق دو تخته دبل اکونومی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-005.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-005.jpg",
      "Alt": "زمین تنیس هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-006.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-006.jpg",
      "Alt": "سوئیت رویال برج شرقی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-007.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-007.jpg",
      "Alt": "سوئیت رویال شرقی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-008.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-008.jpg",
      "Alt": "نمای داخلی اتاق یک تخته هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-009.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-009.jpg",
      "Alt": "نمای داخلی اتاق دو تخته دبل  هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-011.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-011.jpg",
      "Alt": "نمای داخلی  اتاق دو تخته هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-013.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-013.jpg",
      "Alt": "نمای داخلی اتاق دو تخته هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-014.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-014.jpg",
      "Alt": "سویئت رویال برج شرقی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-015.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-015.jpg",
      "Alt": "تخت خواب سوئیت رویال  هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-016.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-016.jpg",
      "Alt": "سرویس بهداشتی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-017.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-017.jpg",
      "Alt": "سوئیت نرمال برج شرقی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-018.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-018.jpg",
      "Alt": "استخر هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-019.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-019.jpg",
      "Alt": "تختخواب سوئیت معمولی برج شرقی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-020.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-020.jpg",
      "Alt": "سوئیت نرمال برج شرقی هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-022.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-022.jpg",
      "Alt": "اتاق یک تخته هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-024.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-024.jpg",
      "Alt": "اتاق کنفرانس هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-025.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-025.jpg",
      "Alt": "کافی شاپ هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    },
    {
      "Image": "https://cdn.safaraneh.com/Images/Hotels/esteghlal-hotel-tehran-026.jpg",
      "ImageThumb": "https://cdn.safaraneh.com/Images/Hotels/Thumbs/esteghlal-hotel-tehran-026.jpg",
      "Alt": "میز ناهارخوری سوئیت رویال هتل پارسیان استقلال تهران",
      "Title": "هتل پارسیان استقلال تهران",
      "Priority": 0
    }
  ],
  "Facilities": [
    {
      "FacilityId": null,
      "Title": "منظره",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
      "Keyword": "View",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "fa fa-eye ",
      "Description": "کلیه اتاق‌ها دارای بالکن با نمای کوه و شهر می‌باشند",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "امکانات اتاق ",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
      "Keyword": "GeneralRoom",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-television",
      "Description": "پنجره‌های عایق ضد صوت , کانال‌های ماهواره‌ای , تلویزیون کابلی (شبکه فیلم) , یخچال , تلفن",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "اینترنت",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
      "Keyword": "Internet",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-wifi",
      "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی) , کافی‌نت",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "امکانات عمومی",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
      "Keyword": "General",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-availability",
      "Description": "صندوق امانات (در تمامی اتاق‌ها و در پذیرش) , آنتن مرکزی , پاورسوئیچ , تهویه مطبوع , سیستم اعلام حریق , آسانسور , روزنامه در لابی , سيستم خاموش کننده اتوماتيک حريق در داخل اتاق‌ها",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "خوراکی و نوشیدنی",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
      "Keyword": "Meal",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-fork",
      "Description": "مینی بار , کافی‌شاپ‌های 24 ساعته  (لاله در لابی ، کافه DOWNSTAIRS LOUNGE ) , رستوران‌های 24 ساعته (یاس 1، یاس 2، نوفل لوشاتو، رز، فرانسوی، ایتالیایی، تایلندی، عربی الحیات، آبشار) , ",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "امکانات تفریحی",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
      "Keyword": "Activities",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-swimming",
      "Description": "استخر , سونا , سالن بدنسازی , اتاق ماساژ , زمین تنیس",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "سرویس ها",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
      "Keyword": "Services",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-doorman",
      "Description": "بانک , تاکسی سرویس , خانه‌داری 24 ساعته , درمانگاه , مرکز تجاری , سالن همایش (دریای نور) , اتاق جلسات , سالن‌های پذیرایی (یاس 1، یاس 2، دریای نور، نوفل لوشاتو) , سالن زیبایی (آرایشگاه آقایان) , دستگاه خودپرداز , صرافی , انبار چمدان",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "پارکینگ",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
      "Keyword": "Parking",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-parking",
      "Description": "پارکینگ (با ظرفیت 350 دستگاه خودرو)",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "فضای بیرون",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
      "Keyword": "Outdoors",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-tree",
      "Description": "فضای سبز",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "امکانات ویژه",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
      "Keyword": "Amenities",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-star",
      "Description": "کلینیک دندانپزشکی",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "زبانهای قابل استفاده",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
      "Keyword": "Languages",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "soap-icon-globe",
      "Description": "انگلیسی",
      "IsSpecial": false
    }
  ],
  "Policies": [
    {
      "FacilityId": null,
      "Title": "زمان ورود",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Policies/Check-In.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Policies/Check-In.png",
      "Keyword": "CheckIn",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "fa fa-arrow-down",
      "Description": "14:00",
      "IsSpecial": false
    },
    {
      "FacilityId": null,
      "Title": "زمان خروج",
      "Image": "https://cdn.safaraneh.com/Images/Hotel/Policies/Check-Out.png",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Policies/Check-Out.png",
      "Keyword": "CheckOut",
      "ImageAlt": null,
      "ImageTitle": null,
      "CssClass": "fa fa-arrow-up",
      "Description": "12:00",
      "IsSpecial": false
    }
  ],
  "DistancePoints": [
    {
      "Url": "/fa/attraction/مجموعه-سعدآباد",
      "AttractionName": "مجموعه سعدآباد",
      "DurationText": "14 دقیقه",
      "DurationValue": 839,
      "ImageAlt": "مجموعه سعد آباد",
      "ImageTitle": "مجموعه سعد آباد Tehran",
      "Image": "/Images/Attractions/fa/400/sadatabad.jpg",
      "DistanceText": "3 کیلومتر و 754 متر",
      "DistanceValue": 3754,
      "Mode": "Driving"
    },
    {
      "Url": "/fa/attraction/موزه-رضا-عباسی",
      "AttractionName": "موزه رضا عباسی",
      "DurationText": "15 دقیقه",
      "DurationValue": 926,
      "ImageAlt": "موزه رضا عباسی",
      "ImageTitle": "موزه رضا عباسی Tehran",
      "Image": "/Images/Attractions/fa/400/reza-abasi.jpg",
      "DistanceText": "10 کیلومتر و 79 متر",
      "DistanceValue": 10079,
      "Mode": "Driving"
    },
    {
      "Url": "/fa/attraction/برج-میلاد",
      "AttractionName": "برج میلاد",
      "DurationText": "16 دقیقه",
      "DurationValue": 979,
      "ImageAlt": "برج میلاد تهران",
      "ImageTitle": "برج میلاد",
      "Image": "/Images/Attractions/fa/400/BorjMiladTehran.jpg",
      "DistanceText": "10 کیلومتر و 521 متر",
      "DistanceValue": 10521,
      "Mode": "Driving"
    },
    {
      "Url": "/fa/attraction/کاخ-گلستان",
      "AttractionName": "کاخ گلستان",
      "DurationText": "25 دقیقه",
      "DurationValue": 1523,
      "ImageAlt": "کاخ گلستان تهران",
      "ImageTitle": "کاخ گلستان ",
      "Image": "/Images/Attractions/fa/400/golestan.jpg",
      "DistanceText": "14 کیلومتر و 213 متر",
      "DistanceValue": 14213,
      "Mode": "Driving"
    }
  ],
  "DistancePointTemporarys": [
    {
      "Url": "/fa/attraction/مجموعه-سعدآباد",
      "AttractionName": "مجموعه سعدآباد",
      "DurationText": "14 دقیقه",
      "DurationValue": 839,
      "ImageAlt": "مجموعه سعد آباد",
      "ImageTitle": "مجموعه سعد آباد Tehran",
      "Image": "/Images/Attractions/fa/400/sadatabad.jpg",
      "DistanceText": "3 کیلومتر و 754 متر",
      "DistanceValue": 3754,
      "Mode": "Driving"
    },
    {
      "Url": "/fa/attraction/موزه-رضا-عباسی",
      "AttractionName": "موزه رضا عباسی",
      "DurationText": "15 دقیقه",
      "DurationValue": 926,
      "ImageAlt": "موزه رضا عباسی",
      "ImageTitle": "موزه رضا عباسی Tehran",
      "Image": "/Images/Attractions/fa/400/reza-abasi.jpg",
      "DistanceText": "10 کیلومتر و 79 متر",
      "DistanceValue": 10079,
      "Mode": "Driving"
    },
    {
      "Url": "/fa/attraction/برج-میلاد",
      "AttractionName": "برج میلاد",
      "DurationText": "16 دقیقه",
      "DurationValue": 979,
      "ImageAlt": "برج میلاد تهران",
      "ImageTitle": "برج میلاد",
      "Image": "/Images/Attractions/fa/400/BorjMiladTehran.jpg",
      "DistanceText": "10 کیلومتر و 521 متر",
      "DistanceValue": 10521,
      "Mode": "Driving"
    },
    {
      "Url": "/fa/attraction/کاخ-گلستان",
      "AttractionName": "کاخ گلستان",
      "DurationText": "25 دقیقه",
      "DurationValue": 1523,
      "ImageAlt": "کاخ گلستان تهران",
      "ImageTitle": "کاخ گلستان ",
      "Image": "/Images/Attractions/fa/400/golestan.jpg",
      "DistanceText": "14 کیلومتر و 213 متر",
      "DistanceValue": 14213,
      "Mode": "Driving"
    }
  ],
  "Similars": [
    {
      "HotelId": 254,
      "HotelName": "هما",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": "دسترسی سریع و آسان به نقاط مختلف شهر - وجود رستوران های متنوع ایرانی و فرنگی - سرویس دهی مطلوب و به روز",
      "Url": "/fa/hotel/هتل-هما-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-هما-تهران.jpg",
      "ImageTitle": "رزرو هتل هما تهران",
      "ImageAlt": null,
      "Address": "تهران، خیابان ولیعصر، خیابان شهید خدامی، پلاک51",
      "Discount": null,
      "Price": 10000000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ(با ظرفیت 500 دستگاه خودرو)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "رمپ ورودی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بدنسازی , استخر , سونا , جکوزی , ماساژ درمانی , زمین تنیس",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون , تلفن",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی سیم(داخل اتاق)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "صندوق امانات (رایگان) , آسانسور , تهویه مطبوع , سیستم اعلام حریق , آنتن مرکزی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "کافی شاپ (گلستان، لابی) , رستوران (معراج، رستوران تابستانی دلفین، گلستان، رستوران ایتالیایی پیکاسو) , مینی بار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "خانه داری 24 ساعته , خشکشویی , تاکسی سرویس , خدمات پزشکی (به صورت 24 ساعته می باشد) , بانک , سالن همایش , اتاق جلسات , سالن پذیرایی , سالن زیبایی(آرایشگاه آقایان) , مرکز تجاری",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات ویژه",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "Keyword": "Amenities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-star",
          "Description": "خدمات رزرو حمل و نقل هوايي در هتل",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 255,
      "HotelName": "اسپیناس بلوار",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": "هتل اسپیناس بلوار تهران هتلی لوکس، نوساز و مجلل از کادری مجرب و حرفه ای برای پذیرایی از میهمانان و مسافران برخوردار بوده و توانایی هتل اسپیناس بلوار در  ارائه ی سرویس های VIP مورد درخواست مسافران منحصر به فرد می باشد.",
      "Url": "/fa/hotel/هتل-اسپیناس-بلوار-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-اسپیناس-بلوار-تهران.jpg",
      "ImageTitle": "هتل اسپیناس بلوار تهران",
      "ImageAlt": null,
      "Address": "تهران، ضلع جنوبی بلوار کشاورز، بین خیابان نادری و خیابان فلسطین",
      "Discount": null,
      "Price": 15000000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی سیم رایگان (داخل اتاق، داخل لابی) , کافی نت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر , سونا , جکوزی , سالن بدنسازی , سالن بیلیارد",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "تلویزیون , تلفن , یخچال , چای ساز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ(با ظرفیت 400 دستگاه خودرو)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "پاورسوئیچ , آنتن مرکزی , تهویه مطبوع , سیستم اعلام حریق , آسانسور , صندوق امانات",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "کافی شاپ , رستوران(فرانسوی، مدیترانه ای، تایلندی، رستوران سنتی هتل اسپیناس با معماری الهام گرفته از بافت قدیمی یزد، یادآور فرهنگ غنی و سنت اصیل ایرانیست که در ابتدای ورود چشم هربیننده ای را به خود جلب خواهد کرد ، چشم انداز) , مینی بار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "تاکسی سرویس , خانه داری 24 ساعته , خشکشویی , سالن همایش , اتاق جلسات , سالن پذیرایی( سالن پاسارگاد، سالن خلیج فارس) , سالن زیبایی(آرایشگاه آقایان)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "رمپ ورودی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی , ایتالیایی , فرانسه , ترکی , روسی",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 243,
      "HotelName": "پارسیان آزادی",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": "بیشترین تخفیف رزرو هتل آزادی تهران به همراه توضیحات کامل و عکس، آدرس، نقشه، جزئیات و قیمت اتاق ها به همراه رزرو قطعی و صدور تاییدیه نهایی، حرفه ای ترین مرجع معرفی و رزرو هتل های ایران",
      "Url": "/fa/hotel/هتل-پارسیان-آزادی-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-آزادی-تهران-1.jpg",
      "ImageTitle": "هتل پارسیان آزادی تهران",
      "ImageAlt": null,
      "Address": "تهران، تقاطع اتوبان یادگار امام و شهید چمران",
      "Discount": 31,
      "Price": 4900000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر , سونا (خشک، بخار) , جکوزی , spa , اتاق ماساژ , سالن بدنسازی (مخصوص خانم‌ها و آقایان) , سالن بیلیارد",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "تلويريون‌های تعاملی (Interactive) , تلفن (شهری و بين‌المللی ) , قهوه ساز , چای ساز , سرویس بهداشتی (سرویس بهداشتی فرنگی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی) , کافی نت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "پاورسوئیچ , آنتن مرکزی , سیستم اعلام حریق ( با قابليت آدرس‌دهی و مجهز شده به آژير و چراغ چشمک‌زن اختصاصی در اتاق‌ها) , سيستم خاموش کننده اتوماتيک حريق در داخل اتاق‌ها , تهویه مطبوع , نشانگر ديجيتالی (مزاحم نشويد و اتاق را نظافت کنيد) , صندوق امانات , آسانسور",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران(رستوران 24 ساعته پارسه، رستوران فرنگی ارکیده با منظره بی‌نظیر، رستوران ژاپنی کنزو، رستوران فضای باز سرو، رستوران پانیذ) , کافی‌شاپ (کافی‌شاپ 24 ساعته پارسه، لابی لانژ نیلو، کافی هاوس آسمان) , سالن صبحانه خوری یاسمن , مینی بار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "رستوران فضای باز سرو , فضای سبز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات ویژه",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "Keyword": "Amenities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-star",
          "Description": "پکيج ملزومات بهداشتی (حوله دست و صورت و بدن به صورت مجزا، صابون، شامپوی سر و بدن، لوسيون بدن، خميردندان،‌ سوهان ناخن،‌ کلاه دوش،‌ گوش پاک کن،‌ مسواک، شانه، تيغ اصلاح و خمير ريش، کيسه بهداشتی،  براق کننده کفش و پاشنه کش) در کلیه ی اتاق ها",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "بانک , خشکشویی , تاکسی سرویس , خانه‌داری 24 ساعته , سالن همایش (سالن‌های الماس، برلیان) , اتاق جلسات , سالن پذیرایی (سالن مجلل زرین، ، سالن زمرد، سالن vip پانیذ) , مرکز تجاری",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "حرکت ویلچر در داخل اتاق (اتاق‌های موجود در طبقه 3 هتل مجهز به درب‌های کشویی ویژه معلولین می‌باشد) , حرکت ویلچر در داخل سرویس بهداشتی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 7918,
      "HotelName": "رکسان",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": "موقعیت مکانی مطلوب و به دور از شلوغی شهر ، کیفیت مطلوب و &nbsp;امکانات و فضاهایی مطابق با استاندارد &nbsp;های روز دنیا از دلایل انتخاب این هتل است.&nbsp;",
      "Url": "/fa/hotel/هتل-نووتل-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-رکسان-تهران.jpg",
      "ImageTitle": "هتل نوتل تهران",
      "ImageAlt": null,
      "Address": "تهران، کیلومتر 30 اتوبان خلیج فارس (تهران-قم)، ضلع جنوبی اتوبان اصلی فرودگاه بین المللی امام خمینی (ره)، روبروی ترمینال مسافربری شماره 1",
      "Discount": null,
      "Price": 3700000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "چای ساز , یخچال",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "بانک , خشکشویی , سالن همایش , تاکسی سرویس , سالن پذیرایی , اتاق جلسات",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "کافی شاپ , مینی بار , رستوران",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر (در حال ساخت) , پارک بازی کودکان , سونا (در حال ساخت) , جکوزی (در حال ساخت) , سالن بدنسازی (در حال ساخت)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "تهویه مطبوع , صندوق امانات , آسانسور , سیستم اعلام حریق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی سیم (داخل اتاق، داخل لابی) , کافی نت",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 8019,
      "HotelName": "اسپیناس پالاس",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": "هتل اسپیناس در منطقه ای خوش آب و هوا قرار گرفته و جدیدترین هتل 5 ستاره ایران می باشد. برخورداری ازبالاترین استاندارهای بین المللی از ویژگی های این هتل است.",
      "Url": "/fa/hotel/هتل-اسپیناس-پالاس-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-اسپیناس-پالاس-تهران.jpg",
      "ImageTitle": "هتل اسپیناس پالاس تهران",
      "ImageAlt": null,
      "Address": "تهران، بزرگراه یادگار امام، سعادت آباد، میدان بهرود، خیابان عابدی",
      "Discount": null,
      "Price": 3600000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "اتاق مخصوص معلولین , خدمات برای معلولین",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "کافی‌شاپ (سان ست، اسکای لانج) , رستوران (لاتون، دیبا، اسکای لانج) , مینی‌بار , صبحانه و ناهار در اتاق , رستوران سنتی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر , سونا , جکوزی , سالن بدنسازی , ماساژ , حمام ترکی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "تهویه مطبوع , سیستم اعلام حریق , آسانسور , آنتن مرکزی , صندوق امانات , پاور سوئیچ , کف‌پوش موکت , کارت هوشمند اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون LED , تلفن , سرویس بهداشتی(سرویس بهداشتی فرنگی) , حمام , چای ساز , IP TV",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "سالن همایش , اتاق جلسات , سالن پذیرایی , تاکسی سرویس , روم سرویس , خشکشویی , پذیرش 24ساعته , اتاق چمدان , واکس کفش , دستگاه فکس، فتوکپی و پرینت , خدمات بیدارباش , صرافی , خدمات تهیه بلیت  , فروشگاه , اتاق سیگار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "کافی‌نت , اینترنت بی‌سیم (داخل اتاق، داخل لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز , آب‌نما",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی , فرانسه , ایتالیایی , عربی , آلماني",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "سوئیت‌ها دارای اتاق نشیمن هستند , میز کار , مبلمان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "نمای شهر و منظره کوه‌های شمال تهران",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خدمات فرودگاهی CIP",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "CIPAirportServices",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "خدمات تشریفات فرودگاهی (CIP)",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 251,
      "HotelName": "لاله",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": "سرویس خوب پرسنل  موقعیت هتل ( ضلع شمالی پارک لاله) - جنب موزه ی فرش وجود رستوران فرانسوی و چینی و همچنین رستوران سنتی",
      "Url": "/fa/hotel/هتل-لاله-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-لاله-تهران.jpg",
      "ImageTitle": "هتل لاله تهران",
      "ImageAlt": null,
      "Address": "تهران، خیابان دکتر فاطمی، نبش خیابان حجاب",
      "Discount": null,
      "Price": 5700000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ روباز (با ظرفیت 200 دستگاه خودرو)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "ویلچر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر روباز (مخصوص آقایان) , سالن بدنسازی , سالن بیلیارد , سونا (مخصوص آقایان)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی) , کافی نت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون , تلفن",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "آنتن مرکزی , تهویه مطبوع , سیستم اعلام حریق , آسانسور , صندوق امانات",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "کافی‌شاپ , رستوران(رستوران ایرانی نمکدون، رستوران تیاره، رستوران فرانسوی) , مینی‌بار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "تاکسی سرویس , خانه‌داری 24 ساعته , خدمات پزشکی , خشکشویی , سالن همایش , اتاق جلسات , سالن پذیرایی , سالن زیبایی (آرایشگاه آقایان) , بانک",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات ویژه",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "Keyword": "Amenities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-star",
          "Description": "شرکت خدمات مسافرتی ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 21836,
      "HotelName": "پرشین پلازا",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": "هتل تازه تاسیس پرشین پلازا یک هتل پنج ستاره واقعی است و در قلب اداری- تجاری پاییتخت واقع شده است. امکانات هتل ، معماری، چشم انداز زیبا و ... آن سبب شده تا مهمانان آن اقامتی خاطره انگیز را تجربه کنند.",
      "Url": "/fa/hotel/هتل-پرشین-پلازا-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-پرشین-پلازا-تهران.jpg",
      "ImageTitle": "Tehran Persian Pelaza hotel",
      "ImageAlt": null,
      "Address": "تهران،  سهروردی شمالی، پایین تر از بهشتی، خیابان میرزای زینالی شرقی، پلاک 42",
      "Discount": null,
      "Price": 12450000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران , کافی شاپ , مینی بار (با هزینه) , سالن صبحانه خوری",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "تلویزیون , سرویس بهداشتی (سرویس بهداشتی فرنگی) , یخچال , تلفن , چای ساز , حمام (برخی واحدها دارای وان هستند) , پنجره های عایق ضد صوت , آباژور",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "روزنامه , صندوق امانات (داخل اتاق) , اتاق سیگار , آسانسور , سیستم سرمایشی (اسپلیت) , سیستم گرمایشی (اسپلیت) , فمیلی روم , برخی اتاق‌ها موکت و برخی اتاق‌ها پارکت , سیستم اعلام حریق , سیستم اطفاء حریق , نشانگرهای دیجیتالی وضعیت (مزاحم نشوید و اتاق نظافت لازم دارد) , برق اضطراری , کارت هوشمند اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "ویلچر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن ورزشی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ با ظرفیت 40 خودرو",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "نمای خیابان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "سوئیت‌ها دارای اتاق نشیمن هستند , میز آرایش , مبلمان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "روم سرویس ۲۴ ساعته , پذیرش 24ساعته , راهنمای مهمان , اتاق چمدان , دستگاه فکس، فتوکپی و پرینت , اتاق VIP , اتاق ماه عسل , واکس کفش , خشکشویی , خدمات بیدارباش , صرافی , سالن چند منظوره , لابی , فروشگاه",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "رخت‌آویز",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 22048,
      "HotelName": "ویستریا",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-ویستریا-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-ویستریا-تهران.jpg",
      "ImageTitle": "هتل ویستریا تهران",
      "ImageAlt": null,
      "Address": "تهران، تجریش، چهارراه قدس، خیابان دربند، ابتدای خیابان احمدی زمانی، پلاک 1",
      "Discount": null,
      "Price": 2000000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم نامحدود رایگان (در اتاق‌ها و لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "روزنامه , صندوق امانات , آسانسور , تهویه مطبوع , گاوصندوق داخل اتاق , سیستم گرمایشی مرکزی , فمیلی روم , برخی قسمت‌ها فرش شده , سیستم اعلام حریق , پاور سوئیچ , سیستم اطفاء حریق , نشانگرهای دیجیتالی وضعیت (مزاحم نشوید و اتاق نظافت لازم دارد) , برق اضطراری , سیستم کارت کلید الکترونیکی درب ها",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "تلویزیون (شبکه‌های خبری) , تلفن , چای ساز , سرویس بهداشتی (سرویس بهداشتی فرنگی) , برخی واحدها دارای وان هستند",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "رستوران بام , کافی شاپ هتل در پشت بام هتل قرار دارد.",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "مینی بار (با هزینه) , سالن صبحانه خوری",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "خدمات برای معلولین",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بدنسازی , اتاق ماساژ , اسپا , استخر , سونا (خشک ، بخار) , جکوزی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ با ظرفیت 98 خودرو",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "منظره شهر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "سوئیت‌ها دارای اتاق نشیمن هستند , میز کار , برخی اتاق‌ها دارای مبلمان هستند",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "خانه‌داری 24 ساعته , پذیرش 24ساعته , خدمات تهیه بلیت  , انبار چمدان , راهنمای مهمان , مرکز تجاری , دستگاه  فتوکپی و پرینت , واکس کفش , خشکشویی , خدمات بیدارباش , صرافی , سالن همایش , اتاق جلسات , سالن پذیرایی , نمازخانه",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "رخت‌آویز",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 22055,
      "HotelName": "برج سفید",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-برج-سفید-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/borje-sefid-0151.jpg",
      "ImageTitle": "هتل برج سفید تهران",
      "ImageAlt": null,
      "Address": "تهران، خیابان پاسداران، مقابل بوستان ششم، شماره 234",
      "Discount": null,
      "Price": 10940000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "سوئیت‌ها دارای اتاق نشیمن هستند , میز کار , مبلمان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران , مینی بار (با هزینه) , کافی شاپ , رستوران گردان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ مسقف با ظرفیت 100 خودرو",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "خانه‌داری 24 ساعته , خدمات تهیه بلیت  , اتاق چمدان , مرکز تجاری , دستگاه فکس، فتوکپی و پرینت , اتاق VIP , واکس کفش , دستگاه خودپرداز , خشکشویی , خدمات بیدارباش , سالن زیبایی (آرایشگاه آقایان) , بانک , سالن اجتماعات , سالن پذیرایی , تاکسی سرویس شبانه‌روزی , فروشگاه",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "روزنامه , صندوق امانات , آسانسور , سیستم سرمایشی مرکزی , سیستم گرمایشی مرکزی , کف‌پوش موکت , سیستم اعلام حریق , آنتن مرکزی , پاور سوئیچ , سیستم اطفاء حریق , کارت هوشمند اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "منظره شهر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات ویژه",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "Keyword": "Amenities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-star",
          "Description": "آژانس مسافرتی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "تلویزیون LCD , تلفن , چای ساز , سرویس بهداشتی (سرویس بهداشتی فرنگی) , حمام , قهوه ساز , آباژور",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 22205,
      "HotelName": "آتانا",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-آتانا-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-آتانا-تهران.jpg",
      "ImageTitle": "هتل آتانا تهران",
      "ImageAlt": null,
      "Address": "تهران، خیابان طالقانی، نرسیده به میدان فلسطین",
      "Discount": null,
      "Price": 11450000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم نامحدود رایگان (در اتاق‌ها و لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بدنسازی , ماساژ , حمام ترکی , استخر , سونا , جکوزی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "سوئیت‌ها دارای اتاق نشیمن هستند , میز و صندلی , مبلمان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران , مینی بار ( غیر رایگان) , کافی شاپ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "روم سرویس , پذیرش 24ساعته , اتاق چمدان , دستگاه فکس، فتوکپی و پرینت , واکس کفش , خشکشویی , سالن کنفرانس , سالن پذیرایی , نمازخانه , ترانسفر رفت و برگشت (با هزینه)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "روزنامه , صندوق امانات , آسانسور , تهویه مطبوع (چیلر) , سیستم اعلام حریق , پاور سوئیچ , قفل الکترونیکی درب اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "نمای خیابان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون (شبکه‌های خبری) , تلفن , شبکه پخش فیلم , چای ساز , سرویس بهداشتی(سرویس بهداشتی فرنگی) , حمام",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "کافی‌شاپ در فضای باز",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 22210,
      "HotelName": "رامتین",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-رامتین-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/ramtin-hotel.jpg",
      "ImageTitle": "هتل رامتین تهران",
      "ImageAlt": null,
      "Address": "خیابان ولیعصر، بالاتر از سه راه عباس آباد، رو به روی پمپ بنزین",
      "Discount": null,
      "Price": 9100000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی) , خدمات اینترنتی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بدنسازی , ماساژ , سونا",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "سوئیت‌ها دارای اتاق نشیمن هستند , مبلمان در سوئیت‌ها",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران , مینی بار (با هزینه) , صبحانه و ناهار در اتاق , کافی شاپ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "روم سرویس , پذیرش 24ساعته , اتاق چمدان , فکس , واکس کفش , لاندری , خدمات بیدارباش , تبدیل ارز , خدمات تور , تاکسی سرویس شبانه‌روزی , فروشگاه , نمازخانه , ترانسفر رفت و برگشت (با هزینه) , خدمات تهیه بلیت  , خدمات پزشکی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "روزنامه , صندوق امانات , آسانسور , سیستم سرمایشی مرکزی , سیستم گرمایشی مرکزی , کف‌پوش موکت , سیستم اعلام حریق , کارت هوشمند اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "نمای خیابان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون LCD , تلفن , چای ساز , آشپزخانه با امکان پخت و پز (در سوئیت‌ها) , سرویس بهداشتی(سرویس بهداشتی فرنگی) , حمام",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 21915,
      "HotelName": "شمشک",
      "CityName": "تهران",
      "HotelTypeName": "هتل بوتیک",
      "HotelRating": 4,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-بوتیک-شمشک",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-بوتیک-شمشک-تهران.jpg",
      "ImageTitle": "Tehran boutique hotel shemshak hotel",
      "ImageAlt": null,
      "Address": "تهران، شمشک، مقابل شهرداری",
      "Discount": null,
      "Price": 12350000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران , مینی بار (با هزینه) , کافی شاپ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "تلفن , یخچال , سرویس بهداشتی(سرویس بهداشتی فرنگی) , تلویزیون LED , حمام",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "میز و صندلی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "روم سرویس , پذیرش 24ساعته , اتاق چمدان , دستگاه فکس، فتوکپی و پرینت , واکس کفش , لاندری , خدمات بیدارباش , خدمات تهیه بلیت  , تاکسی سرویس , ترانسفر رفت و برگشت (با هزینه)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "سیستم سرمایشی (مرکزی، فن کوئل) , صندوق امانات , سیستم گرمایشی (مرکزی، فن کوئل) , کف‌پوش پارکت , سیستم اعلام حریق , سیستم اطفاء حریق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": " چشم‌اندازی زیبا از طبیعت و کوه‌های اطراف ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "دراور",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات ویژه",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "Keyword": "Amenities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-star",
          "Description": "اجاره خودرو (بدون راننده)",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 253,
      "HotelName": "جهانگردی میگون",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "نزدیکی به تهران - هوای سالم - سکوت آرامش بخش - زیبایی هتل",
      "Url": "/fa/hotel/هتل-جهانگردی-میگون-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-جهانگردی-میگون-تهران.jpeg",
      "ImageTitle": "هتل جهانگردی میگون تهران",
      "ImageAlt": null,
      "Address": "تهران، میگون، فشم",
      "Discount": null,
      "Price": 5870000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "تلویزیون LCD , تلفن , یخچال , آشپزخانه با امکان پخت و پز در ویلاها , سرویس بهداشتی (سرویس بهداشتی فرنگی) , حمام",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "مینی بار (با هزینه) , کافی شاپ , رستوران , صبحانه و ناهار در اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "کافی نت , اینترنت بی‌سیم (داخل اتاق، داخل لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "سالن پذیرایی , روم سرویس , خشکشویی , پذیرش 24ساعته , دستگاه فکس، فتوکپی و پرینت , واکس کفش , خدمات بیدارباش , سالن همایش , تاکسی سرویس شبانه‌روزی , نمازخانه",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بیلیارد , پارک بازی کودکان , فوتبال دستی , پینگ پنگ , ایر هاکی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "سیستم اعلام حریق , آسانسور , آنتن مرکزی , سیستم تهویه مطبوع (چیلر) , کف‌پوش موکت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "اتاق نشیمن مجزا در سوئیت‌ها و ویلاها , میز آرایش , مبلمان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ روباز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "منظره حیاط، فضای سبز و کوه‌های اطراف",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 8078,
      "HotelName": "اسکان الوند",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "هتل اسکان الوند هتلی لوکس و شیک در تهران است که دسترسی آسانی به مرکز شهر، جاذبه های تهران ومکان های تفریحی دارد.&nbsp;",
      "Url": "/fa/hotel/هتل-اسکان-الوند-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-اسکان-الوند-تهران.jpg",
      "ImageTitle": "هتل اسکان الوند تهران",
      "ImageAlt": null,
      "Address": "تهران، میدان آرژانتین، انتهای خیابان الوند، خیابان اسفراین، نبش اهورامزدا، پلاک 10",
      "Discount": null,
      "Price": 13250000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی) , خدمات اینترنتی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "رستوران بام",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بدنسازی , ماساژ , اسپا , سالن بیلیارد , سونا خشک , جکوزی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "سوئیت‌ها دارای اتاق نشیمن هستند , میز آرایش , مبلمان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران , کافی شاپ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ با ظرفیت محدود",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "روم سرویس , پذیرش 24ساعته , اتاق چمدان , دستگاه فکس، فتوکپی و پرینت , واکس کفش , دستگاه خودپرداز , خشکشویی , تبدیل ارز , سالن کنفرانس , سالن پذیرایی , تاکسی سرویس شبانه‌روزی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "روزنامه , صندوق امانات (داخل اتاق‌ها) , آسانسور , سیستم سرمایشی مرکزی , سیستم گرمایشی مرکزی , کف‌پوش موکت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی , ترکی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون LCD , تلفن , کتری برقی  , سرویس بهداشتی(سرویس بهداشتی فرنگی) , حمام",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "نمای شهر و منظره کوه‌های شمال تهران",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 10794,
      "HotelName": "نیلو",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "نزدیکی هتل نیلو به پارک آب&zwnj;وآتش، پل طبیعت، پارک ساعی، دسترسی آسان به مراکز خرید، امکانات خوب",
      "Url": "/fa/hotel/هتل-نیلو-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/5585.jpg",
      "ImageTitle": "هتل نیلو تهران",
      "ImageAlt": null,
      "Address": "تهران، خیابان ولی عصر، نرسیده به میدان ونک، کوچه هفتم فوزی، کوچه لاریجانی، پلاک 3",
      "Discount": null,
      "Price": 11900000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "کافی شاپ , رستوران , مینی بار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر , سونا , جکوزی , اسپا",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "تهویه مطبوع , سیستم اعلام حریق , آسانسور , صندوق امانات , کف‌پوش موکت , کارت هوشمند اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون LCD , تلفن , سرویس بهداشتی(سرویس بهداشتی فرنگی) , چای ساز , حمام",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "لابی , تاکسی سرویس , روم سرویس , خشکشویی , پذیرش 24ساعته , خدمات تهیه بلیت  , اتاق چمدان , دستگاه فکس، فتوکپی و پرینت , واکس کفش , خدمات بیدارباش , صرافی , نمازخانه , ترانسفر فرودگاهی , آمفی تئاتر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی سیم (داخل اتاق، داخل لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "اتاق نشیمن و اتاق خواب مجزا در سوئیت‌ها و آپارتمان‌ها , میز آرایش , مبلمان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات سمعی و بصری",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Media-Technology.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Media-Technology.png",
          "Keyword": "MultiMedia",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-picture-o",
          "Description": "شبکه پخش فیلم",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "منظره شهر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 10822,
      "HotelName": "ارم",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "هتل ارم تهران در کنار اتوبان&zwnj;ها و بزرگراه&zwnj;ها قرار گرفته که یکی از ویژگی های آن میباشد، به گونه&zwnj;ای که در کمترین فرصت میتوان به مراکز اداری، شهری مراجعه و پس از  انجام امور با کمترین زمان ممکن به هتل بازگشت.",
      "Url": "/fa/hotel/هتل-ارم-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-ارم-تهران.jpg",
      "ImageTitle": "هتل ارم تهران",
      "ImageAlt": null,
      "Address": "تهران، میدان ونک، بزرگراه شهید حقانی، بعد از کتابخانه ملی، جنب روگذر شهید همت غرب",
      "Discount": null,
      "Price": 8580000,
      "Facilities": []
    },
    {
      "HotelId": 21775,
      "HotelName": "آکادمی فوتبال",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-آکادمی-فوتبال-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/00000.jpg",
      "ImageTitle": "Tehran Hotel Academy of Football hotel",
      "ImageAlt": null,
      "Address": "تهران ، ضلع غربی مجموعه ورزشی آزادی",
      "Discount": null,
      "Price": 5200000,
      "Facilities": []
    },
    {
      "HotelId": 244,
      "HotelName": "پارسیان اوین",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "موقعیت مکانی هتل اوین تهران  نسبت به بزرگراه های مختلف  دسترسی به فرودگاه مرکز شهر و نمایشگاه بین المللی را آسان نموده است.",
      "Url": "/fa/hotel/هتل-پارسیان-اوین-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/entrance-(1).jpg",
      "ImageTitle": "هتل پارسیان اوین تهران",
      "ImageAlt": null,
      "Address": "تهران، بزرگراه چمران، سه راه اوین",
      "Discount": null,
      "Price": 11470000,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ(با ظرفیت 600 دستگاه خودرو)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "حرکت ویلچر در داخل اتاق , حرکت ویلچر در داخل سرویس بهداشتی , ویلچر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "بانک , سالن همایش (کوه نور ۱ و ۲، سالن کارون) , اتاق جلسات , سالن پذیرایی (کوه نور ۱ و ۲) , تاکسی سرویس , سالن زیبایی (آرایشگاه آقایان) , خانه‌داری 24 ساعته , مرکز تجاری , خشکشویی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "کافی‌شاپ (لابی لانژ) , رستوران(رستوران تابستانی آبشار، رستوران پارسه، رستوران پردیس) , مینی بار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر , سونا (داخل سوئیت‌ها) , جکوزی (داخل سوئیت‌ها) , دستگاه ماساژ (داخل سوئیت‌ها)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "تهویه مطبوع , سیستم اعلام حریق , آسانسور , آنتن مرکزی , صندوق امانات (داخل اتاق‌ها) , پاورسوئیچ , نشانگرهای دیجیتالی وضعیت (مزاحم نشوید و اتاق نظافت لازم دارد) , سیستم برق یکپارچه با عملکرد منحصر به کارت اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیونLCD (با رابط تعاملی) , تلفن , کانال‌های ماهواره‌ای , چای ساز , حمام , سیستم کنترل روشنایی بر روی سر تختی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی) , کافی نت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز , رستوران تابستانی آبشار در فضای باز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 246,
      "HotelName": "پارسیان کوثر",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "هتل کوثر تهران با معماری نیمه سنتی خود یکی از جذاب&rlm;ترین هتل&zwnj;های 4ستاره تهران است. یکی از امتیازات این هتل دسترسی آسان به مراکز مختلف شهر تهران است.",
      "Url": "/fa/hotel/هتل-پارسیان-کوثر-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/parsian-kowsar-hotel-(3).jpg",
      "ImageTitle": "هتل پارسیان کوثر تهران",
      "ImageAlt": null,
      "Address": "تهران، میدان ولی عصر، مقابل اداره پست",
      "Discount": null,
      "Price": 7232000,
      "Facilities": []
    },
    {
      "HotelId": 247,
      "HotelName": "پارسیان انقلاب",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "هتل پارسیان انقلاب تهران (رویال گاردن سابق) این هتل 4 ستاره با درجه A با امکانات مناسب در مرکز اداری تجاری شهر تهران   واقع شده است. با تخفیف عالی در رزرو اینترنتی.",
      "Url": "/fa/hotel/هتل-پارسیان-انقلاب-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/tehran-parsian-enghelab-hotel-facade.jpg",
      "ImageTitle": "هتل پارسیان انقلاب تهران",
      "ImageAlt": null,
      "Address": " تهران، خیابان طالقانی، بین خیابان ولیعصر و حافظ، پلاک 341",
      "Discount": null,
      "Price": 8040000,
      "Facilities": []
    },
    {
      "HotelId": 248,
      "HotelName": "بزرگ",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "هتل بزرگ تهران در موقعیتی بسیار مناسب (تقاطع خیابان استاد مطهری و ولیعصر) نسبت به مراکز تجاری و تفریحی شهر تهران با امکانات و تجهیزات خوب می تواند مورد توجه مسافران علی الخصوص سفرهای کاری و تجاری قرار گیرد.",
      "Url": "/fa/hotel/هتل-بزرگ-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-بزرگ-تهران.jpg",
      "ImageTitle": "هتل بزرگ تهران",
      "ImageAlt": null,
      "Address": "تهران، تقاطع خیابان استاد مطهری و ولیعصر",
      "Discount": null,
      "Price": 8480000,
      "Facilities": []
    },
    {
      "HotelId": 250,
      "HotelName": "بزرگ فردوسی",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "امکانات مطلوب، نزدیکی به اماکن مهم تهران، دارای مجموعه ورزشی تفریحی",
      "Url": "/fa/hotel/هتل-بزرگ-فردوسی-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/ferdowsi-grand-hotel.jpg",
      "ImageTitle": "هتل بزرگ فردوسی تهران",
      "ImageAlt": null,
      "Address": "تهران، میدان امام خمینی، ابتدای خیابان فردوسی، خیابان کوشک مصری، جنب کاخ وزارت خارجه، شماره 24",
      "Discount": null,
      "Price": 9500000,
      "Facilities": []
    },
    {
      "HotelId": 259,
      "HotelName": "هویزه",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "هتل هویزه تهران از گروه هتل های کوثر واقع شده در مرکز شهر تهران، مجهز به امکانات اقامتی خوب که می تواند مورد توجه میهمانان قرار گیرد.",
      "Url": "/fa/hotel/هتل-هویزه-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-هویزه-تهران.jpg",
      "ImageTitle": "هتل هویزه تهران",
      "ImageAlt": null,
      "Address": "تهران، تقاطع خیابان آیت اله طالقانی و استاد نجات اللهی",
      "Discount": null,
      "Price": 10580000,
      "Facilities": []
    },
    {
      "HotelId": 260,
      "HotelName": "سیمرغ",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "هتل سیمرغ تهران با سبک معماری مدرن واقع شده درخیابان ولیعــصر حدفاصل پارک ساعی و خیابان دکتر بهشتی",
      "Url": "/fa/hotel/هتل-سیمرغ-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/5454474.jpg",
      "ImageTitle": "هتل سیمرغ تهران",
      "ImageAlt": null,
      "Address": "تهران، خیابان ولیعصر، حد فاصل پارک ساعی و خیابان دکتر بهشتی",
      "Discount": null,
      "Price": 13900000,
      "Facilities": []
    },
    {
      "HotelId": 261,
      "HotelName": "آساره",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "هتل آساره تهران دارای امکانات اقامتی و تفریحی از جمله جکوزی و حمام برای هر واحد، سونای خشک و بخار و جکوزی و حوضچه آب سرد  و آبشار در مجموعه ورزشی هتل می باشد که می تواند مورد توجه میهمانان قرار گیرد.",
      "Url": "/fa/hotel/هتل-آساره-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-آساره-تهران.jpg",
      "ImageTitle": "هتل آساره تهران",
      "ImageAlt": null,
      "Address": "تهران، خیابان آزادی، روبروی دانشکده دامپزشکی، خیابان زارع",
      "Discount": null,
      "Price": 8150000,
      "Facilities": []
    },
    {
      "HotelId": 4800,
      "HotelName": " المپیک",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "چشم انداز زیبا از کوه دماوند",
      "Url": "/fa/hotel/هتل-المپیک-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-المپیک-تهران.jpg",
      "ImageTitle": "هتل المپیک تهران",
      "ImageAlt": null,
      "Address": "تهران، اتوبان تهران-کرج، ضلع غربی مجموعه آزادی",
      "Discount": null,
      "Price": 10480000,
      "Facilities": []
    },
    {
      "HotelId": 5203,
      "HotelName": "رمیس",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "امکانات مناسب سیاحتی - زیارتی",
      "Url": "/fa/hotel/هتل-ایبیس-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/ibis-hotel-00155.jpg",
      "ImageTitle": "هتل ایبیس تهران",
      "ImageAlt": null,
      "Address": "تهران، کیلومتر 30 اتوبان خلیج فارس(تهران-قم)، ضلع جنوبی فرودگاه امام، روبروی ترمینال شماره 1",
      "Discount": null,
      "Price": 2800000,
      "Facilities": []
    },
    {
      "HotelId": 7033,
      "HotelName": "بزرگ 2",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "امکانات رفاهی خوب هتل، دسترسی به مراکز مهم اداری و تجاری، دسترسی به جاذبه&zwnj;ها",
      "Url": "/fa/hotel/هتل-بزرگ-2-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-بزرگ-2-تهران.jpeg",
      "ImageTitle": "هتل بزرگ 2 تهران ",
      "ImageAlt": null,
      "Address": "تهران، خیابان استاد نجات اللهی (ویلا)، خیابان سپند شرقی، پلاک 28",
      "Discount": null,
      "Price": 6000000,
      "Facilities": []
    },
    {
      "HotelId": 7808,
      "HotelName": "آرامیس",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "واقع شدن در منطقه تجاری و توریستی و دسترسی آسان به بازار بزرگ شهر همچنین &nbsp;برخورداری از امکانات مدرن و.. از دلائل انتخاب این هتل است.",
      "Url": "/fa/hotel/هتل-آرامیس-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-آرامیس-تهران.jpg",
      "ImageTitle": "هتل بین المللی بوتیک آرامیس تهران",
      "ImageAlt": null,
      "Address": "تهران، خیابان ولیعصر، بالاتر از میدان ولیعصر، نبش کوچه دانش کیان",
      "Discount": null,
      "Price": 7100000,
      "Facilities": []
    }
  ],
  "NearBys": [
    {
      "HotelId": 243,
      "HotelName": "پارسیان آزادی",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": "بیشترین تخفیف رزرو هتل آزادی تهران به همراه توضیحات کامل و عکس، آدرس، نقشه، جزئیات و قیمت اتاق ها به همراه رزرو قطعی و صدور تاییدیه نهایی، حرفه ای ترین مرجع معرفی و رزرو هتل های ایران",
      "Url": "/fa/hotel/هتل-پارسیان-آزادی-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-آزادی-تهران-1.jpg",
      "ImageTitle": "هتل پارسیان آزادی تهران",
      "ImageAlt": "هتل آزادی تهران",
      "Address": "تهران، تقاطع اتوبان یادگار امام و شهید چمران",
      "Discount": 31,
      "Price": 4900000,
      "DistanceText": "2 کیلومتر و 86 متر",
      "DistanceValue": 2086,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر , سونا (خشک، بخار) , جکوزی , spa , اتاق ماساژ , سالن بدنسازی (مخصوص خانم‌ها و آقایان) , سالن بیلیارد",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "تلويريون‌های تعاملی (Interactive) , تلفن (شهری و بين‌المللی ) , قهوه ساز , چای ساز , سرویس بهداشتی (سرویس بهداشتی فرنگی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی) , کافی نت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "پاورسوئیچ , آنتن مرکزی , سیستم اعلام حریق ( با قابليت آدرس‌دهی و مجهز شده به آژير و چراغ چشمک‌زن اختصاصی در اتاق‌ها) , سيستم خاموش کننده اتوماتيک حريق در داخل اتاق‌ها , تهویه مطبوع , نشانگر ديجيتالی (مزاحم نشويد و اتاق را نظافت کنيد) , صندوق امانات , آسانسور",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران(رستوران 24 ساعته پارسه، رستوران فرنگی ارکیده با منظره بی‌نظیر، رستوران ژاپنی کنزو، رستوران فضای باز سرو، رستوران پانیذ) , کافی‌شاپ (کافی‌شاپ 24 ساعته پارسه، لابی لانژ نیلو، کافی هاوس آسمان) , سالن صبحانه خوری یاسمن , مینی بار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "رستوران فضای باز سرو , فضای سبز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات ویژه",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "Keyword": "Amenities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-star",
          "Description": "پکيج ملزومات بهداشتی (حوله دست و صورت و بدن به صورت مجزا، صابون، شامپوی سر و بدن، لوسيون بدن، خميردندان،‌ سوهان ناخن،‌ کلاه دوش،‌ گوش پاک کن،‌ مسواک، شانه، تيغ اصلاح و خمير ريش، کيسه بهداشتی،  براق کننده کفش و پاشنه کش) در کلیه ی اتاق ها",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "بانک , خشکشویی , تاکسی سرویس , خانه‌داری 24 ساعته , سالن همایش (سالن‌های الماس، برلیان) , اتاق جلسات , سالن پذیرایی (سالن مجلل زرین، ، سالن زمرد، سالن vip پانیذ) , مرکز تجاری",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "حرکت ویلچر در داخل اتاق (اتاق‌های موجود در طبقه 3 هتل مجهز به درب‌های کشویی ویژه معلولین می‌باشد) , حرکت ویلچر در داخل سرویس بهداشتی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 244,
      "HotelName": "پارسیان اوین",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": "موقعیت مکانی هتل اوین تهران  نسبت به بزرگراه های مختلف  دسترسی به فرودگاه مرکز شهر و نمایشگاه بین المللی را آسان نموده است.",
      "Url": "/fa/hotel/هتل-پارسیان-اوین-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/entrance-(1).jpg",
      "ImageTitle": "هتل پارسیان اوین تهران",
      "ImageAlt": "هتل پارسیان اوین",
      "Address": "تهران، بزرگراه چمران، سه راه اوین",
      "Discount": null,
      "Price": 11470000,
      "DistanceText": "2 کیلومتر و 18 متر",
      "DistanceValue": 2018,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ(با ظرفیت 600 دستگاه خودرو)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "حرکت ویلچر در داخل اتاق , حرکت ویلچر در داخل سرویس بهداشتی , ویلچر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "بانک , سالن همایش (کوه نور ۱ و ۲، سالن کارون) , اتاق جلسات , سالن پذیرایی (کوه نور ۱ و ۲) , تاکسی سرویس , سالن زیبایی (آرایشگاه آقایان) , خانه‌داری 24 ساعته , مرکز تجاری , خشکشویی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "کافی‌شاپ (لابی لانژ) , رستوران(رستوران تابستانی آبشار، رستوران پارسه، رستوران پردیس) , مینی بار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر , سونا (داخل سوئیت‌ها) , جکوزی (داخل سوئیت‌ها) , دستگاه ماساژ (داخل سوئیت‌ها)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "تهویه مطبوع , سیستم اعلام حریق , آسانسور , آنتن مرکزی , صندوق امانات (داخل اتاق‌ها) , پاورسوئیچ , نشانگرهای دیجیتالی وضعیت (مزاحم نشوید و اتاق نظافت لازم دارد) , سیستم برق یکپارچه با عملکرد منحصر به کارت اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیونLCD (با رابط تعاملی) , تلفن , کانال‌های ماهواره‌ای , چای ساز , حمام , سیستم کنترل روشنایی بر روی سر تختی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی) , کافی نت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز , رستوران تابستانی آبشار در فضای باز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 7886,
      "HotelName": "دیاموند",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 3,
      "BriefDescription": "نزدیکی به اماکن مهم اداری و تجاری، نزدیکی به نمایشگاه بین المللی تهران، هتلی لوکس و مجموعه ورزشی عالی",
      "Url": "/fa/hotel/هتل-دیاموند-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-دیاموند-تهران.jpg",
      "ImageTitle": "هتل دیاموند شهر تهران",
      "ImageAlt": "هتل دیاموند تهران",
      "Address": "تهران، خیابان فرشته، خیابان مریم غربی، خیابان راز، پلاک 6",
      "Discount": null,
      "Price": 8415000,
      "DistanceText": "951 متر",
      "DistanceValue": 951,
      "Facilities": []
    },
    {
      "HotelId": 7913,
      "HotelName": "آکادمی",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 4,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-آکادمی-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/footabl-academy-hotel-0051.jpg",
      "ImageTitle": "Tehran Akademi hotel",
      "ImageAlt": "هتل آکادمی",
      "Address": " تهران، جنب درب غربی مجموعه ورزشی آزادی",
      "Discount": 10,
      "Price": -1,
      "DistanceText": "1 کیلومتر و 431 متر",
      "DistanceValue": 1431,
      "Facilities": []
    },
    {
      "HotelId": 9460,
      "HotelName": "بلوط",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 3,
      "BriefDescription": "قرارگیری در منطقه ای خوش آب و هوا، نزدیکی به نمایشگاه بین المللی تهران، دسترسی به جاذبه ها و مکان های دیدنی تهران، امکانات و خدماتی مناسب، دوری از شلوغی شهر، نوساز بودن",
      "Url": "/fa/hotel/هتل-بلوط-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-بلوط-تهران.jpg",
      "ImageTitle": "هتل بلوط تهران",
      "ImageAlt": "هتل بلوط",
      "Address": "تهران، ولنجک، خیابان یمن، بالاتر از چهارراه مقدس اردبیلی، سمت چپ، باغ گیاه پزشکی",
      "Discount": null,
      "Price": 10900000,
      "DistanceText": "1 کیلومتر و 155 متر",
      "DistanceValue": 1155,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ(با ظرفیت 50 دستگاه خودرو)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "چای ساز , سرویس بهداشتی(سرویس بهداشتی فرنگی) , یخچال , تلویزیون , تلفن",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "استخر روباز مخصوص آقایان (رایگان) , پارک بازی کودکان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "کافی شاپ , رستوران , مینی بار",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "تهویه مطبوع , سیستم اعلام حریق , آسانسور , آنتن مرکزی , صندوق امانات , پاور سوئیچ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "سالن همایش , اتاق جلسات , سالن پذیرایی , تاکسی سرویس , خانه داری 24 ساعته , خشکشویی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی سیم (داخل اتاق، داخل لابی)",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 10758,
      "HotelName": "آکادمی ملی المپیک",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 3,
      "BriefDescription": "امکانات خیلی خوب، مجموعه ورزشی، نزدیکی به اماکن مهم",
      "Url": "/fa/hotel/هتل-آکادمی-ملی-المپیک-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/tehran-national-olympic-academy-hotel.jpg",
      "ImageTitle": "هتل آکادمی ملی المپیک تهران",
      "ImageAlt": "هتل آکادمی ملی المپیک",
      "Address": "خیابان ولی عصر، ابتدای بزرگراه نیایش، خیابان سئول، ورودی غربی مجموعه ورزشی انقلاب",
      "Discount": 10,
      "Price": -1,
      "DistanceText": "1 کیلومتر و 434 متر",
      "DistanceValue": 1434,
      "Facilities": []
    },
    {
      "HotelId": 11871,
      "HotelName": "مدیا",
      "CityName": "تهران",
      "HotelTypeName": "هتل آپارتمان",
      "HotelRating": 3,
      "BriefDescription": "امکانات خوب، پرسنل مجرب و کارآزموده",
      "Url": "/fa/hotel/هتل-آپارتمان-مدیا-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/tehran-media-apartment-hotel.jpg",
      "ImageTitle": "هتل آپارتمان مدیا تهران",
      "ImageAlt": "هتل آپارتمان مدیا",
      "Address": "تهران، بزرگراه آفریقا، ارمغان شرقی، پلاک 58",
      "Discount": null,
      "Price": 5760000,
      "DistanceText": "2 کیلومتر و 235 متر",
      "DistanceValue": 2235,
      "Facilities": []
    },
    {
      "HotelId": 11890,
      "HotelName": "پاریز",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 3,
      "BriefDescription": "امکانات خوب، پرسنل مجرب و موقعیت مکانی مناسب",
      "Url": "/fa/hotel/هتل-پاریز-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-پاریز-تهران.jpg",
      "ImageTitle": "هتل پاریز",
      "ImageAlt": "هتل پاریز",
      "Address": "تهران، جردن، بین میرداماد و ظفر، بلوار مینا",
      "Discount": null,
      "Price": 6480000,
      "DistanceText": "2 کیلومتر و 926 متر",
      "DistanceValue": 2926,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بدنسازی , استخر , سونا (خشک ، بخار) , جکوزی , حوضچه آب سرد",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "میز و صندلی , میز تحریر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران , سالن صبحانه خوری , آب رایگان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "روم سرویس , پذیرش 24ساعته , خدمات تهیه بلیت  , اتاق چمدان , دستگاه فکس، فتوکپی و پرینت , واکس کفش , خدمات بیدارباش , خشکشویی , تبدیل ارز , سالن کنفرانس , سالن پذیرایی , نمازخانه",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "روزنامه , صندوق امانات , آسانسور , کف‌پوش پارکت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی , عربی , ترکی استانبولی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون LCD , تلفن , سرویس بهداشتی (سرویس بهداشتی فرنگی) , حمام (وان) , آباژور",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 22048,
      "HotelName": "ویستریا",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 5,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-ویستریا-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-ویستریا-تهران.jpg",
      "ImageTitle": "هتل ویستریا تهران",
      "ImageAlt": "هتل ویستریا",
      "Address": "تهران، تجریش، چهارراه قدس، خیابان دربند، ابتدای خیابان احمدی زمانی، پلاک 1",
      "Discount": null,
      "Price": 2000000,
      "DistanceText": "2 کیلومتر و 739 متر",
      "DistanceValue": 2739,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم نامحدود رایگان (در اتاق‌ها و لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "روزنامه , صندوق امانات , آسانسور , تهویه مطبوع , گاوصندوق داخل اتاق , سیستم گرمایشی مرکزی , فمیلی روم , برخی قسمت‌ها فرش شده , سیستم اعلام حریق , پاور سوئیچ , سیستم اطفاء حریق , نشانگرهای دیجیتالی وضعیت (مزاحم نشوید و اتاق نظافت لازم دارد) , برق اضطراری , سیستم کارت کلید الکترونیکی درب ها",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "تلویزیون (شبکه‌های خبری) , تلفن , چای ساز , سرویس بهداشتی (سرویس بهداشتی فرنگی) , برخی واحدها دارای وان هستند",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "رستوران بام , کافی شاپ هتل در پشت بام هتل قرار دارد.",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "مینی بار (با هزینه) , سالن صبحانه خوری",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات معلولین",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/disabled.png",
          "Keyword": "Disabled  ",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-handicapaccessiable",
          "Description": "خدمات برای معلولین",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بدنسازی , اتاق ماساژ , اسپا , استخر , سونا (خشک ، بخار) , جکوزی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ با ظرفیت 98 خودرو",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "منظره شهر",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "سوئیت‌ها دارای اتاق نشیمن هستند , میز کار , برخی اتاق‌ها دارای مبلمان هستند",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "خانه‌داری 24 ساعته , پذیرش 24ساعته , خدمات تهیه بلیت  , انبار چمدان , راهنمای مهمان , مرکز تجاری , دستگاه  فتوکپی و پرینت , واکس کفش , خشکشویی , خدمات بیدارباش , صرافی , سالن همایش , اتاق جلسات , سالن پذیرایی , نمازخانه",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "رخت‌آویز",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 22204,
      "HotelName": "ملل",
      "CityName": "تهران",
      "HotelTypeName": "هتل آپارتمان",
      "HotelRating": 3,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-آپارتمان-ملل-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-ملل-تهران.jpeg",
      "ImageTitle": "هتل آپارتمان ملل تهران",
      "ImageAlt": "هتل آپارتمان ملل تهران",
      "Address": "تهران، خیابان ولیعصر، بالاتر از خیابان دستگردی،  خیابان ناصری",
      "Discount": null,
      "Price": 10200000,
      "DistanceText": "2 کیلومتر و 445 متر",
      "DistanceValue": 2445,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "فضای بیرون",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Outdoors.png",
          "Keyword": "Outdoors",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-tree",
          "Description": "فضای سبز , رستوران بام",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بدنسازی , سونا",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "اتاق نشیمن , میز و صندلی , مبلمان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران , کافی شاپ",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "پارکینگ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Parking.png",
          "Keyword": "Parking",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-parking",
          "Description": "پارکینگ با ظرفیت محدود",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "روم سرویس , خدمات تهیه بلیت  , اتاق چمدان , دستگاه فکس، فتوکپی و پرینت , خدمات بیدارباش , پذیرش 24ساعته , سالن کنفرانس , اتاق جلسات , تاکسی سرویس , نمازخانه , خدمات CIP",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "روزنامه , صندوق امانات , آسانسور , سیستم سرمایشی مرکزی , سیستم گرمایشی مرکزی , کف‌پوش سرامیک , کارت هوشمند اتاق",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات ویژه",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/vip.png",
          "Keyword": "Amenities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-star",
          "Description": "خدمات راهنمای تور",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون LCD , تلفن , چای ساز , آشپزخانه با امکان پخت غذا , سرویس بهداشتی(سرویس بهداشتی فرنگی) , حمام",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 22310,
      "HotelName": " طوبی",
      "CityName": "تهران",
      "HotelTypeName": "هتل بوتیک",
      "HotelRating": 3,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-بوتیک-طوبی-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/toba.jpg",
      "ImageTitle": "هتل بوتیک طوبی تهران",
      "ImageAlt": "هتل بوتیک طوبی",
      "Address": "تهران، خیابان ولی عصر، بعد از ظفر، کوچه ناصری",
      "Discount": null,
      "Price": 12535000,
      "DistanceText": "2 کیلومتر و 407 متر",
      "DistanceValue": 2407,
      "Facilities": []
    },
    {
      "HotelId": 22938,
      "HotelName": "سپهر",
      "CityName": "تهران",
      "HotelTypeName": "هتل آپارتمان",
      "HotelRating": 2,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-آپارتمان-سپهر-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/هتل-سپهر-تهران-12.jpg",
      "ImageTitle": "هتل آپارتمان سپهر تهران",
      "ImageAlt": "هتل آپارتمان سپهر",
      "Address": "تهران، خیابان فرشته، خیابان بوسنی و هرزگوین ،چهارراه حسابی، کوچه سالور",
      "Discount": null,
      "Price": 10100000,
      "DistanceText": "1 کیلومتر و 569 متر",
      "DistanceValue": 1569,
      "Facilities": [
        {
          "FacilityId": null,
          "Title": "اینترنت",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Internet.png",
          "Keyword": "Internet",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-wifi",
          "Description": "اینترنت بی‌سیم (داخل اتاق، داخل لابی)",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات تفریحی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Activities.png",
          "Keyword": "Activities",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-swimming",
          "Description": "سالن بدنسازی , سونا (خشک ، بخار) , استخر , جکوزی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق نشیمن",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/LivingArea.png",
          "Keyword": "LivingArea",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fireplace",
          "Description": "اتاق نشیمن , میز آرایش , مبلمان",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "خوراکی و نوشیدنی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Food-Drink.png",
          "Keyword": "Meal",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-fork",
          "Description": "رستوران , کافی شاپ , سالن صبحانه خوری",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "سرویس ها",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Services.png",
          "Keyword": "Services",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-doorman",
          "Description": "روم سرویس , اتاق چمدان , دستگاه فکس، فتوکپی و پرینت , واکس کفش , لاندری , خدمات بیدارباش , صرافی , تاکسی سرویس شبانه‌روزی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات عمومی",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/General.png",
          "Keyword": "General",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-availability",
          "Description": "صندوق امانات , آسانسور , کف‌پوش موکت",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "زبانهای قابل استفاده",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Languages-spoken.png",
          "Keyword": "Languages",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-globe",
          "Description": "انگلیسی",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "منظره",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/View.png",
          "Keyword": "View",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-eye ",
          "Description": "نمای حیاط و کوچه",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق خواب",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/Bedroom.png",
          "Keyword": "Bedroom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "fa fa-bed",
          "Description": "کمد لباس",
          "IsSpecial": false
        },
        {
          "FacilityId": null,
          "Title": "امکانات اتاق ",
          "Image": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "ImageUrl": "https://cdn.safaraneh.com/Images/Hotel/Facilities/general-room.png",
          "Keyword": "GeneralRoom",
          "ImageAlt": null,
          "ImageTitle": null,
          "CssClass": "soap-icon-television",
          "Description": "یخچال , تلویزیون LED , تلفن , چای ساز , آشپزخانه با امکان پخت غذا , سرویس بهداشتی(سرویس بهداشتی فرنگی) , حمام",
          "IsSpecial": false
        }
      ]
    },
    {
      "HotelId": 39110,
      "HotelName": "پارک وی",
      "CityName": "تهران",
      "HotelTypeName": "هتل",
      "HotelRating": 3,
      "BriefDescription": null,
      "Url": "/fa/hotel/هتل-پارک-وی-تهران",
      "ImageUrl": "https://cdn.safaraneh.com/Images/Accommodations/fa/img_20230522_1545031.jpg",
      "ImageTitle": "هتل پارک وی",
      "ImageAlt": "هتل پارک وی تهران",
      "Address": "تهران، خیابان ولیعصر، نرسیده به پارک وی، خیابان استقلال، مجموعه تلاش",
      "Discount": null,
      "Price": null,
      "DistanceText": "194 متر",
      "DistanceValue": 194,
      "Facilities": []
    }
  ]
};
const scoreInfo = {
  "Comments": [
    {
      "CommentId": 8188,
      "FullName": "محمد حسین",
      "CityName": "شیراز",
      "Comment": "خیلی ممنون از عوامل و پرسنل این هتل بررای تجربه خوب ما تو این هتل",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-12-05T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 8183,
      "FullName": "حامد شفقی",
      "CityName": null,
      "Comment": "هتل 5 ستاره استقلال هتل خیلی ضعیفی هست پرسنل هتل عالین و خود هتل تعریفی نداره",
      "IsRecommended": false,
      "Satisfaction": 30,
      "RoomService": 2,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-11-29T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 8163,
      "FullName": "حامد",
      "CityName": null,
      "Comment": "خیلی سبک معماری هتل رو دوست داشتم شبیه به هتل های خارجی بود قشنگ",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-11-27T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 8119,
      "FullName": "آیناز",
      "CityName": null,
      "Comment": "کاش رونالدو تو این هتل اقامت داشت. چی بود اون هتل که رفته بود آخه",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-11-12T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 8067,
      "FullName": "حمیده",
      "CityName": "خرمدره",
      "Comment": "همه چیز عالی بود بغیر از رفت و آمد خیلی سخت بود برای ما",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-10-01T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 8001,
      "FullName": "نیره چاوشی زاده",
      "CityName": "قم",
      "Comment": "ما دو روز در این هتل بسیار زیبا  عالی اقامت داشتیم و واقعا از مهمان نوازیشون راضی بودیم ممنون از همه پرسنل و کارکنان این هتل",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-07-22T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 7980,
      "FullName": "صبا ترکیان",
      "CityName": "دورچه",
      "Comment": "بسیار راضی بودیم و اقامت عالی رو سپری کردیم تنها مشکلی که داشتیم ترافیک اتوبان چمران بود",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-07-10T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7974,
      "FullName": "حمید زارع",
      "CityName": "یزد",
      "Comment": "تجربه خوبی در این هتل داشتیم مخصوصا به دلیل مسافت بسیار نزدیکی که تا نمایشگاه بین المللی تهران داشت.",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-07-08T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7965,
      "FullName": "سیامک",
      "CityName": "جلفا",
      "Comment": "همه چیز عالی بود و بینظیر. مخصوصا منوی غذا و تمیز بودن اتاق ها",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 9,
      "CreateDate": "2023-07-05T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7916,
      "FullName": "حمید قنبرزاده",
      "CityName": null,
      "Comment": "سلام من سی سال هست که به هتل میام ، اطاق واقعا کیفیتش پایینه شبی 4600 هزار تومان با این وضع تشک های داغون داغون لحاف های رنگ زرد صدای ازار دهنده کولر  یخچال خالی ، چه برس این هتل امد ؟ این چه مدیر و مدبری هست ؟  ",
      "IsRecommended": false,
      "Satisfaction": 20,
      "RoomService": 1,
      "ResturantQuality": 1,
      "DealWithPassanger": 5,
      "CreateDate": "2023-06-07T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 7873,
      "FullName": "وحیده کاظمی",
      "CityName": null,
      "Comment": "در سرویس هنگام استحمام اب دوش از وام به کف زمین میریزه و کف سرویس اصلا چاه برای خروج اب نداره و باعث جمع شدن اب میشه و این خوب نیست و اینکه داخل اتاق هایی که به اتاق کنار راه داره اصلا امنیت نداره و قفل نیست و پشت درب فقط بک مانع اویز لباس هست که با حل دادن میشه وارد اتاق مسافر کناری شد",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 6,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-04-26T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7868,
      "FullName": "مهدی منصوری",
      "CityName": "تهران",
      "Comment": "هتل با اصالت و شیک و بزرگ ،دارای تمامی امکانات ،مخصوصا لابی این هتل خیلی بزرگ و شیکه،پرسنلش عالین،دارای چندین رستوران باغذاهای متنوع،تالار دریای نورش هم که واقعا عالیه",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-04-17T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 7844,
      "FullName": "لاله انوری",
      "CityName": "مشهد",
      "Comment": "امکانات در حد هتل 2 ستاره بود رقتار پرسنل اصلا در شان یک هتل نبود در مجموع ، هرگز دوباره این هتل رو انتخاب نمی کنم",
      "IsRecommended": false,
      "Satisfaction": 20,
      "RoomService": 1,
      "ResturantQuality": 5,
      "DealWithPassanger": 1,
      "CreateDate": "2023-04-05T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 7846,
      "FullName": "نسرین کریمی",
      "CityName": null,
      "Comment": "خیلی خوب بود ",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 8,
      "DealWithPassanger": 10,
      "CreateDate": "2023-04-05T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 7840,
      "FullName": "احمدی ",
      "CityName": "نیشابور",
      "Comment": "همه چی خوب بود فقط دوست دارم بدونم یه چای 2 نفره چرا 520هزارتومن از من پول گرفتن \nتاکیید میکنم یک فوری با دو عدد فنجان 520000ت پانصدوبیست هزار تمن",
      "IsRecommended": false,
      "Satisfaction": 60,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-03-30T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 7839,
      "FullName": "سعید وفائی",
      "CityName": null,
      "Comment": "باسلام. بلحاظ درجه بندی هتل از نظر خدمات و کیفیت خود هتل استقلال در تهران بنظرمن در حد مسافرخانه هم نبود. سپاس اگر گوش شنوا باشد",
      "IsRecommended": false,
      "Satisfaction": 10,
      "RoomService": 1,
      "ResturantQuality": 5,
      "DealWithPassanger": 7,
      "CreateDate": "2023-03-29T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7794,
      "FullName": "رضوان حسن دوست",
      "CityName": "تهران",
      "Comment": "بسیار عالی ",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2023-03-09T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7795,
      "FullName": "علی عباسی",
      "CityName": "تهران",
      "Comment": "بسیار عالی است ",
      "IsRecommended": false,
      "Satisfaction": 90,
      "RoomService": 8,
      "ResturantQuality": 8,
      "DealWithPassanger": 10,
      "CreateDate": "2023-03-09T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7754,
      "FullName": "جواد  صدرالدینی",
      "CityName": "تهران",
      "Comment": "خیلی بد",
      "IsRecommended": false,
      "Satisfaction": 20,
      "RoomService": 2,
      "ResturantQuality": 1,
      "DealWithPassanger": 9,
      "CreateDate": "2023-01-19T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7747,
      "FullName": "شرکت پویان مهر",
      "CityName": "تهران",
      "Comment": "باسلام\nاز بابت راهنمایی وخدمات ویژه پرسلین سفرانه که ما را دراین مسافرت یاری فرموده اند. صمیمانه متشکرم",
      "IsRecommended": false,
      "Satisfaction": 80,
      "RoomService": 6,
      "ResturantQuality": 10,
      "DealWithPassanger": 8,
      "CreateDate": "2023-01-10T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7730,
      "FullName": "حمید اکبرپور",
      "CityName": "تهران",
      "Comment": "من هتلو بابت استخرش گرفتم، پشت تلفنم سوال کردم، گفتن داره. اما استخرش در دست بازسازی بود",
      "IsRecommended": false,
      "Satisfaction": 30,
      "RoomService": 4,
      "ResturantQuality": 5,
      "DealWithPassanger": 4,
      "CreateDate": "2022-12-21T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7723,
      "FullName": "حمیده اقتداری",
      "CityName": "تهران",
      "Comment": "عالی",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-12-16T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7705,
      "FullName": "علیرضا یارمحمدی",
      "CityName": "تهران",
      "Comment": "کرایه از هتل تا فروگاه را 250 هزار تومان حساب کردن درست است من با 110 هزار تومان از فرودگاه به هتل رفتم ",
      "IsRecommended": false,
      "Satisfaction": 80,
      "RoomService": 7,
      "ResturantQuality": 6,
      "DealWithPassanger": 8,
      "CreateDate": "2022-11-25T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7681,
      "FullName": "امین رجبی",
      "CityName": "تهران",
      "Comment": "سلام واقعا اتاقها در حد هتل دو ستار هست گرمایش و سرمایش خراب موکتها کثیف ",
      "IsRecommended": false,
      "Satisfaction": 30,
      "RoomService": 1,
      "ResturantQuality": 4,
      "DealWithPassanger": 10,
      "CreateDate": "2022-11-04T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 7678,
      "FullName": "م.ش",
      "CityName": "همدان",
      "Comment": "متاسفانه نسبت به هزینه اصلا امکانات اتاق مناسب نبود،سیستم گرمایشی رو روشن نکردن و تمام شب رو سرد بود ،سروبس بهداشتی کاملا تمیز نبود و حتی مایع دستشویی نداشت.تمام وسایل قدیمی بود،درب تراس خراب بود و بسته نمیشد و... با این هزینه میشد جای خیلی بهتری رو رزرو کرد.",
      "IsRecommended": false,
      "Satisfaction": 30,
      "RoomService": 1,
      "ResturantQuality": 8,
      "DealWithPassanger": 8,
      "CreateDate": "2022-10-29T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 7672,
      "FullName": "مجتبی  محمدی ",
      "CityName": "تهران",
      "Comment": "رمز وای فای مشکل اتاق قدیمی صبحانه خوب",
      "IsRecommended": false,
      "Satisfaction": 60,
      "RoomService": 5,
      "ResturantQuality": 6,
      "DealWithPassanger": 9,
      "CreateDate": "2022-10-25T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6610,
      "FullName": "AkBr Behske",
      "CityName": "تهران",
      "Comment": "سلام همچی عالی",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-08-18T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6611,
      "FullName": "Iman",
      "CityName": "Mshd",
      "Comment": "رفتار پرسنل عالی \nدر کل عالی",
      "IsRecommended": false,
      "Satisfaction": 90,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-08-18T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6600,
      "FullName": "سید هادی  هاشمی ",
      "CityName": "تهران",
      "Comment": "هتل استقلال درحد مسافرخانه ای بیش نبود حیف پول",
      "IsRecommended": false,
      "Satisfaction": 10,
      "RoomService": 1,
      "ResturantQuality": 3,
      "DealWithPassanger": 5,
      "CreateDate": "2022-08-15T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6552,
      "FullName": "معصومه رحیمی",
      "CityName": "تهران",
      "Comment": "نصبت به پولی که داده میشه و نصبت به پنج ستاره بودن هتل اصلا خدمات خوبی نداره",
      "IsRecommended": false,
      "Satisfaction": 20,
      "RoomService": 5,
      "ResturantQuality": 5,
      "DealWithPassanger": 10,
      "CreateDate": "2022-07-15T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6542,
      "FullName": "سهیل فخیم",
      "CityName": "تهران",
      "Comment": "با تشکر از کلیه پرسنل با شخصیت و مهربان ، سفرانه",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-06-27T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6527,
      "FullName": "ایمان نریمآنی ",
      "CityName": "تهران",
      "Comment": "وضعیت اتاق بد بود",
      "IsRecommended": false,
      "Satisfaction": 50,
      "RoomService": 2,
      "ResturantQuality": 7,
      "DealWithPassanger": 6,
      "CreateDate": "2022-06-17T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6505,
      "FullName": "سمیرا  روانبخش",
      "CityName": "تهران",
      "Comment": "عالی",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 9,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-05-30T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6502,
      "FullName": "Shima Sabohi",
      "CityName": "تهران",
      "Comment": "اصلا راضی نبودم",
      "IsRecommended": false,
      "Satisfaction": 10,
      "RoomService": 1,
      "ResturantQuality": 1,
      "DealWithPassanger": 1,
      "CreateDate": "2022-05-28T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6477,
      "FullName": "علی روانفر",
      "CityName": "تهران",
      "Comment": "کیفیت هتل ،اتاقهای هتل بسیار بد بود\nاتاقها همگی قدیمی\nبرخورد پرسنل خوب نبود چون به اعتراضها عادت کرده اند.\nبههمیپ خاطر امروز هتل خود را عوض نمودم.",
      "IsRecommended": false,
      "Satisfaction": 10,
      "RoomService": 1,
      "ResturantQuality": 1,
      "DealWithPassanger": 2,
      "CreateDate": "2022-05-03T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6459,
      "FullName": "حامد زرابی",
      "CityName": "تهران",
      "Comment": "عالی بود نمیدونم چرا این همه وقت هتل ارم اقامت میگرفتیم،استقلال عالی بود باز هم برمیگردیم",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 9,
      "ResturantQuality": 9,
      "DealWithPassanger": 10,
      "CreateDate": "2022-04-09T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": true
    },
    {
      "CommentId": 6449,
      "FullName": "محمد واثقی",
      "CityName": "تهران",
      "Comment": "همه چیز عالی بود اما متاسفانه نمی دانم چرا وقتی اتاق را تمیز کردن می گذاشتیم به غیر از سرویس اتاق(اب معدنی-شامپو و.....) اصلا اتاق تمیز نمی شد ملافه ها تعویض نمی شد و حتی سرویس بهدتشتی تمیز نمی شد \nکه این یک ضعف بزرگ برای هتل مجلل مانند این هتل محسوب می شود",
      "IsRecommended": false,
      "Satisfaction": 60,
      "RoomService": 5,
      "ResturantQuality": 4,
      "DealWithPassanger": 8,
      "CreateDate": "2022-04-03T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6451,
      "FullName": "مهدی پور رمضان",
      "CityName": "تهران",
      "Comment": "مشکل در سرویس بهداشتی.عدم شیر الان.عدم خروجی آب.خرابی سیفون و هدر رفت زیاد آب",
      "IsRecommended": false,
      "Satisfaction": 50,
      "RoomService": 4,
      "ResturantQuality": 8,
      "DealWithPassanger": 9,
      "CreateDate": "2022-04-03T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6444,
      "FullName": "زهرا بجنوردی",
      "CityName": "تهران",
      "Comment": "حمام راه خروج آب نداشت واب جمع می شد  وبرای شستن خود شلینگ نداشت البته توالت",
      "IsRecommended": false,
      "Satisfaction": 60,
      "RoomService": 8,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-04-02T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6441,
      "FullName": "فردین نوری",
      "CityName": "تهران",
      "Comment": "اتاق هتل خیلی قدیمیه.",
      "IsRecommended": false,
      "Satisfaction": 50,
      "RoomService": 5,
      "ResturantQuality": 5,
      "DealWithPassanger": 5,
      "CreateDate": "2022-04-01T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6436,
      "FullName": "ساناز ایمری قبادی",
      "CityName": "تهران",
      "Comment": "اینقدر خاطره ی خوبی برامون این هتل ساخت که محاله توی تهران هتل دیگه ای بریم، بسیار برای شأن مسافرها ارزش قائل بودن",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-03-31T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6404,
      "FullName": "سعید مختاری",
      "CityName": "تهران",
      "Comment": "همیشه برای اقامت تهران همین هتل رو انتخاب میکنم ،ولی ایندفعه از تمییزی دستشویی راضی نبودم .بوی بدی میداد و اتاق و برامون عوض نکردن.",
      "IsRecommended": false,
      "Satisfaction": 70,
      "RoomService": 8,
      "ResturantQuality": 7,
      "DealWithPassanger": 10,
      "CreateDate": "2022-03-17T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6398,
      "FullName": "شهریار  شافعی ",
      "CityName": "تهران",
      "Comment": "داخل حمام کاشی ها خراب شده کاغذ دیواری کهنه شده پدر کل اتاق ها نیاز جدی به بازسازی کیفی دارن حیف این هتل مشهور امتیازهای اساسی رو از دست بده",
      "IsRecommended": false,
      "Satisfaction": 60,
      "RoomService": 5,
      "ResturantQuality": 6,
      "DealWithPassanger": 9,
      "CreateDate": "2022-03-13T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6382,
      "FullName": "بهراد رحیمی",
      "CityName": "تهران",
      "Comment": "خیلی بد بود اتاقشون همه چیه اتاق خراب بود اعم از تلفن و توالت و دوش حمام و سرویس و نحوه برخورد پرسنل خیلی بد بود",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 1,
      "ResturantQuality": 3,
      "DealWithPassanger": 1,
      "CreateDate": "2022-03-05T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6361,
      "FullName": "پوریا فرحی",
      "CityName": "تهران",
      "Comment": "حمام خروجی آب نداره،آب سرد قطع و رستوران قیمتاش خیلی فضایی و بیکیفیت بود،🤓😅😭😭😭😭😭😭😭😭😭😭",
      "IsRecommended": false,
      "Satisfaction": 70,
      "RoomService": 5,
      "ResturantQuality": 8,
      "DealWithPassanger": 10,
      "CreateDate": "2022-03-03T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6375,
      "FullName": "معصومه  جودکی",
      "CityName": "تهران",
      "Comment": "همه چی عالی بود فقط برا بیماران  امکانات و غذاهای خاصی موجود نبود",
      "IsRecommended": false,
      "Satisfaction": 10,
      "RoomService": 10,
      "ResturantQuality": 9,
      "DealWithPassanger": 10,
      "CreateDate": "2022-03-03T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6355,
      "FullName": "محودی",
      "CityName": "-",
      "Comment": "هتله قدیمی و خوبیه. مهمترین خوبیش برخورد پرسنله. من راضی بودم. باید توقعتون زیاد نباشه.",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-02-27T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6324,
      "FullName": "راحله قنبری",
      "CityName": "تهران",
      "Comment": "با عرض سلام وادب \nاز نظر بهداشتی بسیار افتضاح بود.پتو و ملافه ها و موکت ودیوار اتاق و سرویس بهداشتی کاملا کثیف بود  و فن دستشویی کار نمیکرد.",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 1,
      "ResturantQuality": 5,
      "DealWithPassanger": 5,
      "CreateDate": "2022-02-20T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6322,
      "FullName": "حسین بهرامی",
      "CityName": "تهران",
      "Comment": "تخت خوابهای  بسیار  بدی دارد",
      "IsRecommended": false,
      "Satisfaction": 50,
      "RoomService": 3,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-02-18T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6296,
      "FullName": "مهدی مقصودی",
      "CityName": "تهران",
      "Comment": "باسلام\nملحفه ها کثیف و پر از مو بود",
      "IsRecommended": false,
      "Satisfaction": 70,
      "RoomService": 4,
      "ResturantQuality": 8,
      "DealWithPassanger": 7,
      "CreateDate": "2022-02-08T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6291,
      "FullName": "نگین  مرادی",
      "CityName": "تهران",
      "Comment": "فقط از رییس مجموعه راضی بودم از برخوردش ولی بقیه موارد افتضاح بود و خودشونم گفتند هتل قرار است بازسازی شود",
      "IsRecommended": false,
      "Satisfaction": 20,
      "RoomService": 3,
      "ResturantQuality": 6,
      "DealWithPassanger": 7,
      "CreateDate": "2022-02-05T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6283,
      "FullName": "سعید نوعی",
      "CityName": "تهران",
      "Comment": "متاسفانه من با هتل های پنج ستاره آنتالیا، استامبول ودبی مقایسه میکنم.",
      "IsRecommended": false,
      "Satisfaction": 60,
      "RoomService": 5,
      "ResturantQuality": 5,
      "DealWithPassanger": 8,
      "CreateDate": "2022-02-01T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6281,
      "FullName": "آرمان اشکانپور",
      "CityName": "تبریز",
      "Comment": "صبحانه هتل بسیار خوب و رضایت بخش بود. فقط فضای اتاق ها آدم رو یاد فیلم های قدیمی میندازه که البته برای من مساله خوشایندی هست.",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-01-31T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6270,
      "FullName": "محمد حسین ایرانپور",
      "CityName": "تهران",
      "Comment": "اطاق بنده در شب اول بی نهایت بد بود و اصلا رضایت نداشتم ولی در شب دوم اطاق خوب بود",
      "IsRecommended": false,
      "Satisfaction": 50,
      "RoomService": 4,
      "ResturantQuality": 7,
      "DealWithPassanger": 6,
      "CreateDate": "2022-01-27T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6272,
      "FullName": "پریسا فرهادی نعمت آبادی",
      "CityName": "تهران",
      "Comment": "لحاف پسرم کثیف شده بود زنگ زدم عوض کنین اصلا ترتیب اثر ندادن و من خیلی گلایه مندم",
      "IsRecommended": false,
      "Satisfaction": 80,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 5,
      "CreateDate": "2022-01-27T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6273,
      "FullName": "سمانه نجاتی",
      "CityName": "مشهد",
      "Comment": "برخورد پرسنل نکته مثبت این هتل بود",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2022-01-27T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 6264,
      "FullName": " مسعود جهانی",
      "CityName": "-",
      "Comment": "صدای اتاق بغلی در اتاق ما می پیچید\t",
      "IsRecommended": false,
      "Satisfaction": 70,
      "RoomService": 7,
      "ResturantQuality": 7,
      "DealWithPassanger": 7,
      "CreateDate": "2022-01-22T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 3581,
      "FullName": "مصطفی امیری مقدم",
      "CityName": "-",
      "Comment": "سیستم نور اتاق کم بود و دستشویی ایرانی نداشت\t",
      "IsRecommended": false,
      "Satisfaction": 80,
      "RoomService": 8,
      "ResturantQuality": 8,
      "DealWithPassanger": 10,
      "CreateDate": "2022-01-19T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 3511,
      "FullName": "مهدی احمدی",
      "CityName": "اصفهان",
      "Comment": "از این لحاظ که نزدیک نمایشگاه بین المللی تهران هست و برای دسترسی به نمایشگاه توی ترافیک اذیت کننده تهران گرفتار نمیشم این هتل رو همیشه انتخاب میکنم و از خدماتشم ناراضی نیستم.",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 7,
      "DealWithPassanger": 9,
      "CreateDate": "2021-11-28T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 3503,
      "FullName": "رضا دبیرمحمدی",
      "CityName": "تهران",
      "Comment": "مهمون خارجی داشتیم نمیشه گفت خیلی جای خوبی است اما نزدیک نمایشگاه دیگه متاسفانه تهران حیلی کم هتله خوب داره",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 9,
      "DealWithPassanger": 10,
      "CreateDate": "2021-11-18T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 3487,
      "FullName": "ناهید وفامنش",
      "CityName": "ساری",
      "Comment": "حس نوستالژیک هتل استقلال تهران برای ما تداعی کنندۀ روزهای پرخاطره هست. از پرسنل مودب و مهمان نواز این هتل کمال تشکر رو دارم. کیفیت خدمات و رستوران در حد عالی بود.",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2021-10-18T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 3473,
      "FullName": "مهدی صالحی",
      "CityName": "اهواز",
      "Comment": "من 5 روز مهمان هتل استقلال بودم برخی از اتاق ها قدیمی هستن اما به طور کلی شرایط هتل مخصوصا کیفیت رستوران ها بسیار بالا است.",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2021-09-25T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 3463,
      "FullName": "موسی سرور",
      "CityName": "کرمانشاه",
      "Comment": "والا اینقدر به ما گفته بودند قدیمیِ نرید ما ترسیده بودیم .اما خدا را شکر هتل خوبی بود ما راضی بوذیم قیمتشم خوب از هم بهتر جای هتل است. عالی",
      "IsRecommended": true,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2021-08-05T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 2992,
      "FullName": "مرادرسول قاضی",
      "CityName": "پیرانشهر",
      "Comment": "همه چی خوب بودفقط درخواست فاکتوررسمی کردیم قراربودبفرستندولی نفرستاندند",
      "IsRecommended": false,
      "Satisfaction": 90,
      "RoomService": 10,
      "ResturantQuality": 10,
      "DealWithPassanger": 10,
      "CreateDate": "2018-11-14T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 2896,
      "FullName": "شاهین",
      "CityName": "آمستردام",
      "Comment": "در شاپینگ سنتر ، یک کیلو پسند خریدم برأی دوستانم که اگر دوست داشتنند چندین کیلو بخرند. فروشنده با زیرکی برند خود را توازن نام گذاری کرده که در لاتین بسیار نزدیک به برند قوی و با آبروی إیرانی تواضع میباشد. هم بسیار گران و هم کهنه و توش حشره موج میزد. با برخورد کاملا بی سواد صاحب فروشگاه که هر دو برادر بودنند. نه تنها نخریدم بلکه دیگه برأی دوستان خارجی أم هرگز این هتل را رزرو نمیکنم و به هتل آزادی یا اسپیناس نقل مکان کردیم.",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 1,
      "ResturantQuality": 2,
      "DealWithPassanger": 1,
      "CreateDate": "2018-06-20T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 1841,
      "FullName": "عرفان رحیم زاده",
      "CityName": "اردبیل",
      "Comment": "<p>با سلام . هتل پارسیان استقال یکی از بهترین هتل ها می باشد. فقط موضوع این هست که مدیریت و عوامل این هتل اصلا اقدامی برای بروز کردن هتل نمیکنند. من حدود 8 سال پیش هم در این هتل اقامت داشتم. ولی تغییر انچنانی مشاهده نکردم. تنها چیزی که تو این هشت سال اضافه شده بود فقط سیستم اینترنت WI-FI بود. حتی عوامل و مدیریت هتل تلیویزیون هتل رو هم عوض نکرده بودند. حالا ما خودمون هیچ!!! یه جوری کنار میاییم. ولی با توجه به اینکه این هتل5 ستاره و  بین المللی هست و مسافران زیادی هم از کشورهای دیگه میاد ، در خور یک هتل 5 ستاره نیست. من خودم به شخصه 2 ستاره میدم به این هتل. انشااله که تو اقامت بعدی شاهد تغییرات کلی در این هتل باشم</p>",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 5,
      "ResturantQuality": 0,
      "DealWithPassanger": 7,
      "CreateDate": "2017-09-15T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 1763,
      "FullName": "مصیبی",
      "CityName": "شیراز",
      "Comment": "<p>سلام</p><p>من برای مسافرت کاری سه شب در این هتل اقامت داشتم، در کل  راضی بودم اون میزان آرامشی که برای استراحت و استحمام لازم بود را داشت قدیمی و جدید بودن وسایل برایم تفاوتی نداشت</p><p>در کل خوب بود و به افرادی که سفر کاری میروند پیشنهاد میکنم</p>",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 5,
      "ResturantQuality": 0,
      "DealWithPassanger": 5,
      "CreateDate": "2017-07-17T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 1734,
      "FullName": "محمدرضا دلدل",
      "CityName": "یزد",
      "Comment": "<p>اتاق های اصلا در خور هتل 5 ستاره نبود . واقعا وسایل کهنه و قدیمی بودن . به شخصه ترجیح میدم به هتلی برم که وسایل مدرن و شیک باشه</p>",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 1,
      "ResturantQuality": 0,
      "DealWithPassanger": 10,
      "CreateDate": "2017-07-05T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 1731,
      "FullName": "آزاده فكوري ",
      "CityName": "بندر انزلي ",
      "Comment": "<p>متاسفنه هتل پارسيان استقلال اصلا در حد و اندازه يك هتل ٥ستاره نيست و يا دست كم در حال حاصر نيست . اتاق هاي برج شرفي كه گويا تو سازي شده اند كماكان نياز به نوسازي دارتد . يحچال داخل اتاق معلوم نبود متعلق به چه قرني هست . سرويس بهداشتي  يك هتل ايراني بايد شلنگ آب داشته باشد .خشك كن مو در حمام موجود نبود . به هيچ عنوان اين هتل را به ديگران توصيه نمي كنم و حاصر به استفاده دوباره از اين هتل نيز نيستم . اميدوارم بازخورد نطر مشتريان در بهسازي هتل مؤثر باشد .</p>",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 5,
      "ResturantQuality": 0,
      "DealWithPassanger": 7,
      "CreateDate": "2017-07-04T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 1681,
      "FullName": "علیرضا آذری ",
      "CityName": "تبریز",
      "Comment": "<p>اتاق ها هیچ تغییری نسبت به ده سال گذشته نکرده است تلویزیون ها الان تو دهات هم استفاده نمی شود.لذا اتاق ها مورد تایید بنده برا یک هتل 5 ستاره نیست .ضمنا هتلی 5 ستاره هست که امکانات استخر و سونا و جکوزی نیز داشته باشد ولی متاسفانه این هتل در قبال مبلغ سی و پنج هزار تومان امکان استفاده از استخر را می دهد.</p>",
      "IsRecommended": false,
      "Satisfaction": 10,
      "RoomService": 8,
      "ResturantQuality": 0,
      "DealWithPassanger": 9,
      "CreateDate": "2017-05-30T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 1672,
      "FullName": "علامحسين عسكرى",
      "CityName": "اصفهان",
      "Comment": "<p>با توجه به بين المللي بودن وتعداد ستاره لوازم كهنه وموكت ها كثيف بودند</p>",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 1,
      "ResturantQuality": 0,
      "DealWithPassanger": 10,
      "CreateDate": "2017-05-27T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 1588,
      "FullName": "مسعوداهتمام حقیقی",
      "CityName": "شیراز",
      "Comment": "<p>ازنظرنظافت اتاق خوب بود اما تجهیزات واثاثیه کلا کهنه و قدیمی بود وضعیت حمام و توالت فرنگی و شیرالات بهداشتی اصلا درحد هتل 3تاره هم نبود البته مراتب نارضایتیم را نیز درموقعتسویه حساب بامسئول هتل اعلام کردم.</p>",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 3,
      "ResturantQuality": 0,
      "DealWithPassanger": 7,
      "CreateDate": "2017-04-23T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 1346,
      "FullName": "علی",
      "CityName": "داورزن",
      "Comment": "<p>حرفی واسه گفتن نداشت</p>",
      "IsRecommended": false,
      "Satisfaction": 100,
      "RoomService": 10,
      "ResturantQuality": 9,
      "DealWithPassanger": 10,
      "CreateDate": "2014-12-24T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 879,
      "FullName": "مسعود نوروزی",
      "CityName": "رشت",
      "Comment": "<p>برخورد و رفتار کارکنان هتل عالی و کیفیت غذا و رستوران مطلوب بود.ولی متاسفانه کیفیت و نظافت اتاق اصلا در حد نام این هتل نبود.مخصوصا سرویس بهداشتی با دوش حمام خرابش!اما با تجربیات قبلی من در خصوص هتلهای پنج ستاره ایران این هتل نمره قبولی میگیرد.</p>",
      "IsRecommended": true,
      "Satisfaction": 70,
      "RoomService": 5,
      "ResturantQuality": 7,
      "DealWithPassanger": 10,
      "CreateDate": "2014-01-31T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 758,
      "FullName": "فرهاد حیدری",
      "CityName": "تربت حیدریه ",
      "Comment": "<p>ضمن عرض تبریک سال جدید 2 نکته که بنظر اینجانب رسید به  ساتحضار میرسانم: 1-آسانسور در زمان ایستادن در طبقات(بخصوص هنگام بالا رفتن )بنظر  میرسددارای اشکال است. 2-اگر در برنامه صبحانه هتل از سوسیس وکالباس کم شده و از گروههای غذایی سبزیجات و گوشت بیشتر اسفاده گردد بسیار بهتر خواهد بود. با آرزوی بهروزی برای تمام عزیزان</p>",
      "IsRecommended": true,
      "Satisfaction": 90,
      "RoomService": 9,
      "ResturantQuality": 8,
      "DealWithPassanger": 10,
      "CreateDate": "2013-03-29T00:00:00",
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 649,
      "FullName": "darya",
      "CityName": null,
      "Comment": "<p>ايم نوروز دو روز در اين هتل بوديم اگر از قبل رزرو نميكرديم  همون روز اول بر ميگشتيم..اطاقها خيلي كوچيك بود و همون بافت قديمي سرويس بهداشتي و حموم واقعا در شان هتل 5 ستاره نبود به سه ستاره ميخورد-اب حموم سرد بود و مجبور شديم اطاق و عوض كنيم-وقت صبحونه مهمونها زياد بودن و جا  واسه نشستن نبود مجبور شدن از لابي استفاده كنن-نهارش كيفيت پايين بود-وقتي وارد شديم فكر ميكردم حداقل كسي هست جلويدر چمدونا رو بگيره  ولي استقبال هتلي واسه هتل 5 ستاره خيلي خيلي ضعيف بود و... در كل روز سوم با اين كه 5 روز تهران بوديم از اين هتل رفتيم همون يك بار كافي بود با توجه به قيمتش واقعا ضعيف بود</p>",
      "IsRecommended": true,
      "Satisfaction": 40,
      "RoomService": 5,
      "ResturantQuality": 5,
      "DealWithPassanger": 6,
      "CreateDate": null,
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    },
    {
      "CommentId": 656,
      "FullName": "هدی محمدی ارباطی",
      "CityName": null,
      "Comment": "<p>من یکهفته در هتل استقلال اقامت داشتم و به نظرم در شان یک هتل 5 ستاره نیست که به حجاب و نوع پوشش خانم ها و اقایان و طرز رفتار افراد ایراد نگیرند بهتر است</p>",
      "IsRecommended": false,
      "Satisfaction": 40,
      "RoomService": 1,
      "ResturantQuality": 2,
      "DealWithPassanger": 1,
      "CreateDate": null,
      "ModifyDate": null,
      "PageUrl": "/fa/hotel/هتل-پارسیان-استقلال-تهران",
      "AccommodationName": "هتل پارسیان استقلال تهران",
      "IsStay": null
    }
  ],
  "TotalScore": 0,
  "Satisfaction": 77,
  "RoomService": 7,
  "ResturantQuality": 7,
  "DealWithPassanger": 8,
  "CommentCount": 158
};
const accomodationInfo ={
  "type": "Hotel",
  "rating": 5,
  "cityId": 164,
  "name": "پارسیان استقلال",
  "displayName": "هتل پارسیان استقلال تهران",
  "address": "تهران، پارک وی، تقاطع بزرگراه شهید چمران و ولی عصر",
  "checkinTime": null,
  "checkoutTime": null,
  "instruction": null,
  "briefDescription": "وجود چهار رستوران ملل (فرانسوی، ایتالیایی، تایلندی، عربی) شما را بدون حضور در آن کشورها، میهمان لذیذترین غذاهای سرزمینهای دور خواهد کرد. پرسنل و نیروی انسانی جوان و مسلط به اصول هتلداری از دیگر مزایای هتل استقلال تهران است که در هتل های پیر تهران کمتر به چشم می خورد. در طراحی اتاقهای هتل استقلال تهران سعی بر آن شده تا تلفیقی از معماری مدرن و معماری سنتی به بهترین شکل ممکن به اجرا گذاشته شود. همه اتاقهای هتل &nbsp;در مجهز بودن به مینی بار، شبکه های ماهواره ایی، شبکه اختصاصی و تلویزیون کابلی برای پخش فیلم سینمایی مشترک هستند.",
  "description": "<h3><span class=\"bold\">اطلاعات کلی در مورد هتل استقلال تهران</span></h3>\r\n<p>در تهران، احتمالاً گذرتان به چهارراه پارک‌وی افتاده و عظمت و بزرگی دو برج بلند سفید رنگ در این منطقه توجهتان را جلب کرده‌است. اینجا هتل پارسیان استقلال تهران است که قدیمی‌ترها آن را با نام سابقش یعنی هتل رویال هیلتون می‌شناسند. این هتل 5 ستاره در سال 1341 شمسی به عنوان شعبه تهران مجموعه هتل‌های بین‌المللی هیلتون افتتاح شد. پس از انقلاب اسلامی نام هتل به استقلال تغییر یافت و در دهه هفتاد شمسی به گروه هتل‌های پارسیان پیوست.</p>\r\n<p>هتل پارسیان استقلال دارای دو بال غربی و شرقی است. بال غربی آن در همان سال 1341 و در 15 طبقه ساخته و افتتاح شد. بال شرقی ده سال بعد از آن، یعنی در سال 1351، مورد بهره‌برداری‌قرار‌گرفت. برج شرقی تا به حال چند بار مورد بازسازی قرار گرفته‌است. به همین خاطر نسبت به بال غربی هتل استقلال نوسازتر بوده و از امکانات و وسائل جدیدتری برخوردار است.</p>\r\n<p>ساعت کاری استخر هتل استقلال تهران، به صورت شیفتی همه روزه از ساعت 9 تا 11 شب است. اتاق‌های dayuse و اکونومی هتل فاقد صبحانه هستند و قابلیت کنسلی ندارد. <a href=\"https://www.safaraneh.com/fa/hotel/%D9%87%D8%AA%D9%84-%D9%BE%D8%A7%D8%B1%D8%B3%DB%8C%D8%A7%D9%86-%D8%A7%D8%B3%D8%AA%D9%82%D9%84%D8%A7%D9%84-%D8%AA%D9%87%D8%B1%D8%A7%D9%86\">هتل استقلال تهران</a> در محدوده طرح زوج و فرد و طرح ترافیک قرار ندارد.</p>\r\n<h3><span class=\"bold\"> اتاق های هتل استقلال تهران</span></h3>\r\n<p>هتل پارسیان استقلال در مجموع دارای 552 باب واحد اقامتی در برج‌های غربی و شرقی است. این هتل انواع اتاق‌های یک تخته، دوتخته و سوئیت‌‌های جونیور و رویال را شامل می‌شود.</p>\r\n<p>کلیه اتاق‌های هتل دارای تراس هستند و برخی نمای کوه را داشته و برخی نمای شهر. چشم‌انداز سوئیت معمولی بال شرقی فقط رو به کوه است و دارای یک تخت دونفره در اتاق خواب می‌باشد. علاوه بر اتاق خواب این سوئیت دارای یک اتاق نشیمن با مبلمان راحت و لوکس نیز می‌باشد.</p>\r\n<p>لوکس‌ترین سوئیت هتل پارسیان استقلال، سوئیت رویال بزرگ است. این سوئیت چشم‌انداز کوه داشته و درون اتاق دارای میز ناهارخوری، اتاق جلسه در نظر گرفته‌شده‌است. صندلی ماساژ، جکوزی، وان، اتاق نشیمن با لوکس‌ترین مبلمان و کلیه امکانات این سوئیت لوکس هستند. برج غربی هتل در حال حاضر در حال بازسازی بوده و امکان رزرو اتاق‌ها و سوئیت‌های آن وجود ندارد و فقط بال شرقی قابل استفاده است.</p>\r\n<h3><span class=\"bold\"> مقایسه قیمت هتل استقلال تهران با سایر هتل های مشابه</span></h3>\r\n<p>با اینکه این هتل یکی از لوکس‌ترین، باسابقه‌ترین و معدود هتل‌های پنج‌ستاره تهران می‌باشد، قیمت‌های آن با توجه به تخفیفات فصلی سفرانه و جشنواره‌های مختلف دوره‌ای بسیار به‌صرفه محسوب می‌شود.</p>\r\n<h3><span class=\"bold\"> امکانات هتل استقلال تهران</span></h3>\r\n<p>در کنار تمام ویژگی‌ها و امتیازات هتل پارسیان استقلال تهران، این هتل موقعیت استراتژیکی دارد. موقعیتی که این سال‌ها، آن را به اولین انتخاب بسیاری از مسافران برای رزرو <a href=\"https://www.safaraneh.com/fa/hotels/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D8%AA%D9%87%D8%B1%D8%A7%D9%86\">هتل تهران</a> تبدیل نموده است. </p>\r\n<p>این هتل بزرگ پنج ستاره در کمترین فاصله با محل دائمی نمایشگاه‌های بین‌المللی تهران قرار دارد. مرکز همایش‌های صدا و سیما، سالن اجلاس سران، میدان تجریش، دانشگاه شهید بهشتی، باشگاه انقلاب و بسیاری دیگر از اماکن مهم تهران نیز در نزدیکی آن هستند. اگر هم به قصد گردش و تفریح به تهران سفر کرده باشید به دلیل دسترسی عالی هتل استقلال به جاذبه‌های توریستی و گردشگری شهر تهران نظیر مجموعه باغ فردوس، کاخ موزه سعدآباد، کاخ نیاوران، دربند، درکه، پل طبیعت، بام تهران و... رزرو هتل استقلال تهران انتخابی ایده‌آل خواهد بود.</p>\r\n<p>علاوه بر این، خدمات و امکاناتی که هتل پارسیان استقلال به عنوان یک هتل پنج ستاره به مسافران و مهمانان خود عرضه می‌کند، همیشه جزء نمونه‌های مثال‌زدنی در صنعت هتل‌داری بوده است. بسیاری از هتل‌های ایران در ارائه هرچه بهتر و باکیفیت‌تر خدمات خود هتل استقلال تهران را الگو قرار داده‌اند.</p>\r\n<p>اینترنت وای فای نامحدود، روم سرویس 24 ساعته، خانه‌داری 24 ساعته، تلویزیون ال‌سی‌دی، ماهواره، تلویزیون کابلی مخصوص پخش فیلم، صندوق امانات، بالکن با چشم‌انداز رو به شهر و کوه‌های شمال تهران و امکان کشیدن سیگار در اتاق، سیستم سرمایش و گرمایش، یخچال، مینی بار، حمام، وان، سرویس بهداشتی فرنگی، سشوار، اتو، میز کار، میز آرایش و...</p>\r\n<p>اما امکانات هتل استقلال تهران تنها به این موارد خلاصه نمی‌شود. با <a href=\"https://www.safaraneh.com/fa\">رزرو هتل</a> استقلال، به صورت رایگان از صبحانه مفصل هتل، پارکینگ با ظرفیت بالا، استخر، سونا، جکوزی، زمین تنیس و اینترنت نامحدود در لابی هتل استفاده کنید. خدمات خشکشویی، بیزنس سنتر، مرکز خرید سوغاتی، غرفه صنایع دستی، خودپرداز بانک، صرافی، آرایشگاه مردانه و... از دیگر خدماتی است که در این هتل بی‌نظیر ارائه می‌گردد.</p>\r\n<p> </p>\r\n<p>رستوران‌ها و کافی‌شاپ‌های متنوع و متعدد هتل پارسیان استقلال یکی از دلایلی است که آن را به عنوان یک هتل پنج ستاره مقصد بسیاری از مهمانان جهت صرف غذا و نوشیدنی در فضایی دنج و ایده‌آل نموده است.</p>\r\n<p>لابی بزرگ هتل استقلال تهران که از شهرت و محبوبیت زیادی برخوردار است. این لابی هر روزه پذیرای تعداد زیادی از افرادی است که این مکان را وعده‌گاه قرارهای کاری و شخصی خود انتخاب می‌کنند.</p>\r\n<p>رستوران‌های رز، آبشار، رستوران سنتی خاتون و رستوران‌های ایتالیایی، فرانسوی و عربی هتل استقلال نیز با منوهای غذایی متنوع و جذاب و نیز فضا و دکوراسیونی خاص و چشم‌نواز، آماده بهترین پذیرایی از مهمانان مقیم در هتل و همچنین افرادی است که از خارج از هتل به قصد صرف غذا و نوشیدنی مراجعه‌می‌کنند.</p>\r\n<p>اما هرچه در مورد امتیازات و ویژگی‌های بی‌شمار هتل استقلال می‌دانیم یک طرف، سالن‌های پذیرایی و برگزاری مراسم این هتل پنج ستاره یک طرف!</p>\r\n<p>سالن دریای نور هتل پارسیان استقلال تهران را قطعا می‌توان به عنوان یکی از زیباترین، بزرگ‌ترین و باشکوه‌ترین تالارهای پذیرایی کشور دانست. ویژگی مهم این سالن در کنار شکوه و جلال و زیبایی خیره‌کننده‌اش، بی‌ستون بودن آن است. این مساله برگزاری انواع جشن‌ها، همایش‌های بزرگ و مراسم‌های رسمی و خانوادگی و پذیرایی از 1000 مهمان را به راحتی و در بهترین شکل آن و با انواع چیدمان‌های متناسب با مراسم‌های گوناگون، امکان‌پذیر می‌کند.</p>\r\n<p>سالن نوفل لوشاتو با فضایی کاملا فرانسوی و نوستالژیک در کنار سالن‌های یاس1 و یاس2 هرکدام برای برگزاری انواع مهمانی‌ها و ضیافت‌ها و مراسم‌ها با تعداد مهمانانی در حدود 150 نفر بسیار مناسب هستند.</p>\r\n<p>اگر هم قصد برگزاری جلسات کاری یا کارگاه‌های آموزشی با تعداد مدعوین 10 الی 20 نفر در فضایی ایده‌آل و با امکانات پیشرفته و متنوع صوتی و تصویری داشته باشید، می‌توانید از اتاق های جلسات هتل پارسیان استقلال بهره بگیرید.</p>\r\n<p> </p>",
  "mendatoryFee": "<ul>\r\n<li>هزینه اقامت کودکان زیر 6 سال به شرط عدم استفاده از سرویس اضافه در هتل استقلال تهران رایگان است و کودکان بالای 6 سال نیز به عنوان فرد بزرگسال به حساب می&zwnj;آیند.</li>\r\n<li>در صورت داشتن مهمان خارجی حتماً نام وی را به لاتین وارد کنید. آژانس در صورت عدم ورود صحیح اطلاعات مسافران و عدم پذیرش آنها مسئولیتی نخواهد داشت.</li>\r\n<li>کنسل کردن رزرو تا 24 ساعت قبل از روز ورود بدون جریمه صورت خواهد گرفت.</li>\r\n<li>در دست داشتن کارت ملی و شناسنامه و برای زوجین و خانواده مدارک احراز محرمیت هنگام پذیرش در هتل الزامی است.</li>\r\n<li>پذیرش زوجین با دارا بودن عقدنامه موقت دارای مهر برجسته دادگستری بلامانع است. در صورت ارائه صیغه&zwnj;نامه حتماً زوجه باید دارای شناسنامه با توضیحات <b>طلاق یا فوت در صفحه دوم</b> باشد.</li>\r\n</ul>\r\n<p></p>",
  "alertNote": "برای رزرو این هتل با تخفیف ویژه جشنواره دی با شماره 02126150052 تماس بگیرید.",
  "telNumber": null,
  "city": {
    "title": "تهران - Tehran",
    "type": "City",
    "isActive": true,
    "parentId": 59,
    "name": "تهران",
    "searchValue": "شهر تهران , IKA , THR , Tehran city",
    "displayName": "تهران ، تهران",
    "id": 164
  },
  "coordinates": {
    "latitude": 35.790538,
    "longitude": 51.413163
  },
  "picture": {
    "path": null,
    "altAttribute": null,
    "titleAttribute": null
  },
  "faqs": [
    {
      "title": "بیشترین تخفیف برای رزرو هتل استقلال تهران را از کجا بگیریم؟",
      "isActive": true,
      "priority": 100,
      "entity": {
        "title": "پارسیان استقلال - Esteghlal",
        "type": "Hotel",
        "isActive": true,
        "parentId": 164,
        "name": "پارسیان استقلال",
        "searchValue": "هتل پارسیان استقلال تهران , Hotel Parsian Esteghlal Tehran , بارسیان , Hotel Parsian Esteghlal Tehran",
        "displayName": "هتل پارسیان استقلال تهران",
        "id": 245
      },
      "question": "بیشترین تخفیف برای رزرو هتل استقلال تهران را از کجا بگیریم؟",
      "answer": "<p>هتل استقلال تهران یکی از بهترین هتل های تجاری کشور است. شما می&zwnj;توانید با مراجعه به سایت سفرانه بیشترین تخفیف را برای رزرو هتل پارسیان استقلال دریافت کنید. سفرانه گارانتی کننده بهترین هتل&zwnj;های تهران بوده و بیشترین تخفیف را به شما ارائه خواهد کرد. همچنین می&zwnj;توانید جهت ثبت رزرو خود با شماره 02179515 تماس بگیرید.</p>",
      "id": 1043
    },
    {
      "title": "شرایط کنسلی هتل استقلال تهران چگونه است؟",
      "isActive": true,
      "priority": 99,
      "entity": {
        "title": "پارسیان استقلال - Esteghlal",
        "type": "Hotel",
        "isActive": true,
        "parentId": 164,
        "name": "پارسیان استقلال",
        "searchValue": "هتل پارسیان استقلال تهران , Hotel Parsian Esteghlal Tehran , بارسیان , Hotel Parsian Esteghlal Tehran",
        "displayName": "هتل پارسیان استقلال تهران",
        "id": 245
      },
      "question": "شرایط کنسلی هتل استقلال تهران چگونه است؟",
      "answer": "<p>در صورتی که رزرو خود را از سفرانه انجام بدهید لغو رزرو یا تغییر تاریخ هتل استقلال تهران برای شما هیچ جریمه&zwnj;ای نخواهد داشت و تا قبل از زمان ورود میهمان به هتل هر زمانی که رزرو لغو شود عودت وجه به صورت کامل صورت می&zwnj;گیرد. این شرایط فقط در صورت رزرو از طریق سفرانه امکانپذیر خواهد بود.</p>",
      "id": 1044
    },
    {
      "title": "قوانین کنسلی رزرو هتل های تهران در سفرانه به چه صورت است؟",
      "isActive": true,
      "priority": 100,
      "entity": {
        "title": "تهران - Tehran",
        "type": "City",
        "isActive": true,
        "parentId": 59,
        "name": "تهران",
        "searchValue": "شهر تهران , IKA , THR , Tehran city",
        "displayName": "تهران ، تهران",
        "id": 164
      },
      "question": "قوانین کنسلی رزرو هتل های تهران در سفرانه به چه صورت است؟",
      "answer": "<p><b>قوانین کنسلی رزرو هتل </b>براساس قوانین هتل های تهران است. با این وجود اگر به هر دلیلی از سفر خود به تهران منصرف شدید، سفرانه بابت لغو رزرو شما یا تغییر تاریخ آن هیچگونه مبلغی به عنوان کارمزد دریافت نخواهد کرد.</p>",
      "id": 13
    },
    {
      "title": "قیمت هتل در تهران چقدر است؟",
      "isActive": true,
      "priority": 99,
      "entity": {
        "title": "تهران - Tehran",
        "type": "City",
        "isActive": true,
        "parentId": 59,
        "name": "تهران",
        "searchValue": "شهر تهران , IKA , THR , Tehran city",
        "displayName": "تهران ، تهران",
        "id": 164
      },
      "question": "قیمت هتل در تهران چقدر است؟",
      "answer": "<p>قیمت هتل های تهران بر اساس موقعیت جغرافیایی (فاصله هتل تا اماکن تاریخی، تفریحی و اداری)، امکانات و تعداد ستاره&zwnj;های هتل متفاوت است. سفرانه گارانتی&zwnj;کننده و مالک چندین هتل در تهران است و قطعاً با مراجعه به این سایت کمترین نرخ رزرو هتل های تهران پیش روی شما خواهد بود.</p>",
      "id": 14
    },
    {
      "title": "امکان رزرو هتل آپارتمان در تهران از سفرانه وجود دارد؟",
      "isActive": true,
      "priority": 97,
      "entity": {
        "title": "تهران - Tehran",
        "type": "City",
        "isActive": true,
        "parentId": 59,
        "name": "تهران",
        "searchValue": "شهر تهران , IKA , THR , Tehran city",
        "displayName": "تهران ، تهران",
        "id": 164
      },
      "question": "امکان رزرو هتل آپارتمان در تهران از سفرانه وجود دارد؟",
      "answer": "<p>بله. شما با مراجعه به صفحه هتل های تهران و با اعمال فیلتر&nbsp;هتل آپارتمان در منوی سمت راست صفحه می&zwnj;توانید کلیه هتل آپارتمان های تهران را با بهترین قیمت و بیشترین تخفیف رزرو نمایید.</p>",
      "id": 19
    },
    {
      "title": "مدارک لازم جهت رزرو هتل در تهران چیست؟",
      "isActive": true,
      "priority": 96,
      "entity": {
        "title": "تهران - Tehran",
        "type": "City",
        "isActive": true,
        "parentId": 59,
        "name": "تهران",
        "searchValue": "شهر تهران , IKA , THR , Tehran city",
        "displayName": "تهران ، تهران",
        "id": 164
      },
      "question": "مدارک لازم جهت رزرو هتل در تهران چیست؟",
      "answer": "<p>برای رزرو هتل در تهران و تحویل اتاق نیاز به مدارک شناسایی معتبر، شناسنامه و کارت ملی دارید. زوجینی هم که دارای عقد نامه موقت (صیغه&zwnj;نامه) هستند بایستی، عقدنامه آنها دارای مهر معتبر محضری باشد.</p>\r\n<p>خانم&zwnj;های مجرد در تمامی هتل&zwnj;های تهران امکان رزرو اتاق تنها با ارائه مدارک شناسایی معتبر را دارند.</p>",
      "id": 18
    },
    {
      "title": "مزایای رزرو هتل های تهران از سفرانه چیست؟",
      "isActive": true,
      "priority": 0,
      "entity": {
        "title": "تهران - Tehran",
        "type": "City",
        "isActive": true,
        "parentId": 59,
        "name": "تهران",
        "searchValue": "شهر تهران , IKA , THR , Tehran city",
        "displayName": "تهران ، تهران",
        "id": 164
      },
      "question": "مزایای رزرو هتل های تهران از سفرانه چیست؟",
      "answer": "<p><b>رزرو هتل های تهران&nbsp;</b>از سفرانه بدون هیچگونه اتلاف وقت تنها طی چند کلیک ساده انجام می&zwnj;شود. در صفحه هتل های تهران تمامی اقامتگاه&zwnj;ها بر اساس قیمت، تعداد ستاره&zwnj;ها، امکانات و بیشترین تعداد امتیاز دریافتی از مسافران دسته&zwnj;بندی شده&zwnj;اند که شما با در نظر گرفتن تمامی شرایط به راحتی می&zwnj;توانید به هتل مور نظرتان دسترسی داشته باشید.</p>",
      "id": 12
    },
    {
      "title": "هتل های لوکس تهران کدامند؟",
      "isActive": true,
      "priority": 0,
      "entity": {
        "title": "تهران - Tehran",
        "type": "City",
        "isActive": true,
        "parentId": 59,
        "name": "تهران",
        "searchValue": "شهر تهران , IKA , THR , Tehran city",
        "displayName": "تهران ، تهران",
        "id": 164
      },
      "question": "هتل های لوکس تهران کدامند؟",
      "answer": "<p>رزرو هتل های لوکس در تهران برای مسافرانی که تمایل به اقامت در یک فضای شیک به همراه امکانات خاص را دارند پیشنهاد می&zwnj;شوند. معمولا هتل&zwnj;های 5 ستاره تهران جزو هتل&zwnj;های لوکس هستند. در این هتل&zwnj;ها علاوه بر برخوداری از امکانات رفاهی مانند استخر، سونا، جکوزی، سالن های مجلل جشن و همایش، چندین رستوران و کافی شاپ با بالاترین کیفیت، از آرامش خاطر بالاتری نیز برخوردار هستید.</p>\r\n<p>پیشنهاد سفرانه برای رزرو هتل های لوکس تهران شامل هتل پارسیان آزادی تهران، هتل اسپیناس پالاس، هتل اسپیناس بلوار، هتل پارسیان استقلال تهران، هتل ویستریا و هتل نووتل است.</p>",
      "id": 16
    }
  ],
  "id": 245
} ;
  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotelDetail'])),
      pageData: pageInfo.data || null,
      hotelData: hotelInfo,
      hotelScoreData: scoreInfo,
      accommodationData: accomodationInfo,
      portalData: portalData.data || null

    },
  })
}


export default HotelDetail;
