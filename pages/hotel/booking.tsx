import { useEffect, useState } from 'react';
import Steps from '@/modules/shared/components/ui/Steps';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DomesticHotelConfirm, domesticHotelGetReserveById, getDomesticHotelDetailById } from '@/modules/domesticHotel/actions';
import { AsideHotelInfoType, AsideReserveInfoType, DomesticHotelDetailType, DomesticHotelGetReserveByIdData } from '@/modules/domesticHotel/types/hotel';
import { getDatesDiff } from '@/modules/shared/helpers';
import Aside from '@/modules/domesticHotel/components/shared/Aside';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import { PortalDataType } from '@/modules/shared/types/common';

const Booking: NextPage = ({ portalData }: { portalData?: PortalDataType }) => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');
    const { t: tPayment } = useTranslation('payment');

    const router = useRouter();

    const pathArray = router.asPath.split("?")[1]?.split("#")[0].split("&");
    const username: string | undefined = pathArray.find(item => item.includes("username="))?.split("username=")[1];
    const reserveId: string | undefined = pathArray.find(item => item.includes("reserveId="))?.split("reserveId=")[1];

    const [domesticHotelReserveData, setDomesticHotelReserveData] = useState<DomesticHotelGetReserveByIdData>();
    const [domesticHotelData, setDomesticHotelData] = useState<DomesticHotelDetailType>();

    const phoneLink = portalData?.Phrases?.find(item => item.Keyword === "PhoneNumber")?.Value || "";
    const phoneNumber = phoneLink?.replace("+98", "0");
    const email = portalData?.Phrases?.find(item => item.Keyword === "Email")?.Value || "";



    useEffect(() => {

        if (username && reserveId) {
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

            const confirm =async () => {
                const response :any = await DomesticHotelConfirm({reserveId:reserveId, username: username}, 'fa-IR');
                debugger;                
            }

            confirm();
        }

    }, [username, reserveId]);


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
                <title>{t('reserve-page')}</title>
            </Head>

            <div className='max-w-container mx-auto px-5 py-4'>

                <Steps
                    className='py-3 mb-2'
                    items={[
                        { label: t('completing-information'), status: 'done' },
                        { label: tHotel('checking-capacity'), status: 'done' },
                        { label: t('confirm-pay'), status: 'done' },
                        { label: t('complete-purchase'), status: 'done' }
                    ]}
                />

                <div className='grid gap-4 md:grid-cols-3'>
                    <div className='md:col-span-2'>
                        main
                    </div>
                    <div>

                        <Aside
                            hotelInformation={domesticHotelInformation}
                            reserveInformation={domesticHotelReserveInformation}
                        />

                        <div className='bg-white border border-neutral-300 rounded-md mb-4'>
                            {domesticHotelInformation ? (
                                <>
                                    <h5 className='font-semibold leading-6 p-3 border-b text-sm'>
                                        {tPayment('need-help')}
                                    </h5>
                                    <div className='p-3'>
                                        <p className='block mb-3'>{tPayment('24hours-backup')}</p>
                                        <a href={`tel:${phoneLink}`} className='block mb-1 text-base text-blue-800 rtl:text-right font-semibold underline-offset-2 underline' dir="ltr"> {phoneNumber} </a>
                                        <a href={`mailto:${email}`} className='block text-base text-blue-800 rtl:text-right font-sans font-semibold underline-offset-2 underline' dir="ltr"> {email} </a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Skeleton className='mb-3 w-1/3' />
                                    <Skeleton className='mb- w-2/3' />
                                </>
                            )}
                        </div>

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

                    </div>
                </div>
            </div>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    return ({
        props: {
            ...await (serverSideTranslations(context.locale, ['common', 'hotel', 'payment']))

        },
    })
}


export default Booking;
