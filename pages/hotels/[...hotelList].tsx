import { useEffect, useState } from 'react';
import { AvailabilityByHotelId, SearchHotels, getRates } from '@/modules/domesticHotel/actions';
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

type Props = {
  searchHotelsData?: {
    Hotels: SearchHotelItem[];
    Content?: string;
  };
  url: string;
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

  useEffect(() => {

    const fetchRates = async () => {

      setFetchPercentage(10);

      setRatesLoading(true);

      const ratesResponse = await getRates(hotelIds as number[], "fa-IR");
      if (ratesResponse?.data) {
        setRatesData(ratesResponse.data);
      }
      setRatesLoading(false);
    }

    fetchRates();

    const fetchPrices = async () => {
      setPricesLoading(true);
      const pricesResponse = await AvailabilityByHotelId({ checkin: checkin, checkout: checkout, ids: hotelIds as number[] }, 'fa-IR');
      if (pricesResponse.data?.result?.hotels) {
        setPricesData(pricesResponse.data.result.hotels)
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
          <div className='col-span-1 bg-red-200'>
            filter
          </div>
          <div className='lg:col-span-3'>

            <div className='flex justify-between'>
              
              {hotels.length > 0 && pricesData && cityName ? (
                <div className='text-sm'>
                  <b> {hotels.length} </b> هتل در <b> {cityName} </b> پیدا کردیم
                </div>
              ):(
                <Skeleton className='w-52' />
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
                className='w-52'
              />
            </div>

            {!!props.searchHotelsData?.Hotels && <HotelsList
              hotels={hotels}
            />}
          </div>
        </div>

      </div>

    </>

  )
}


export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const url = `/${locale}/hotels/${query.hotelList![0]}`;

  const searchHotelsResponse = await SearchHotels(url, locale);

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'hotel'])),
      searchHotelsData: searchHotelsResponse?.data || null,
      url: url
    },
  })
}

export default HotelList;