import { useTranslation } from "next-i18next";
import { useEffect, useState } from 'react';
//import { DomesticHotelConfirmType, DomesticHotelGetReserveByIdData } from "../../types/hotel";
import { Close, ErrorIcon, InfoCircle, Tik, User } from "@/modules/shared/components/ui/icons";
import Loading from "@/modules/shared/components/ui/Loading";
import Skeleton from "@/modules/shared/components/ui/Skeleton";
import Image from "next/image";
import { CipGetReserveByIdResponse } from "../../types/cip";
//import DownloadPdfVoucher from "./DownloadPdfVoucher";

type Props = {
    confirmStatus?: "Undefined" | "Registered" | "Pending" | "Issued" | "Canceled" | "WebServiceCancel" | "PaymentSuccessful" | "WebServiceUnsuccessful" | "PriceChange" | "Unavailable" | "Refunded" | "Voided" | "InProgress" | "PaidBack" | "RefundInProgress" | "Changed" | "OnCredit" | "ContactProvider" | "UnConfirmed" | "ReceivedAdvance" | "ExtraReceiving";
    // reserveId?: string;
    // username?: string;
    reserveInfo?: CipGetReserveByIdResponse;
    confirmLoading: boolean;
    portalEmail?: string;
    portalPhoneLink?: string;
    portalPhoneNumber?: string;
}

const CipBookingContent: React.FC<Props> = props => {

    const { t } = useTranslation('common');
    const { t: tPayment } = useTranslation('payment');

    const { reserveInfo, confirmStatus, confirmLoading } = props;


    const [progress, setProgress] = useState<number>(0);

    let timer: any;

    useEffect(() => {

        if (confirmLoading) {

            timer = setInterval(() => {
                setProgress((prevState) => {
                    if (prevState < 90) {
                        return prevState + 5
                    } else {
                        clearInterval(timer)
                        return 100
                    }
                })
            }, 1000);

        } else {
            setProgress(0);
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer)
        }

    }, [confirmLoading])

    return (
        <div>
            <div>
                {(!reserveInfo || confirmLoading) ? (

                    <div className="border border-neutral-300 rounded-lg mb-4 bg-white" >
                        <div className="bg-[#f6b053] rounded-t-lg p-4 text-white relative">
                            <div
                                className="absolute bg-black/10 transition-all duration-1000 ease-linear top-0 rtl:right-0 ltr:left-0 h-full"
                                style={{ width: `${progress}%` }}
                            />
                            <span className="relative">
                                {tPayment("reserve-is-checking")}
                            </span>
                        </div>
                        <div className="px-4 py-8">
                            <div >
                                {reserveInfo && <h4 className="font-semibold text-lg text-center mb-1"> {`${t("hello")} ${reserveInfo && reserveInfo.reserver.firstName} ${reserveInfo && reserveInfo.reserver.lastName}`} </h4>}
                                <p className="text-center mb-1">{tPayment("wait-a-second")}</p>
                                <p className="text-center text-sm">{tPayment("an-email-will-sent")}</p>
                            </div>
                        </div>
                    </div>

                ) : confirmStatus === "ContactProvider" ? (
                    <>

                        ContactProvider


                        {/* TODO: ContactProvider */}

                        {/* <div className={styles.successMyBooking}>
                        <div>
                            <CheckIcon />
                            <span className={styles.textSuccessMyBooking}>{t("congratulation-reserve-success")}</span>
                        </div>
                        <div>
                            <span className={styles.reserveIdSuccessBooking}>{t('tracking-code')} : {this.props.reserveId}</span>
                        </div>
                    </div>
                    <div className={styles.contentMyBooking}>
                        <div className={styles.successBooking}>
                            <CheckCircleIcon />
                            {this.props.reserveInfo && this.props.reserveInfo.reserver.firstName ? <h4> {t('hello')} {this.props.reserveInfo.reserver.firstName} </h4> : ''}
                            <span>{t("reserve-success")}</span>
                            {this.props.reserveInfo.email &&
                                <span>
                                    {t("email-with-link2")}
                                    <b> {this.props.reserveInfo.reserver.email} </b>
                                    {t("sent")}
                                    {t("for-tracking-with-us")}
                                    <b> {t("tracking-code")}: {this.props.reserveId || <Spin />} </b>
                                    {t("use")}
                                </span>
                            }
                        </div>
                    </div> */}
                    </>
                ) : (
                    <>
                        <div className="border border-red-400 rounded-lg bg-white p-4 mb-4 text-justify">
                            <Close className="w-14 h-14 fill-white bg-red-500 rounded-full block mx-auto my-4 p-2" />
                            <p className="text-red-500 text-center font-semibold text-lg mb-2">
                                رزرو شما به مشکل خورد
                            </p>
                            <p className="text-center mb-4">
                                درخواست رزرو شما در حال بررسی توسط تیم پشتیبانی می باشد، جهت مشاهده وضعیت سفارش خود به بخش پیگیری رزرو مراجعه کنید.
                            </p>

                            <p className="text-amber-500 text-sm mb-4 text-center">
                                <ErrorIcon className="fill-current w-5 h-5 inline-block align-middle rtl:ml-1  ltr:mr-1" />
                                لطفا قبل از مشخص شدن وضعیت سفارش خود از خرید مجدد خودداری فرمایید.
                            </p>

                            <div className="text-center mb-4 font-semibold text-lg">
                                <span > {t("tracking-code")} : </span>
                                <span> {confirmLoading ? <Loading /> : reserveInfo?.id} </span>
                            </div>

                            <p className="text-sm text-center">
                                برای تماس با پشتیبانی با شماره
                                <a href={`tel:${props.portalPhoneLink}`}> {props.portalPhoneNumber} </a>
                                تماس بگیرید.
                            </p>

                        </div>

                    </>
                )}
            </div>


            {/* TODO: ContactProvider */}
            {/* {!!(confirmStatus === "ContactProvider") && (
                <>
                    {
                        this.props.reserveInfo?.id && this.props.reserveInfo?.username ?
                            <div className={styles.downloadVoucher}>
                                <a onClick={this.handleClick} disabled={this.state.voucherStatus === "pending" ? null : "disabled"}>
                                    {this.state.voucherStatus === "pending" ?
                                        <><BookingTicketIcon />{t("recieve-voucher")}</> :
                                        <><LoadingOutlined spin /> {t("loading-recieve-voucher")}</>}
                                </a>
                            </div>
                            : null
                    }
                </>
            )} */}


            <div className="border border-neutral-300 rounded-lg bg-white mb-4 p-4">
                {reserveInfo ? (
                    <>
                        <div className="mb-3 font-semibold text-lg">
                            {t("reserve-details")}
                        </div>
                        <p className="text-sm mb-3">
                            جزئیات رزرو شما صادر شد
                        </p>

                        <hr className="my-4" />

                        <p className="mb-3 text-justify">
                            برای شفافیت یا تاخیر در ارسال ووچر هتل، لطفا از طریق ایمیل
                            <a className="mx-1 text-blue-800 hover:text-blue-700 font-sans font-semibold" href={`mailto:${props.portalEmail}`}> {props.portalEmail} </a>
                            یا با شماره تلفن
                            <a className="mx-1 text-blue-800 hover:text-blue-700 font-semibold" href={`tel:${props.portalPhoneLink}`}> {props.portalPhoneNumber} </a>
                            تماس بگیرید.
                        </p>

                        <p>
                            تیم پشتیبانی از ساعت ۹:۰۰ الی ۲۲:۰۰
                        </p>

                    </>
                ) : (
                    <>
                        <Skeleton className="mb-4 w-20" />
                        <Skeleton className="w-1/4" />
                        <hr className="my-4" />
                        <Skeleton className="mb-4" />
                        <Skeleton className=" w-1/4 mb-4" />
                    </>

                )}
            </div>

        </div>
    )
};

export default CipBookingContent;