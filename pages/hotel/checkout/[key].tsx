import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router';
import Head from 'next/head';

import { domesticHotelGetValidate, domesticHotelPreReserve, getDomesticHotelDetailById } from '@/modules/domesticHotel/actions';
import Aside from '@/modules/domesticHotel/components/shared/Aside';
import { getDatesDiff } from '@/modules/shared/helpers';
import { AsideHotelInfoType, AsideReserveInfoType, DomesticHotelDetailType, DomesticHotelGetValidateResponse } from '@/modules/domesticHotel/types/hotel';
import SpecialReauests from '@/modules/domesticHotel/components/checkout/SpecialRequests';
import ReserverInformation from '@/modules/domesticHotel/components/checkout/ReserverInformation';
import RoomItemInformation from '@/modules/domesticHotel/components/checkout/RoomItemInformation';
import DiscountForm from '@/modules/domesticHotel/components/checkout/DiscountForm';
import { registerDiscountCode, validateDiscountCode } from '@/modules/payment/actions';
import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { setReduxError } from '@/modules/shared/store/errorSlice';
import { dateFormat } from '@/modules/shared/helpers';
import Steps from '@/modules/shared/components/ui/Steps';
import Link from 'next/link';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import { LeftCaret } from '@/modules/shared/components/ui/icons';

const Checkout: NextPage = () => {

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathSegments = router.asPath.split("?")[0].split("#")[0].split("/");
  const keySegment = pathSegments.find(item => item.includes('key='));
  const key = keySegment?.split("key=")[1];

  const [reserveInfo, setReserveInfo] = useState<DomesticHotelGetValidateResponse>();
  const [hotelInfo, setHotelInfo] = useState<DomesticHotelDetailType>();
  const [reserverIsPassenger, setReserverIsPassenger] = useState<boolean>(true);

  const [roomsExtraBed, setRoomsExtraBed] = useState<number[]>([]);

  const [discountData, setDiscountData] = useState<any>();
  const [discountLoading, setDiscountLoading] = useState<boolean>(false);


  let backUrl: string = "";
  const checkinDate = reserveInfo?.checkin && new Date(reserveInfo.checkin);
  const checkoutDate = reserveInfo?.checkout && new Date(reserveInfo.checkout);

  if (hotelInfo && checkinDate && checkoutDate) {

    const checkin = dateFormat(checkinDate);
    const checkout = dateFormat(checkoutDate);

    backUrl = `${hotelInfo.Url}/location-${hotelInfo.CityId}/checkin-${checkin}/checkout-${checkout}`;
  }


  useEffect(() => {

    const fetchData = async (key: string) => {

      const response: any = await domesticHotelGetValidate(key);

      if (response?.data?.result) {
        setReserveInfo(response.data.result);

        setRoomsExtraBed(response.data.result.rooms.map((item: any) => (0)));

        const hotelId = response.data.result.accommodationId;

        if (!hotelId) return;
        const hotelResponse: any = await getDomesticHotelDetailById(hotelId);
        if (hotelResponse.data) {
          setHotelInfo(hotelResponse.data);
        }
      }

    }

    if (key) {
      fetchData(key);
    }

  }, [key]);


  let hotelInformation: AsideHotelInfoType;
  let reserveInformation: AsideReserveInfoType;

  if (hotelInfo) {
    hotelInformation = {
      image: {
        url: hotelInfo.ImageUrl,
        alt: hotelInfo.ImageAlt,
        title: hotelInfo.ImageTitle
      },
      name: `${hotelInfo.HotelCategoryName} ${hotelInfo.HotelName} ${hotelInfo.CityName}`,
      rating: hotelInfo.HotelRating,
      address: hotelInfo.Address,
      TopSelling: hotelInfo.TopSelling,
      Url: hotelInfo.Url,
      CityId: hotelInfo.CityId
    }
  }

  let needToInquire = false;

  if (reserveInfo) {
    reserveInformation = {
      checkin: reserveInfo.checkin,
      checkout: reserveInfo.checkout,

      duration: getDatesDiff(new Date(reserveInfo.checkout), new Date(reserveInfo.checkin)),

      rooms: reserveInfo.rooms.map((roomItem: DomesticHotelGetValidateResponse['rooms'][0]) => ({
        name: roomItem.name,
        board: roomItem.boardCode,
        cancellationPolicyStatus: roomItem.cancellationPolicyStatus,
        bed: roomItem.bed,
        extraBed: roomItem.extraBed,
        pricing: roomItem.pricing,
        maxChildAge: roomItem.maxChildAge,
        maxInfantAge: roomItem.maxInfantAge
      })),

      salePrice: reserveInfo.rooms.reduce((totalPrice: number, roomItem: DomesticHotelGetValidateResponse['rooms'][0]) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "Room" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          needToInquire = true;
          return totalPrice;
        }
      }, 0 as number),
      boardPrice: reserveInfo.rooms.reduce((totalPrice: number, roomItem: DomesticHotelGetValidateResponse['rooms'][0]) => {
        const roomItemPrice = roomItem.pricing.find(
          (item: any) => item.type === "RoomBoard" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          needToInquire = true;
          return totalPrice;
        }
      }, 0 as number)

    }
  }


  const submitHandler = async (params: any) => {


    const reserveResponse: any = await domesticHotelPreReserve(params);

    if (reserveResponse.data && reserveResponse.data.result) {
      const id = reserveResponse.data.result.id;
      const username = reserveResponse.data.result.username;

      if (discountData?.promoCodeId) {
        await registerDiscountCode({ discountPromoCode: discountData.promoCodeId, reserveId: id, username: username });
      }

      if (reserveResponse.data.result.rooms.every((x: any) => x.availablityType === "Online")) {
        router.push(`/payment?username=${username}&reserveId=${id}`);
      } else {
        router.push(`/hotel/capacity?reserveId=${id}&username=${username}`);
      }

    } else {

      dispatch(setReduxError({
        title: tHotel('error-in-reserve-room'),
        message: tHotel('sorry-room-is-full'),
        isVisible: true,
        closeErrorLink: backUrl || "/",
        closeButtonText: backUrl ? tHotel('choose-room') : t("home")
      }));

    }
  }

  const disableSyncedPassenger = () => {
    setReserverIsPassenger(false);
  }

  const initialValues = {
    reserver: {
      gender: true,
      firstName: "",
      lastName: "",
      email: "",
      nationalId: "",
      phoneNumber: ""
    },
    passengers: reserveInfo?.rooms.map((_, index) => ({
      gender: true,
      firstName: '',
      lastName: '',
      roomNumber: index + 1,
      extraBed: 0
    })) || [],
    specialRequest: "",
    preReserveKey: key
  }

  const discountSubmitHandler = async (value: string) => {

    setDiscountLoading(true);
    setDiscountData(undefined);

    const response = await validateDiscountCode({ prereserveKey: key!, type: 'HotelDomestic', discountPromoCode: value });

    setDiscountLoading(false);

    if (response?.data?.result) {
      setDiscountData(response.data.result)
    } else if (response?.data?.error) {
      setDiscountData(response.data?.error);
    }

  }

  return (
    <>
      <Head>
        <title>{t('completing-information')}</title>
      </Head>

      <div className='max-w-container mx-auto px-5 py-4'>

        <Steps
          className='py-3 mb-2'
          items={[
            { label: t('completing-informaion'), status: 'active' },
            { label: tHotel('checking-capacity'), status: 'up-comming' },
            { label: t('confirm-pay'), status: 'up-comming' },
            { label: t('completing-pay'), status: 'up-comming' }
          ]}
        />

        {backUrl ? (
          <Link href={backUrl} className='text-sm text-blue-500 mb-4 inline-block'> <LeftCaret className='inline-block align-middle w-5 h-5 fill-current rtl:rotate-180' /> برگشت به انتخاب اتاق </Link>
        ) : (
          <Skeleton className='mt-2 mb-3 w-60' />
        )}

        {!!reserveInfo && (
          <Formik
            validate={() => { return {} }}
            initialValues={initialValues}
            onSubmit={submitHandler}
          >
            {({ errors, touched, isValid, isSubmitting, setFieldValue, values }) => {
              if (isSubmitting && !isValid) {
                setTimeout(() => {
                  const formFirstError = document.querySelector(".has-validation-error");
                  if (formFirstError) {
                    formFirstError.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100)
              }
              return (

                <Form className='md:grid md:grid-cols-12 lg:grid-cols-3 gap-4' autoComplete='off' >

                  <div className='md:col-span-7 lg:col-span-2'>

                    <div className='bg-white border border-neutral-300 p-5 rounded-lg'>

                      <ReserverInformation
                        errors={errors}
                        setFieldValue={setFieldValue}
                        touched={touched}
                        values={values}
                        reserverIsPassenger={reserverIsPassenger}
                      />

                      <SpecialReauests />

                    </div>

                    <h5 className='font-semibold my-6'>
                      {t('fill-passengers-information')}
                    </h5>

                    {reserveInfo.rooms?.map((roomItem, roomIndex) => (
                      <RoomItemInformation
                        values={values}
                        errors={errors}
                        touched={touched}
                        roomIndex={roomIndex}
                        roomItem={roomItem}
                        setFieldValue={setFieldValue}
                        key={roomIndex}
                        disableSyncedPassenger={roomIndex === 0 ? disableSyncedPassenger : undefined}
                        onChangeExtraBed={extraBedValue => {
                          setRoomsExtraBed(prevState => {
                            const updatedValue = [...prevState];
                            updatedValue[roomIndex] = extraBedValue
                            return (updatedValue)
                          })
                        }}
                      />
                    ))}

                    <DiscountForm
                      data={discountData}
                      loading={discountLoading}
                      onSubmit={discountSubmitHandler}
                    />

                  </div>

                  <div className='md:col-span-5 lg:col-span-1'>
                    {(hotelInfo && reserveInfo) ? (
                      <Aside
                        hotelInformation={hotelInformation}
                        reserveInformation={reserveInformation}
                        hasSubmit
                        submitLoading={false}
                        roomExtraBed={roomsExtraBed}
                        discountLoading={discountLoading}
                        discountResponse={discountData?.isValid ? discountData : undefined}
                      />
                    ) : (
                      <div className='border border-neutral-300 bg-white rounded-md mb-4'>
                        <Skeleton className='mx-4 my-3.5 w-28' />
                        <div className='border-t border-neutral-300 p-4'>
                          <div className='grid gap-3 grid-cols-4'>
                            <Skeleton type='image' />
                            <div className='col-span-3'>
                              <Skeleton className='mb-3 w-2/3' />
                              <Skeleton className='mb-3 w-1/3' />
                              <Skeleton className='w-full' />
                            </div>
                          </div>

                          <div className='border-t border-neutral-300 my-5' />

                          <Skeleton className='mb-3 w-full' />
                          <Skeleton className='mb-3 w-2/3' />
                          <Skeleton className='mb-3 w-1/3' />
                          <Skeleton className='mb-3 w-2/3' />

                          <div className='border-t border-neutral-300 my-5' />

                          <Skeleton className='mb-3 w-full' />
                          <Skeleton className='mb-3 w-full' />
                          <Skeleton className='mb-3 w-full' />

                          <Skeleton className='mb-3 w-full mt-6' type='button' />

                        </div>
                      </div>
                    )}

                    <div className='bg-white p-4 border border-neutral-300 rounded-md mb-4 border-t-2 border-t-orange-400'>
                      {hotelInfo ? (
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
                      {hotelInfo ? (
                        <>
                          <h5 className='font-semibold text-blue-500 mb-2 leading-6'>
                            {tHotel('recent-reserve-number')}
                          </h5>
                          <p className='text-2xs'>
                            {tHotel('theNumberOfRecentReservationsOfThisHotelIs', { number: hotelInfo?.TopSelling })}
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
                </Form>
              )
            }}
          </Formik>
        )}

      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale as string, ['common', 'hotel']),
  },
})

export default Checkout;
