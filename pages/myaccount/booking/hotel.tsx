import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { DomesticHotelConfirm, domesticHotelGetReserveById, getDomesticHotelDetailById } from '@/modules/domesticHotel/actions';
import { PortalDataType } from '@/modules/shared/types/common';
import { AsideHotelInfoType, AsideReserveInfoType, DomesticHotelConfirmType, DomesticHotelDetailType, DomesticHotelGetReserveByIdData } from '@/modules/domesticHotel/types/hotel';
import { setReduxError } from '@/modules/shared/store/errorSlice';
import { useAppDispatch } from '@/modules/shared/hooks/use-store';
import { dateDiplayFormat, getDatesDiff, numberWithCommas } from '@/modules/shared/helpers';

import Aside from '@/modules/domesticHotel/components/shared/Aside';
import Steps from '@/modules/shared/components/ui/Steps';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import BookingContent from '@/modules/domesticHotel/components/booking/BookingContent';
import ReserverInformation from '@/modules/domesticHotel/components/checkout/ReserverInformation';
import { Bed, EmailGrayIcon, Lock, PhoneGrayIcon, RightCaret, Tik, User, WhatsappGrayIcon } from '@/modules/shared/components/ui/icons';
import Link from 'next/link';
import Tag from '@/modules/shared/components/ui/Tag';
import DownloadPdfVoucher from '@/modules/domesticHotel/components/booking/DownloadPdfVoucher';

const DomesticHotelReserveDetail: NextPage = ({ portalData }: { portalData?: PortalDataType }) => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');
    const { t: tPayment } = useTranslation('payment');

    const router = useRouter();

    const dispatch = useAppDispatch();

    const pathArray = router.asPath.split("?")[1]?.split("#")[0].split("&");
    const username: string | undefined = pathArray.find(item => item.includes("username="))?.split("username=")[1];
    const reserveId: string | undefined = pathArray.find(item => item.includes("reserveId="))?.split("reserveId=")[1];

    const [reserveNotFound, setReserveNotFound] = useState<boolean>(false);
    const [reserveData, setReserveData] = useState<DomesticHotelGetReserveByIdData>();
    const [hotelData, setHotelData] = useState<DomesticHotelDetailType>();

    const [copied, setCopied] = useState<boolean>(false);

    const phoneLink = portalData?.Phrases?.find(item => item.Keyword === "PhoneNumber")?.Value || "";
    const phoneNumber = phoneLink?.replace("+98", "0");
    const email = portalData?.Phrases?.find(item => item.Keyword === "Email")?.Value || "";
    const whatsApp = portalData?.Phrases?.find(item => item.Keyword === "whatsapp")?.Value || "";

    useEffect(() => {

        if (username && reserveId) {
            const fetchDomesticHotelReserve = async () => {
                const response: any = await domesticHotelGetReserveById({ reserveId: reserveId, userName: username });
                if (response.data.result) {
                    setReserveData(response.data.result)

                    const hotelDataResponse = await getDomesticHotelDetailById(response.data.result.accommodationId || response.data.result.accommodation?.id);
                    if (hotelDataResponse?.data) {
                        setHotelData(hotelDataResponse.data);
                    }
                } else {
                    setReserveNotFound(true);
                }
            }

            fetchDomesticHotelReserve();

        }

    }, [username, reserveId]);


    let guests: number = 0;
    let price: number = 0;

    if (reserveData?.rooms) {
        debugger;
        guests = reserveData.rooms.reduce((sum, room) => (sum + room.bed), 0);
        price = reserveData.rooms.reduce((sum, room) => {
            const roomPrice = room.pricing?.find(x => x.ageCategoryType === "ADL" && x.type === "Room")?.amount || 0;
            return ((sum + roomPrice))
        }, 0);
    }

    let status = null;

    let paymentLink = null;

    if (reserveData) {

        let StatusColor = null;
        switch (reserveData.status) {

            case "Pending":
            case "Registered":
            case "OnCredit":
            case "InProgress":
                StatusColor = "bg-[#52c41a] text-white";
                break;
            case "Unavailable":
                StatusColor = "bg-[#e7412a] text-white";
                break;

            case "Canceled":
            case "PaymentSuccessful":
            case "WebServiceUnsuccessful":
                StatusColor = "bg-[#ffb6ab] text-red-800";
                break;

            case "Issued":
                StatusColor = "bg-[#1dac08] text-white";
                break;

            default:
                StatusColor = "bg-[#dddddd]";

            //what about these status?
            // "Undefined, Issued, WebServiceCancel, PriceChange, Refunded, Voided, InProgress, PaidBack, RefundInProgress, Changed"
        };

        status = <div className='text-center my-4'> <Tag className={`${StatusColor} leading-6`} > {tPayment(`${reserveData.status}`)} </Tag> </div>

        paymentLink = (
            <Link
                href={`/payment?username=${reserveData.username}&reserveId=${reserveData.id}`}
                className='bg-[#1dac08] text-white flex items-center gap-2 justify-center rounded-sm h-12 sm:w-96 mx-auto mb-4 mt-6'
            >
                <Lock className='w-5 h-5 fill-current' />
                <span>{tPayment("pay-rial", { number: numberWithCommas(price) })}</span>
            </Link>
        );

        if (
            reserveData.status === "Canceled"
            || reserveData.status === "Issued"
            || reserveData.status === "Registered"
            || reserveData.status === "Unavailable"
            || reserveData.status === "PaymentSuccessful"
            || reserveData.status === "WebServiceUnsuccessful"
        ) {
            paymentLink = null;
        }

    }



    return (
        <>
            <div className='max-w-container mx-auto px-5 py-4'>

                <div className='grid gap-4 md:grid-cols-3'>
                    <div>
                        <div className='border border-neutral-300 bg-white rounded-md mb-4'>
                            login form
                        </div>
                    </div>
                    <div className='md:col-span-2'>
                        <div className='border border-neutral-300 bg-white rounded-md mb-4'>

                            {reserveNotFound ? (
                                <div className='p-5'>
                                    <p className='text-justify mb-4 text-sm'>
                                        متاسفانه دریافت اطلاعات این رزرو با خطا روبرو شد. لطفا برای اطلاعات بیشتر با پشتیبانی تماس بگیرید.
                                    </p>

                                    <div className='border border-neutral-300 px-4 py-2 mb-4 flex items-center justify-between sm:w-96 mx-auto text-sm'>
                                        <div>
                                            کد پیگیری
                                            <div className='font-semibold'>
                                                {reserveId}
                                            </div>
                                            <p className='text-2xs text-neutral-500'>
                                                هنگام صحبت با پشتیبانی از این کد استفاده کنید
                                            </p>

                                        </div>

                                        <button
                                            type='button'
                                            className={`text-xs outline-none border-none ${copied ? "text-green-600" : "text-blue-600"}`}
                                            onClick={() => {
                                                if (reserveId) {
                                                    navigator.clipboard.writeText(reserveId);
                                                    setCopied(true);
                                                }
                                            }}
                                        >
                                            {copied ? (
                                                <>
                                                    <Tik className='w-4 h-4 fill-current inline-block align-middle' /> کپی شد
                                                </>
                                            ) : "کپی کن"}

                                        </button>
                                    </div>

                                </div>
                            ) : (reserveData && hotelData) ? (
                                <>

                                    <div className='relative text-white'>
                                        <img
                                            src={hotelData.ImageUrl || "https://cdn.safaraneh.com/Images/Accommodations/fa/evinhotel.jpg"}
                                            alt={hotelData.ImageAlt || hotelData.HotelName}
                                            className='w-full h-44 object-cover'
                                        />
                                        <div
                                            className='absolute top-0 bottom-0 right-0 left-0 bg-[#00314380]'
                                        />
                                        <button
                                            type='button'
                                            className='absolute top-5 rtl:right-5 ltr:left-5 text-sm outline-none'
                                        //onClick={()=>goBooksPage()}
                                        >
                                            <RightCaret className='w-5 h-5 fill-current inline-block' />
                                            بازگشت به لیست رزروها

                                        </button>

                                        <h4 className='text-4xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'> {hotelData.CityName} </h4>

                                        <Bed
                                            className='w-12 h-12 fill-blue-400 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 bg-white border border-neutral-300'
                                        />

                                    </div>

                                    <div className='p-4 pt-10'>
                                        <h1 className='text-center font-semibold text-2xl mb-3'> {`${hotelData.HotelCategoryName} ${hotelData.HotelName} ${hotelData.CityName}`}</h1>

                                        <div className='flex gap-1 items-center justify-center'>

                                            {!!guests && <> {guests} <User className='w-5 h-5 fill-current rtl:ml-2 ltr:mr-2' /></>}

                                            {dateDiplayFormat({ date: reserveData.checkin, format: 'dd mm yyyy', locale: "fa" })} - {dateDiplayFormat({ date: reserveData.checkout, format: 'dd mm yyyy', locale: "fa" })}

                                        </div>

                                        {status}

                                        {paymentLink}

                                        {!!(reserveData.status === 'Issued' && reserveId && username) && (
                                            <DownloadPdfVoucher
                                                reserveId={reserveId}
                                                username={username}
                                                className="bg-primary-700 hover:bg-primary-800 text-white px-5 flex gap-2 items-center justify-center rounded-sm transition-all mb-4 w-full h-12 disabled:bg-neutral-500 disabled:cursor-not-allowed sm:w-96 mx-auto mb-4 mt-6"
                                            />
                                        )}

                                        <div className='border border-neutral-300 px-4 py-2 mb-4 flex items-center justify-between sm:w-96 mx-auto text-sm'>
                                            <div>
                                                کد پیگیری
                                                <div className='font-semibold'>
                                                    {reserveId}
                                                </div>
                                                <p className='text-2xs text-neutral-500'>
                                                    هنگام صحبت با پشتیبانی از این کد استفاده کنید
                                                </p>

                                            </div>

                                            <button
                                                type='button'
                                                className={`text-xs outline-none border-none ${copied ? "text-green-600" : "text-blue-600"}`}
                                                onClick={() => {
                                                    if (reserveId) {
                                                        navigator.clipboard.writeText(reserveId);
                                                        setCopied(true);
                                                    }
                                                }}
                                            >
                                                {copied ? (
                                                    <>
                                                        <Tik className='w-4 h-4 fill-current inline-block align-middle' /> کپی شد
                                                    </>
                                                ) : "کپی کن"}

                                            </button>

                                        </div>

                                    </div>

                                </>
                            ) : (
                                <Skeleton />
                            )}

                        </div>


                        <div className="border border-neutral-300 bg-white rounded-md mb-4 p-5">

                            <h5 className="font-semibold mb-2 text-lg">{tPayment("need-help")}</h5>

                            <p className="text-neutral-500 mb-4 text-sm">{tPayment("24hours-backup")}</p>

                            <div className='flex flex-col gap-4 md:flex-row md:justify-between text-xs'>

                                <div className="flex gap-2 items-center">
                                    <PhoneGrayIcon />
                                    <div>
                                        <div>{t("contact-us")}</div>
                                        <a href={`tel:${phoneLink}`}>{phoneNumber}</a>
                                    </div>
                                </div>

                                {!!whatsApp &&
                                    <div className="flex gap-2 items-center">
                                        <WhatsappGrayIcon />
                                        <div>
                                            <div>{t("whatsapp")}</div>
                                            <a href={`https://api.whatsapp.com/send?phone=${whatsApp}`}>
                                                <span dir="ltr">{whatsApp}</span>
                                            </a>
                                        </div>
                                    </div>
                                }

                                <div className="flex gap-2 items-center">
                                    <EmailGrayIcon />
                                    <div>
                                        <div>{t('email')}</div>
                                        <a href={`mailto:${email}`}>{email}</a>
                                    </div>
                                </div>
                            </div>
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

export default DomesticHotelReserveDetail;