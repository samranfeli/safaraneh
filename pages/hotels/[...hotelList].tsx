import {useEffect} from 'react';
import { SearchHotels } from '@/modules/domesticHotel/actions';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SearchHotelsItem } from '@/modules/domesticHotel/types/hotel';
import SearchForm from '@/modules/domesticHotel/components/shared/SearchForm';

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
    }

    fetchData();

  },[hotelIds]);

  const { t } = useTranslation('common');

  return (

    <>
    <div className='max-w-container mx-auto px-5 py-5'>
      <SearchForm wrapperClassName='pb-5' />
      
      <div className='grid lg:grid-cols-4 gap-5'>
        <div className='col-span-1 bg-red-200'>
            filter
        </div>
        <div className='lg:col-span-3 bg-blue-200'>
          list
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
      ...await (serverSideTranslations(context.locale, ['common', 'home'])),
      searchHotelsData: searchHotelsResponse?.data || null,
      url: url
    },
  })
}


export default HotelList;
