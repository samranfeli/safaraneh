import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router';

import { domesticHotelGetValidate, getDomesticHotelDetailById } from '@/modules/domesticHotel/actions';
import Aside from '@/modules/domesticHotel/components/shared/Aside';
import { getDatesDiff } from '@/modules/shared/helpers';
import { AsideHotelInfoType, AsideReserveInfoType, DomesticHotelDetailType, DomesticHotelGetValidateResponse } from '@/modules/domesticHotel/types/hotel';

import Head from 'next/head';

import SpecialReauests from '@/modules/domesticHotel/components/checkout/SpecialRequests';
import ReserverInformation from '@/modules/domesticHotel/components/checkout/ReserverInformation';

const Checkout: NextPage = () => {

  const { t } = useTranslation('common');

  const router = useRouter();
  const pathSegments = router.asPath.split("?")[0].split("#")[0].split("/");
  const keySegment = pathSegments.find(item => item.includes('key='));
  const key = keySegment?.split("key=")[1];

  const [reserveInfo, setReserveInfo] = useState<DomesticHotelGetValidateResponse>();
  const [hotelInfo, setHotelInfo] = useState<DomesticHotelDetailType>();

  useEffect(() => {

    const fetchData = async (key: string) => {

      const response: any = await domesticHotelGetValidate(key);

      if (response?.data?.result) {
        setReserveInfo(response.data.result);

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
    debugger;
  }

  const initialValues = {
    reserver: {
      gender: 'male',
      firstName: "",
      lastName: "",
      email: "",
      nationalId: "",
      phoneNumber: ""
    }
  }

  return (
    <>
      <Head>
        <title>{t('completing-information')}</title>
      </Head>

      <div className='max-w-container mx-auto px-5 py-4'>


        <Formik
          validate={() => { return {} }}
          initialValues={initialValues}
          onSubmit={submitHandler}
        >
          {({ errors, touched, isValid, isSubmitting, setFieldValue }) => {
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

                  <div className='bg-white border border-neutral-300 p-5 rounded-lg grid md:grid-cols-3 gap-2'>

                    <ReserverInformation 
                      errors={errors}
                      setFieldValue={setFieldValue}
                      touched={touched}
                    />

                    <SpecialReauests />
                  
                  </div>

                  <h5 className='font-semibold my-6'>
                    {t('fill-passengers-information')}
                  </h5>
                  

                </div>

                <Aside
                  className='md:col-span-5 lg:col-span-1'
                  hotelInformation={hotelInformation}
                  reserveInformation={reserveInformation}
                  hasSubmit
                  submitLoading={false}

                />
              </Form>
            )
          }}
        </Formik>

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
