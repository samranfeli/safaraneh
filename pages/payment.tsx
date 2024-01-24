import Steps from '@/modules/shared/components/ui/Steps';
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { getReserveFromCoordinator } from '@/modules/shared/actions';
import { useRouter } from 'next/router';
import DomesticHotelAside from '@/modules/domesticHotel/components/shared/Aside';
import { domesticHotelGetReserveById, getDomesticHotelDetailById } from '@/modules/domesticHotel/actions';
import { AsideHotelInfoType, AsideReserveInfoType, DomesticHotelDetailType, DomesticHotelGetReserveByIdData } from '@/modules/domesticHotel/types/hotel';
import { getDatesDiff } from '@/modules/shared/helpers';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import { TabItem } from '@/modules/shared/types/common';
import Tab from '@/modules/shared/components/ui/Tab';
import OnlinePayment from '@/modules/payment/components/OnlinePayment';
import CardToCard from '@/modules/payment/components/CardToCard';
import CreditPayment from '@/modules/payment/components/CreditPayment';


const Payment: NextPage = () => {

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const router = useRouter();

  const pathArray = router.asPath.split("?")[1]?.split("#")[0].split("&");
  const username = pathArray.find(item => item.includes("username="))?.split("username=")[1];
  const reserveId = pathArray.find(item => item.includes("reserveId="))?.split("reserveId=")[1];

  const [type, setType] = useState<"Undefined" | "HotelDomestic" | "FlightDomestic" | "Bus" | "Package" | "Flight" | "Hotel" | "PnrOutside" | "Cip" | "Activity">();
  const [coordinatorPrice, setCoordinatorPrice] = useState<number>();
  const [domesticHotelReserveData, setDomesticHotelReserveData] = useState<DomesticHotelGetReserveByIdData>();
  const [domesticHotelData, setDomesticHotelData] = useState<DomesticHotelDetailType>();

  useEffect(() => {

    const fetchType = async () => {

      if (username && reserveId) {
        const response: any = await getReserveFromCoordinator({ reserveId: reserveId, username: username });
        if (response.data.result) {
          setType(response.data.result.type);
          setCoordinatorPrice(response.data.result.salePrice);
        }
      }
    }

    fetchType();

  }, [username, reserveId]);


  useEffect(() => {

    if (username && reserveId && type === 'HotelDomestic') {
      const fetchDomesticHotelReserve = async () => {
        const response: any = await domesticHotelGetReserveById({ reserveId: reserveId, userName: username });
        if (response.data.result) {
          setDomesticHotelReserveData(response.data.result)

          const hotelDataResponse = await getDomesticHotelDetailById(response.data.result.accommodationId || response.data.result.accommodation?.id);
          if (hotelDataResponse?.data) {
            setDomesticHotelData(hotelDataResponse.data);
          }
        }
      }

      fetchDomesticHotelReserve();
    }

  }, [type, username, reserveId]);


  const tabItems: TabItem[] = [
    {
      key: '1',
      label: ("آنلاین"),
      children: (<OnlinePayment />),
    },
    {
      key: '2',
      label: ("کارت به کارت"),
      children: (<CardToCard />),
    },
    {
      key: '3',
      label: ("اعتباری"),
      children: (<CreditPayment />),
    }
  ];



  let domesticHotelInformation: AsideHotelInfoType | undefined = undefined;
  let domesticHotelReserveInformation: AsideReserveInfoType | undefined = undefined;

  if (domesticHotelData) {
    domesticHotelInformation = {
      image: {
        url: domesticHotelData.ImageUrl,
        alt: domesticHotelData.ImageAlt,
        title: domesticHotelData.ImageTitle
      },
      name: `${domesticHotelData.HotelCategoryName} ${domesticHotelData.HotelName} ${domesticHotelData.CityName}`,
      rating: domesticHotelData.HotelRating,
      address: domesticHotelData.Address,
      TopSelling: domesticHotelData.TopSelling,
      Url: domesticHotelData.Url,
      CityId: domesticHotelData.CityId
    }
  }
  if (domesticHotelReserveData) {
    domesticHotelReserveInformation = {
      reserveId: domesticHotelReserveData.id,
      checkin: domesticHotelReserveData.checkin,
      checkout: domesticHotelReserveData.checkout,
      duration: getDatesDiff(new Date(domesticHotelReserveData.checkout), new Date(domesticHotelReserveData.checkin)),
      rooms: domesticHotelReserveData.rooms.map(roomItem => ({
        name: roomItem.name,
        board: roomItem.boardCode,
        cancellationPolicyStatus: roomItem.cancellationPolicyStatus,
        bed: roomItem.bed,
        pricing: roomItem.pricing,

      })),
      salePrice: domesticHotelReserveData.rooms.reduce((totalPrice: number, roomItem: any) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "Room" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          return totalPrice;
        }
      }, 0),
      selectedExtraBedCount: domesticHotelReserveData.rooms.reduce((totalSelectedExtraBeds: number, roomItem: any) => {
        const thisRoomHasExtraBed = roomItem.pricing.find((item: any) => item.type === "ExtraBed" && item.ageCategoryType === "ADL" && item.isSelected);
        if (thisRoomHasExtraBed) {
          return totalSelectedExtraBeds + 1
        } else {
          return totalSelectedExtraBeds;
        }
      }, 0),
      selectedExtraBedPrice: domesticHotelReserveData.rooms.reduce((totalPrice: number, roomItem: any) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "ExtraBed" && item.ageCategoryType === "ADL" && item.isSelected
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          return totalPrice;
        }
      }, 0),
      boardPrice: domesticHotelReserveData.rooms.reduce((totalPrice: number, roomItem: any) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "RoomBoard" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          return totalPrice;
        }
      }, 0),
      promoCodePrice: domesticHotelReserveData.rooms.reduce((totalPrice: number, roomItem: any) => {
        const itemPrice = roomItem.pricing.find(
          (item: any) => item.type === "PromoCode" && item.ageCategoryType === "ADL"
        )?.amount;
        if (itemPrice) {
          return totalPrice - +itemPrice
        } else {
          return totalPrice;
        }
      }, 0)
    }
  }

  return (
    <>

      <Head>
        <title>{t("bank-gateway")}</title>
      </Head>

      <div className='max-w-container mx-auto px-5 py-4'>

        <Steps
          className='py-3 mb-2'
          items={[
            { label: t('bank-gateway-page'), status: 'done' },
            { label: t('confirm-pay'), status: 'active' },
            { label: t('complete-purchase'), status: 'up-comming' }
          ]}
        />

        <div className='grid gap-4 md:grid-cols-3'>
          <div className='md:col-span-2 bg-white rounded-lg border border-neutral-300 mb-4 p-4'>

            <h2 className='text-2xl mt-4 mb-8'> چگونه می خواهید پرداخت کنید؟ </h2>
            
            <Tab
              style2
              items={tabItems}
            />

          </div>

          <div>

            {domesticHotelInformation && domesticHotelReserveInformation && <DomesticHotelAside hotelInformation={domesticHotelInformation} reserveInformation={domesticHotelReserveInformation} />}

            <div className='bg-white p-4 border border-neutral-300 rounded-md mb-4 border-t-2 border-t-orange-400'>
              {domesticHotelInformation ? (
                <>
                  <h5 className='font-semibold text-orange-400 mb-2 leading-6'>
                    {t('price-will-increase')}
                  </h5>
                  <p className='text-2xs'>
                    {t('price-will-increase-desc')}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton className='mb-3 w-1/3' />
                  <Skeleton className='mb- w-2/3' />
                </>
              )}

            </div>

            <div className='bg-white p-4 border border-neutral-300 rounded-md mb-4 border-t-2 border-t-blue-500'>
              {domesticHotelInformation ? (
                <>
                  <h5 className='font-semibold text-blue-500 mb-2 leading-6'>
                    {tHotel('recent-reserve-number')}
                  </h5>
                  <p className='text-2xs'>
                    {tHotel('theNumberOfRecentReservationsOfThisHotelIs', { number: domesticHotelInformation?.TopSelling })}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton className='mb-3 w-1/3' />
                  <Skeleton className='mb- w-2/3' />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async (context: any) => {
  return ({
    props: {
      ...await serverSideTranslations(context.locale, ['common', 'hotel']),
      context: context
    }
  })
};

export default Payment;
