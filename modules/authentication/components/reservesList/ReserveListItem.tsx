import { useEffect, useState } from 'react';
import { Bed, Cancel, CreditCard, DefaultRoom, DownCaret, ErrorIcon, TikCircle, TimeSand, Travel } from "@/modules/shared/components/ui/icons";
import { dateDiplayFormat, numberWithCommas } from "@/modules/shared/helpers";
import { UserReserveListItem } from "@/modules/shared/types/common";
import { domesticHotelGetReserveById } from '@/modules/domesticHotel/actions';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import DownloadPdfVoucher from '@/modules/domesticHotel/components/booking/DownloadPdfVoucher';

type Props = {
    item: UserReserveListItem
}

const ReserveListItem: React.FC<Props> = props => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    const { creationTime, id, salePrice, status, type, username } = props.item;

    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [domesticHotelDetail, setDomesticHotelDetail] = useState<any>(undefined);
    const [detailLoading, setDetailLoading] = useState<any>();

    const fetchDetail = async () => {

        if (!username) return;

        if (type === 'HotelDomestic') {
            setDomesticHotelDetail(undefined);
            setDetailLoading(true);
            const response: any = await domesticHotelGetReserveById({ reserveId: id.toString(), userName: username });
            setDetailLoading(false);
            if (response?.data?.result) {
                setDomesticHotelDetail(response.data.result);
            }
        }
    }

    useEffect(() => {
        if (openDetail && !domesticHotelDetail) {
            fetchDetail();
        }
    }, [openDetail]);

    const typeIcon = (type: UserReserveListItem['type']) => {
        switch (type) {
            case "HotelDomestic":
            case "Hotel":
                return (<Bed className="w-4.5 h-4.5 fill-current inline-block align-middle" />);
            case "Flight":
            case "FlightDomestic":
                return (<Travel className="w-4.5 h-4.5 fill-current inline-block align-middle" />)
            default:
                return null;
        }
    }

    const typeName = (type: UserReserveListItem['type']) => {
        switch (type) {
            case "HotelDomestic":
                return "هتل داخلی"
            case "Hotel":
                return "هتل خارجی"
            case "Flight":
                return "پرواز خارجی"
            case "FlightDomestic":
                return "پرواز داخلی"
            default:
                return type;
        }
    }

    let statusIcon: React.ReactNode;
    let statusText: React.ReactNode;

    switch (status) {
        case "Pending":
            statusIcon = <ErrorIcon className="w-4.5 h-4.5 fill-[#1dac08] inline-block align-middle" />;
            statusText = <span className="inline-block align-middle text-[#1dac08]"> آماده پرداخت </span>;
            break;
        case "Issued":
            statusIcon = <TikCircle className="w-4.5 h-4.5 fill-[#1dac08] inline-block align-middle" />;
            statusText = <span className="inline-block align-middle text-[#1dac08]"> نهایی شده  </span>;
            break;
        case "Canceled":
            statusIcon = <Cancel className="w-4.5 h-4.5 fill-red-500 inline-block align-middle" />;
            statusText = <span className="inline-block align-middle text-red-500"> کنسل  </span>;
            break;
        case "Registered":
            statusIcon = <TimeSand className="w-4.5 h-4.5 fill-[#52c41a] inline-block align-middle" />;
            statusText = <span className="inline-block align-middle text-[#52c41a]"> در حال بررسی  </span>;
            break;
        case "Unavailable":
            statusIcon = <ErrorIcon className="w-4.5 h-4.5 fill-red-500 inline-block align-middle" />;
            statusText = <span className="inline-block align-middle text-red-500"> جا نمی دهد  </span>;
            break;
        case "ContactProvider":
            statusIcon = <ErrorIcon className="w-4.5 h-4.5 fill-red-500 inline-block align-middle" />;
            statusText = <span className="inline-block align-middle text-red-500"> تماس با پشتیبانی </span>;
            break;
        case "PaymentSuccessful":
        case "WebServiceUnsuccessful":
            statusIcon = <Cancel className="w-4.5 h-4.5 fill-red-500 inline-block align-middle" />;
            statusText = <span className="inline-block align-middle text-red-500"> خطا در صدور بلیط  </span>;
            break;
        case "InProgress":
            statusIcon = <TimeSand className="w-4.5 h-4.5 fill-[#52c41a] inline-block align-middle" />;
            statusText = <span className="inline-block align-middle text-[#52c41a]"> در حال صدور </span>;
            break;
        case "OnCredit":
            statusIcon = <CreditCard className="w-4.5 h-4.5 fill-[#52c41a] inline-block align-middle" />;
            statusText = <span className="inline-block align-middle text-[#52c41a]"> علی الحساب </span>;
            break;
        default:
            statusIcon = "";
            statusText = "";
    }

    let paymentLink = null;
    if (type === 'HotelDomestic' && !['Canceled', 'Issued', 'Registered', 'Unavailable', 'PaymentSuccessful', 'WebServiceUnsuccessful'].includes(status)) {
        paymentLink = (
            <Link
                href={`/payment?username=${username}&reserveId=${id}`}
                className='bg-green-600 text-white hover:bg-green-700 px-3 h-8 rounded transition-all inline-flex items-center justify-center'
            >
                پرداخت کنید
            </Link>
        )
    };

    let downloadTicket = null;
    if (type === 'HotelDomestic' && status === 'Issued' && domesticHotelDetail && username) {
        downloadTicket = <DownloadPdfVoucher
            simple
            reserveId={id.toString()}
            username={username}
            className="rounded border border-primary-700 hover:bg-primary-700 text-neutral-600 hover:text-white px-1 transition-all h-8 disabled:bg-neutral-500 disabled:cursor-not-allowed disabled:text-white"
        />
    };

    let linkToDetail = null;
    if (type === 'HotelDomestic' && id && username) {
        linkToDetail = (
            <Link
                className='border border-green-600 rounded text-green-600 hover:text-white hover:bg-green-600 transition-all px-3 h-8 inline-flex items-center justify-center'
                href={`/myaccount/booking/hotel?username=${username}&reserveId=${id}`}
            >
                اطلاعات بیشتر
            </Link>
        )
    }

    return (
        <div className='relative border border-neutral-200 text-xs mb-3 max-md:pb-8'>
            <div className='grid grid-cols-6 leading-5 p-3'>
                <div className="px-3 py-1.5 col-span-3 md:col-span-1"> <span className='md:hidden'> {statusIcon} </span> {id} </div>
                <div className="px-3 py-1.5 col-span-3 md:col-span-1 rtl:max-md:text-left ltr:max-md:text-right">
                    {typeIcon(type)} {typeName(type)}
                </div>
                <div className="px-3 py-1.5 whitespace-nowrap col-span-3 md:col-span-1"> {dateDiplayFormat({ date: creationTime, locale: "fa", format: "ddd dd mm" })} </div>
                <div className="px-3 py-1.5 col-span-3 md:col-span-1 rtl:max-md:text-left ltr:max-md:text-right whitespace-nowrap">  {numberWithCommas(salePrice || 0)}  <span className='md:hidden'> ریال </span></div>
                <div className="px-3 py-1.5 whitespace-nowrap col-span-6 md:col-span-1 max-md:hidden"> {statusIcon} {statusText} </div>
                <div className="md:px-3 md:py-1.5 max-md:absolute max-md:bottom-0 max-md:left-0 max-md:right-0 md:rtl:text-left md:ltr:text-right">
                    <button
                        type="button"
                        className="max-md:bg-blue-700 max-md:w-full max-md:h-8 max-md:block text-white md:text-blue-700 outline-none"
                        onClick={() => { setOpenDetail(prevstate => !prevstate) }}
                    >
                        {openDetail? "بستن" : "جزییات"} <DownCaret className={`w-4 h-4 inline-block align-middle fill-current transition-all ${openDetail ? "rotate-180" : ""}`} />
                    </button>
                </div>
            </div>
            {!!openDetail && <div className='p-3 bg-neutral-100'>

                <div className='hidden md:grid grid-cols-5 gap-3 border-b border-dashed border-neutral-300 pb-3 mb-3'>
                    <div />
                    <label> {tHotel("hotel-name")} </label>
                    <label> {t("checkin-date")} </label>
                    <div className='col-span-2' />
                </div>

                {detailLoading ? (
                    <div className='grid grid-cols-5 gap-3 items-center'>
                        <Skeleton type='image' className='h-20' />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                ) : (
                    <div className='grid grid-cols-2 md:grid-cols-5 gap-3 items-center'>
                        <Image
                            src={domesticHotelDetail?.accommodation?.filePath || '/images/default-hotel.jpg'}
                            alt={domesticHotelDetail?.accommodation?.displayName}
                            width={130}
                            height={80}
                            className='h-20 object-cover w-full'
                        />
                        <span> {domesticHotelDetail?.accommodation?.displayName || " -- "} </span>
                        <span className='hidden md:block'>
                            {domesticHotelDetail?.checkin ? dateDiplayFormat({ date: domesticHotelDetail.checkin, locale: "fa", format: "ddd dd mm" }) : " -- "}
                        </span>
                        {paymentLink || downloadTicket || <div />}
                        {linkToDetail || <div />}
                    </div>
                )}
            </div>}
        </div>
    )
}

export default ReserveListItem;