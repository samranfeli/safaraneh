import { useEffect, useState } from 'react';
import { AvailabilityByHotelId, GetCityFaqById, SearchHotels, getRates } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PricedHotelItem, SearchHotelItem } from '@/modules/domesticHotel/types/hotel';
import SearchForm from '@/modules/domesticHotel/components/shared/SearchForm';
import HotelsList from '@/modules/domesticHotel/components/hotelsList';
import { addSomeDays, dateFormat } from '@/modules/shared/helpers';
import ProgressBarWithLabel from '@/modules/shared/components/ui/ProgressBarWithLabel';
import { useTranslation } from 'next-i18next';
import Select from '@/modules/shared/components/ui/Select';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import parse from 'html-react-parser';
import Accordion from '@/modules/shared/components/ui/Accordion';
import { QuestionCircle } from '@/modules/shared/components/ui/icons';
import DomesticHotelListSideBar from '@/modules/domesticHotel/components/hotelsList/sidebar';
import { setFacilityFilterOptions, setGuestPointFilterOptions, setTypeFilterOptions, setPriceFilterRange } from '@/modules/domesticHotel/store/domesticHotelSlice';
import { useAppDispatch } from '@/modules/shared/hooks/use-store';

type Props = {
  searchHotelsData?: {
    Hotels: SearchHotelItem[];
    Content?: string;
  };
  faq?: {
    items: {
      title: string;
      isActive: boolean;
      priority: number;
      question: string;
      answer: string;
      id: number;
    }[];
    totalCount: number;
  }
}

type SortTypes = "priority" | "price" | "starRate" | "name" | "gueatRate";

const HotelList: NextPage<Props> = props => {

  type RatesResponseItem = {
    HotelId: number;
    Satisfaction: number;
    PositiveRowCount: number;
    TotalRowCount: number;
  }

  type PricesResponseItem = {
    id: number;
    salePrice: number;
    boardPrice: number;
  }

  const dispatch = useAppDispatch();

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const [fetchPercentage, setFetchPercentage] = useState<number>(0);

  const [ratesData, setRatesData] = useState<RatesResponseItem[] | undefined>();
  const [ratesLoading, setRatesLoading] = useState<boolean>(false);

  const [pricesData, setPricesData] = useState<PricesResponseItem[] | undefined>();
  const [pricesLoading, setPricesLoading] = useState<boolean>(false);

  const [sortFactor, setSortFactor] = useState<SortTypes>("priority");

  let hotelIds: (undefined | number)[] = [];
  if (props.searchHotelsData) {
    hotelIds = props.searchHotelsData.Hotels?.map(hotel => hotel.HotelId) || [];
  }

  const today = dateFormat(new Date());
  const tomorrow = dateFormat(addSomeDays(new Date()));
  let checkin = today;
  let checkout = tomorrow;

  const savePriceRange = (pricedItems:PricesResponseItem[]) => {
    
    let min = 0;
    let max = 0;
    
    for(let i =0 ; i < pricedItems.length ; i++){
      const itemPrice = pricedItems[i].salePrice;
      if (!min || min > itemPrice){
        min = itemPrice;
      }
      if(!max || max < itemPrice){
        max = itemPrice;
      }
    }

    dispatch(setPriceFilterRange({min:min, max:max}));
  }

  const saveGuestPointFilterOptions = (rates: RatesResponseItem[]) => {

    const filterOptions = {
      excellent: { label: tHotel('excellent'), count: 0, value: [90, 100] },
      veryGood: { label: tHotel('very-good'), count: 0, value: [80, 89] },
      good: { label: tHotel('good'), count: 0, value: [70, 79] },
      fair: { label: tHotel('fair'), count: 0, value: [50, 69] },
      bad: { label: tHotel('bad'), count: 0, value: [0, 49] },
    }

    for (let i = 0; i < rates.length; i++) {
      const itemSatisfaction = rates[i].Satisfaction;

      if (itemSatisfaction >= 90) {
        filterOptions.excellent.count = filterOptions.excellent.count + 1;
      } else if (itemSatisfaction >= 80) {
        filterOptions.veryGood.count = filterOptions.veryGood.count + 1;
      } else if (itemSatisfaction >= 70) {
        filterOptions.good.count = filterOptions.good.count + 1;
      } else if (itemSatisfaction >= 50) {
        filterOptions.fair.count = filterOptions.fair.count + 1;
      } else {
        filterOptions.bad.count = filterOptions.bad.count + 1;
      }
    }

    const optionsArray = Object.values(filterOptions)

    dispatch(setGuestPointFilterOptions(optionsArray));

  }


  const saveFacilityOptions = (hotelItems:SearchHotelItem[]) => {
    
    const options:{keyword:string, label: string, count:number}[] = [];

    for (let i = 0; i < hotelItems.length ; i++ ){
      const hotelItemFacilities =   hotelItems[i].Facilities;
      
      if (!hotelItemFacilities?.length) continue;

      for (let j=0 ; j< hotelItemFacilities.length ; j++){
        const facilityItem = hotelItemFacilities[j];

        const updatingOptionItem = options.find(item => item.keyword === facilityItem.Keyword );

        if(!facilityItem.Keyword) continue;

        if (updatingOptionItem){
          updatingOptionItem.count = updatingOptionItem.count+1;
        }else{
          options.push({ keyword : facilityItem.Keyword, label : facilityItem.Title || "" , count:1})
        }

      }
    }

    dispatch(setFacilityFilterOptions(options));

  }

  const saveHotelType = (hotelItems:SearchHotelItem[]) => {
    
    const options:{id:number, label: string, count:number}[] = [];

    for (let i = 0; i < hotelItems.length ; i++ ){
      
      const hotelItem =   hotelItems[i];

      if (!hotelItem.HotelTypeId){
        continue;
      }

      const updatingOptionItem = options.find(item => item.id === hotelItem.HotelTypeId );

      if (updatingOptionItem){
        updatingOptionItem.count = updatingOptionItem.count+1
      }else{
        options.push({ id : hotelItem.HotelTypeId, label : hotelItem.HotelTypeName || "" , count:1})
      }
    }

    dispatch(setTypeFilterOptions(options));

  }

  useEffect(()=>{
    if(props.searchHotelsData?.Hotels){

      saveHotelType(props.searchHotelsData.Hotels);

      saveFacilityOptions(props.searchHotelsData.Hotels);

    }
  },[props.searchHotelsData?.Hotels]);



  useEffect(() => {

    const fetchRates = async () => {

      setFetchPercentage(10);

      setRatesLoading(true);

      const ratesResponse: { data?: RatesResponseItem[] } = await getRates(hotelIds as number[], "fa-IR");

      if (ratesResponse?.data) {

        setRatesData(ratesResponse.data);

        saveGuestPointFilterOptions(ratesResponse.data);

      }

      setRatesLoading(false);
    }

    fetchRates();

    const fetchPrices = async () => {
      setPricesLoading(true);
      const pricesResponse = await AvailabilityByHotelId({ checkin: checkin, checkout: checkout, ids: hotelIds as number[] }, 'fa-IR');
      if (pricesResponse.data?.result?.hotels) {
        setPricesData(pricesResponse.data.result.hotels);

        savePriceRange(pricesResponse.data.result.hotels);

      }
      setPricesLoading(false);
    }

    fetchPrices();

  }, []);


  const hotels: PricedHotelItem[] = props.searchHotelsData?.Hotels?.map(hotel => {

    const HotelRateData = ratesData?.find(item => item.HotelId === hotel.HotelId);
    const ratesInfo = HotelRateData ? { Satisfaction: HotelRateData.Satisfaction, TotalRowCount: HotelRateData.TotalRowCount } : (ratesLoading || !ratesData) ? "loading" : undefined;


    const hotelPriceData = pricesData?.find(item => item.id === hotel.HotelId);

    let priceInfo: "loading" | "notPriced" | "need-to-inquire" | { boardPrice: number, salePrice: number };

    if (!pricesData || pricesLoading) {
      priceInfo = "loading";
    } else if (!hotelPriceData) {
      priceInfo = "notPriced";
    } else if (hotelPriceData.salePrice < 10000) {
      priceInfo = "need-to-inquire";
    } else {
      priceInfo = { boardPrice: hotelPriceData.boardPrice, salePrice: hotelPriceData.salePrice }
    }

    return ({
      ...hotel,
      ratesInfo: ratesInfo,
      priceInfo: priceInfo
    })
  }) || [];

  useEffect(() => {

    if (ratesData && pricesData) {

      setFetchPercentage(99.99);

      setTimeout(() => { setFetchPercentage(100) }, 1000);

    } else if (ratesData || pricesData) {

      setTimeout(() => { setFetchPercentage(60) }, 1000);

    }

  }, [ratesData, pricesData]);

  let progressBarLabel = "";

  if (!pricesData) {
    progressBarLabel = tHotel('getting-the-best-prices-and-availability');
  }

  if (!ratesData) {
    progressBarLabel = tHotel('getting-guest-ratings');
  }

  if (ratesData && pricesData) {
    progressBarLabel = tHotel('looking-for-cheaper-rates');
  }

  if (hotels.length > 1) {
    hotels.sort((b: PricedHotelItem, a: PricedHotelItem) => {

      switch (sortFactor) {

        case "priority":

          if (!a.Priority || !b.Priority) return 1;
          return (b.Priority - a.Priority);

        case "name":

          if (!a.HotelName || !b.HotelName) return 1;

          const farsiAlphabet = ["آ", "ا", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

          const x = a.HotelName.toLowerCase().trim();
          const y = b.HotelName.toLowerCase().trim();

          for (let i = 0; i < y.length; i++) {
            if (farsiAlphabet.indexOf(y[i]) < farsiAlphabet.indexOf(x[i])) {
              return -1;
            }
            if (farsiAlphabet.indexOf(y[i]) > farsiAlphabet.indexOf(x[i])) {
              return 1;
            }
          }

        case "starRate":

          if (!a.HotelRating || !b.HotelRating) return 1;
          return (a.HotelRating - b.HotelRating);

        case "price":

          if (b.priceInfo !== 'loading' && b.priceInfo !== 'need-to-inquire' && b.priceInfo !== 'notPriced' && a.priceInfo !== 'loading' && a.priceInfo !== 'need-to-inquire' && a.priceInfo !== 'notPriced') {
            return b.priceInfo.salePrice - a.priceInfo.salePrice
          } else if (b.priceInfo !== 'loading' && b.priceInfo !== 'need-to-inquire' && b.priceInfo !== 'notPriced') {
            return -1
          }
          return 1

        case "gueatRate":

          if (a.ratesInfo === "loading" || b.ratesInfo === 'loading') return 1;
          if (a.ratesInfo && b.ratesInfo) {
            return a.ratesInfo.Satisfaction - b.ratesInfo.Satisfaction
          } else if (b.ratesInfo?.Satisfaction) {
            return -1
          }
          return 1;

        default:
          return 1
      }
    });
  }

  const cityName = hotels && hotels[0]?.CityName || "";

  return (

    <>
      <div className='max-w-container mx-auto px-5 py-4'>
        <SearchForm wrapperClassName='pb-4' />

        {(fetchPercentage === 100) || <ProgressBarWithLabel
          className='mb-4'
          label={progressBarLabel}
          percentage={fetchPercentage}
        />}

        <div className='grid lg:grid-cols-4 gap-4'>

          <div className='col-span-1'>

            <div className='bg-red-200 p-5 mb-5'>Map</div>

            <div className='bg-white'>

              <DomesticHotelListSideBar />

            </div>

          </div>

          <div className='lg:col-span-3'>

            <div className='flex justify-between mb-4 items-center'>

              {hotels.length > 0 && pricesData && cityName ? (
                <div className='text-sm max-sm:hidden'>
                  <b> {hotels.length} </b> هتل در <b> {cityName} </b> پیدا کردیم
                </div>
              ) : (
                <Skeleton className='w-52 max-sm:hidden' />
              )}

              <Select
                items={[
                  { value: "priority", label: tHotel("priority") },
                  { value: "price", label: tHotel("lowest-price") },
                  { value: "starRate", label: tHotel("highest-star-rating") },
                  { value: "name", label: tHotel("hotel-name") },
                  { value: "gueatRate", label: tHotel("highest-guest-rating") }
                ]}
                value={sortFactor}
                onChange={type => { setSortFactor(type as SortTypes) }}
                label={t('sortBy')}
                wrapperClassName='max-sm:grow sm:w-52'

              />
            </div>

            {!!props.searchHotelsData?.Hotels && <HotelsList
              hotels={hotels}
            />}

            {!!props.searchHotelsData?.Content && (
              <div className='text-sm text-justify mt-6 inserted-content'>
                {parse(props.searchHotelsData.Content)}
              </div>
            )}

            {props.faq && props.faq?.items?.length > 0 && (
              <div className='bg-white p-5 rounded-lg mt-10'>
                <h5 className='font-semibold text-lg'>{t('faq')}</h5>
                {props.faq.items.map(faq => (
                  <Accordion
                    key={faq.id}
                    title={(<>
                      <QuestionCircle className='w-5 h-5 mt-.5 rtl:ml-2 ltr:mr-2 fill-current inline-block' />
                      {faq.question}
                    </>)}
                    content={parse(faq.answer)}
                    WrapperClassName='mt-5'
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </>

  )
}


export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const url = `/${locale}/hotels/${query.hotelList![0]}`;

  const searchHotelsResponse: {
    data?: {
      Hotels: SearchHotelItem[];
      Content?: string;
    };
  } = await SearchHotels(url, locale);

  let faqResponse: any;
  if (searchHotelsResponse?.data?.Hotels[0].CityId) {
    faqResponse = await GetCityFaqById(searchHotelsResponse?.data?.Hotels[0].CityId);

  }

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
      searchHotelsData: searchHotelsResponse?.data || null,
      faq: faqResponse?.data?.result || null
    },
  })
}

export default HotelList;