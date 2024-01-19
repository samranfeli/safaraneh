import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router';
import 'react-phone-input-2/lib/style.css';

import { domesticHotelGetValidate, getDomesticHotelDetailById } from '@/modules/domesticHotel/actions';
import Aside from '@/modules/domesticHotel/components/shared/Aside';
import { getDatesDiff } from '@/modules/shared/helpers';
import { AsideHotelInfoType, AsideReserveInfoType, DomesticHotelDetailType, DomesticHotelGetValidateResponse } from '@/modules/domesticHotel/types/hotel';
import { validateNationalId, validateRequied, validateEmail, validateRequiedPersianAndEnglish } from '@/modules/shared/helpers/validation';
import FormikField from '@/modules/shared/components/ui/FormikField';
import Head from 'next/head';
import PhoneInput2 from '@/modules/shared/components/ui/PhoneInput2';
import PhoneInput from '@/modules/shared/components/ui/PhoneInput';

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
        <title>{t('completing-informaion')}</title>
      </Head>

      <div className='max-w-container mx-auto px-5 py-4'>


        <Formik
          validate={() => { return {} }}
          initialValues={initialValues}
          onSubmit={submitHandler}
        >
          {({ errors, touched, isValid, isSubmitting , setFieldValue }) => {
            if (isSubmitting && !isValid) {

              setTimeout(() => {
                const formFirstError = document.querySelector(".has-validation-error");
                if (formFirstError) {
                  formFirstError.scrollIntoView({ behavior: "smooth" });
                }
              }, 100)

            }
            return (

              <Form className='md:grid md:grid-cols-12 lg:grid-cols-3 gap-4'>

                <div className='md:col-span-7 lg:col-span-2'>


                  <div className='bg-white border border-neutral-300 p-5 rounded-lg grid md:grid-cols-3 gap-2'>
                    <h4 className='md:col-span-3 font-semibold mb-2 text-lg'>
                      {t('reserver-information')}
                    </h4>

                    <div role="group" aria-labelledby="my-radio-group">
                      <label className='block leading-4 text-xs' > جنسیت </label>
                      <label className='inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4'>
                        <Field type="radio" name="reserver.gender" value="male" className="text-xs" />
                        مرد
                      </label>
                      <label className='inline-flex items-center gap-1'>
                        <Field type="radio" name="reserver.gender" value="female" className="text-xs" />
                        زن
                      </label>
                    </div>

                    <FormikField
                      errorText={errors.reserver?.firstName as string}
                      id='firstName'
                      name='reserver.firstName'
                      isTouched={touched.reserver?.firstName}
                      label={t('first-name')}
                      validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-first-name'), t('just-english-persian-letter-and-space'))}
                    />

                    <FormikField
                      errorText={errors.reserver?.lastName as string}
                      id='lastName'
                      name='reserver.lastName'
                      isTouched={touched.reserver?.lastName}
                      label={t('last-name')}
                      validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-last-name'), t('just-english-persian-letter-and-space'))}
                    />

                    <PhoneInput2 
                      onChange = {(v:string) => {
                        setFieldValue('reserver.phoneNumber', v)
                      }}
                      validateFunction={(value: string) => validateRequied(value, t('invalid-phone-number'))}
                      errorText={errors.reserver?.phoneNumber}
                      name={'reserver.phoneNumber'}
                      isTouched={touched.reserver?.phoneNumber}
                      label={t("phone-number") + " (بدون صفر)"}
                      emptyMessage={t('please-enter-phone-number')}
                    />


                    <PhoneInput
                      onChange = {(v:string) => {
                        setFieldValue('reserver.phoneNumber', v)
                      }}
                      validateFunction={(value: string) => validateRequied(value, t('invalid-phone-number'))}
                      errorText={errors.reserver?.phoneNumber}
                      name={'reserver.phoneNumber33'}
                      isTouched={touched.reserver?.phoneNumber}
                      label={t("phone-number") + " (بدون صفر)"}
                      emptyMessage={t('please-enter-phone-number')}
                    />

                    <FormikField
                      errorText={errors.reserver?.nationalId as string}
                      id='nationalId'
                      name='reserver.nationalId'
                      isTouched={touched.reserver?.nationalId}
                      label={t('national-code')}
                      validateFunction={(value: string) => validateNationalId({ value: value, invalidMessage: t('invalid-national-code'), reqiredMessage: t('please-enter-national-code') })}
                    />

                    <FormikField
                      errorText={errors.reserver?.email as string}
                      id='email'
                      name='reserver.email'
                      isTouched={touched.reserver?.email}
                      label={t('email')}
                      validateFunction={(value: string) => validateEmail({ value: value, reqiredMessage: t('enter-email-address'), invalidMessage: t('invalid-email') })}
                    />


                  </div>

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
