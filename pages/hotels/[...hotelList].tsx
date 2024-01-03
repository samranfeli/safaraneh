import {useEffect} from 'react';
import { SearchHotels } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SearchHotelsItem } from '@/modules/domesticHotel/types/hotel';

type Props = {
  searchHotelsData?: {
    Hotels: SearchHotelsItem[];
    Content?:string;
  };
  url: string;
}

const HotelList:NextPage<Props> = props => {

  let hotelIds : ( undefined | number)[] = [];
  if (props.searchHotelsData){
    hotelIds = props.searchHotelsData.Hotels?.map(hotel => hotel.HotelId) || [];
  }

  useEffect(()=>{

    const fetchData =async () => {
      const ggg = await SearchHotels(props.url);
      debugger;
    }

    fetchData();

  },[hotelIds]);

  const { t } = useTranslation('common');

  return (

    <div>
      <h1 className='text-4xl flex h-60 items-center justify-center'>
          در حال توسعه ...
      </h1>
      <p className='text-center text-red-500 text-3xl font-bold'>
      {t('change-search')}
      </p>
    </div>

  )
}


export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const { locale, query } = context;

  const url = `/${locale}/hotels/${query.hotelList![0]}`;

  const searchHotelsResponse = await SearchHotels(url, locale);

  return ({
    props: {
      ...await (serverSideTranslations(context.locale, ['common', 'home'])),
      searchHotelsData: searchHotelsResponse?.data || null,
      url: url
    },
  })
}


export default HotelList;
