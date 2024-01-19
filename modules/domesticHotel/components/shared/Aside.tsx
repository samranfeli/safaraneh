import Button from "@/modules/shared/components/ui/Button";
import Rating from "@/modules/shared/components/ui/Rating";
import Skeleton from "@/modules/shared/components/ui/Skeleton";
import { ArrowLeft, Tik, Bed, User, Calendar, DefaultRoom } from "@/modules/shared/components/ui/icons";
import { dateDiplayFormat, dateFormat, getDatesDiff, numberWithCommas } from "@/modules/shared/helpers";
import { useAppSelector } from "@/modules/shared/hooks/use-store";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { AsideHotelInfoType, AsideReserveInfoType, DomesticHotelDetailType, DomesticHotelGetValidateResponse } from "../../types/hotel";

type Props = {
    reserveInformation?: AsideReserveInfoType;
    hotelInformation?: AsideHotelInfoType;
    roomChildAndExtraBed?: any;
    hasSubmit?: boolean;
    submitLoading?: boolean;
    className?: string;
    discountResponse?: any;
}
const Aside: React.FC<Props> = props => {

    const { t } = useTranslation('common');
    const { t: tHotel } = useTranslation('hotel');

    const portalInfo = useAppSelector(state => state.portal);

    const { hotelInformation, reserveInformation, roomChildAndExtraBed, discountResponse } = props;

    const board = (code: string) => {
        switch (code) {
            case "BB":
                return "به همراه صبحانه";
            case "HB":
                return "صبحانه + ناهار یا شام";
            case "FB":
                return "تمام وعده های غذایی شامل می شود";
            case "RO":
                return "بدون صبحانه";
            case "Hour6":
                return "اقامت به مدت ۶ ساعت";
            case "Hour10":
                return "اقامت به مدت ۱۰ ساعت";

            default:
                return code;
        }
    }

    const hasDiscount = reserveInformation?.salePrice && reserveInformation.boardPrice && reserveInformation.boardPrice > reserveInformation.salePrice;

    let childCount = 0;
    let childPrice = 0;
    let extraBedCount = 0;
    let extraBedPrice = 0;
    if (roomChildAndExtraBed?.length) {
        childCount = roomChildAndExtraBed.reduce((total: number, item: any) => item.selectedChild ? (total + 1) : total, 0);
        childPrice = roomChildAndExtraBed.reduce((total: number, item: any) => item.selectedChild ? (total + item.childFee) : total, 0);
        extraBedCount = roomChildAndExtraBed.reduce((total: number, item: any) => total + item.selectedExtraBed, 0);
        extraBedPrice = roomChildAndExtraBed.reduce((total: number, item: any) => total + (item.selectedExtraBed * item.extraBedFee), 0);
    }

    let activeExtraBedPrice;
    let activeExtraBedCount;

    if (props.reserveInformation?.selectedExtraBedPrice) {
        activeExtraBedPrice = props.reserveInformation?.selectedExtraBedPrice;
        activeExtraBedCount = props.reserveInformation?.selectedExtraBedCount;
    } else {
        activeExtraBedPrice = extraBedPrice;
        activeExtraBedCount = extraBedCount;
    }

    let safaranehEmailAddress = "support@safaraneh.com";
    let safaranehPhoneNumber = "02126150051"
    let safaranehPhoneLink = "+982126150051";

    let portalEmailAddress;
    let portalPhoneNumber;
    let portalPhoneLink;

    if (portalInfo?.Phrases) {
        portalEmailAddress = portalInfo.Phrases.find(item => item.Keyword === "Email")?.Value;
        portalPhoneNumber = portalInfo.Phrases.find(item => item.Keyword === "TelNumber")?.Value;

        if (portalPhoneNumber && portalPhoneNumber[0] === "0") {
            portalPhoneLink = portalPhoneNumber.substring(1);
            portalPhoneLink = "+98" + portalPhoneLink;
        }
    }
    if (!reserveInformation) {
        return (<div>
            loading
        </div>)
    }

    return (
        <div className={`bg-white rounded-lg border border-neutral-300 ${props.className}`} >

            {hotelInformation && reserveInformation ?
                <div>
                    <h4 className="p-3 font-semibold text-sm border-b leading-5 border-neutral-300" >
                        {t('reserve-details')}
                    </h4>

                    <div className="p-2.5">
                        <div className="grid grid-cols-4 gap-x-3 gap-y-2">
                            {hotelInformation.image.url ? (
                                <Image
                                    src={hotelInformation.image.url}
                                    alt={hotelInformation?.image?.alt || hotelInformation.name}
                                    title={hotelInformation?.image?.title}
                                    width={80}
                                    height={60}
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <div
                                    className="bg-neutral-100 flex items-center justify-center h-full "
                                >
                                    <DefaultRoom className="fill-neutral-300 w-12 h-12 p-1" />
                                </div>
                            )}
                            <div className="col-span-3">
                                <h4 className="font-semibold text-sm">{hotelInformation.name}</h4>
                                {!!hotelInformation?.rating && <Rating number={hotelInformation.rating} className="mb-2" />}
                            </div>
                            {!!hotelInformation?.address && (
                                <p className="text-xs text-neutral-500 leading-5 col-span-4 border-b border-neutral-300 pb-2">
                                    {hotelInformation?.address}
                                </p>
                            )}
                        </div>

                        {/* TODO: in case of reserve page check style */}
                        {/* {!!reserveInformation.reserveId && (
                            <div className='padding-start-10 padding-end-10 margin-top-15'>
                                <div className='dashed-reserve-id'>
                                    {t('tracking-code')} : {props.reserveInformation.reserveId}
                                </div>
                            </div>
                        )} */}

                        {reserveInformation && (
                            <div className="text-xs flex items-center gap-2 pt-4 pb-1">

                                <Calendar className="w-5 h-5 fill-neutral-600" />

                                {dateDiplayFormat({ date: reserveInformation.checkin, format: "dd mm yyyy", locale: "fa" })}

                                <ArrowLeft className="w-4 h-4 fill-neutral-700" />

                                {dateDiplayFormat({ date: reserveInformation.checkout, format: "dd mm yyyy", locale: "fa" })}

                                <span>
                                    {getDatesDiff(new Date(reserveInformation.checkout), new Date(reserveInformation.checkin))} {tHotel('night')}
                                </span>

                            </div>
                        )}

                        {reserveInformation.rooms.map((roomItem: any, roomIndex: number) => {

                            //TODO check cancelation
                            let cancellation = null;
                            switch (roomItem.cancellationPolicyStatus) {
                                case "NonRefundable":
                                    cancellation = <div className="margin-bottom-5 text-red">{t("non-refundable")}</div>;
                                    break;
                                case "Refundable":
                                    cancellation = <div className="text-green margin-bottom-5">
                                        <Tik className="w-3 h-4 fill-green-600" />
                                        {t("refundable")}
                                    </div>;
                                    break;
                                default:
                                    cancellation = <div className="margin-bottom-5">{roomItem.cancellationPolicyStatus}</div>;
                            }

                            let childPriceBlock = null;
                            let extraBedPriceBlock = null;

                            if (roomChildAndExtraBed?.length) {
                                const itemInfo = roomChildAndExtraBed[roomIndex];
                                if (itemInfo?.selectedChild) {
                                    childPriceBlock = <span> + یک کودک</span>
                                }
                                if (itemInfo?.selectedExtraBed) {
                                    let count = null;
                                    switch (itemInfo.selectedExtraBed) {
                                        case 1:
                                            count = "یک";
                                            break;
                                        case 2:
                                            count = "دو";
                                            break;
                                        case 3:
                                            count = "سه";
                                            break;
                                        default:
                                            count = itemInfo.selectedExtraBed;

                                    }
                                    extraBedPriceBlock = <span> + {count} تخت اضافه</span>
                                }
                            }

                            return (
                                <div key={roomIndex}>
                                    {reserveInformation.rooms.length > 1 && (
                                        <div className='flex items-center text-sm gap-2 font-semibold after:block after:border-b after:grow after:border-neutral-300'>
                                            {tHotel('room')} {roomIndex + 1}
                                        </div>
                                    )}

                                    <div className="flex gap-2 items-center text-sm">
                                        <Bed className="w-4.5 h-4.5 fill-current" />
                                        {roomItem.name}
                                    </div>

                                    <div className="flex gap-2 items-center text-sm">
                                        <User className="w-4.5 h-4.5 fill-current" />
                                        {roomItem.bed} {tHotel('guest')} {childPriceBlock} {extraBedPriceBlock}
                                    </div>

                                    <div className="text-green-600 text-sm">{board(roomItem.board)}</div>

                                    {cancellation}

                                </div>
                            )
                        })}

                        <div className="border-t border-neutral-300 mt-4 pt-4 text-sm">

                            {reserveInformation.boardPrice && (hasDiscount || !!childCount || !!activeExtraBedPrice || !!reserveInformation.promoCodePrice) && (
                                <div className="flex items-center justify-between">
                                    {t("sum")}
                                    <span>{numberWithCommas(reserveInformation.boardPrice)} {t('rial')} </span>
                                </div>
                            )}

                            {!!childCount && (
                                <div className="flex items-center justify-between">
                                    {t("child")} (x{childCount})
                                    <span>{numberWithCommas(childPrice)} {t('rial')} </span>
                                </div>
                            )}

                            {!!activeExtraBedPrice && (
                                <div className="flex items-center justify-between">
                                    {t("extra-bed")} (x{activeExtraBedCount})
                                    <span>{numberWithCommas(activeExtraBedPrice)} {t('rial')} </span>
                                </div>
                            )}

                            {hasDiscount && (
                                <div className="flex items-center justify-between">
                                    {t("site-discount")}
                                    <span>{numberWithCommas(reserveInformation.boardPrice - reserveInformation.salePrice)} {t('rial')}</span>

                                </div>
                            )}

                            {!!discountResponse || !!reserveInformation.promoCodePrice && (
                                <div className="flex items-center justify-between">
                                    کد تخفیف
                                    <span>{numberWithCommas(discountResponse?.discountPrice || reserveInformation.promoCodePrice)} {t('rial')}</span>
                                </div>
                            )}

                            {!!reserveInformation.salePrice && (
                                <div className="flex items-center justify-between">
                                    {t("price-paid")}
                                    <strong className="font-bold text-sm">
                                        {!!discountResponse && discountResponse.orderSubTotalDiscount >= 10000 ?
                                            numberWithCommas(discountResponse.orderSubTotalDiscount + (activeExtraBedPrice || 0)) + " " + t('rial')
                                            :
                                            numberWithCommas(reserveInformation.salePrice + (activeExtraBedPrice || 0) - (reserveInformation.promoCodePrice || 0)) + " " + t('rial')
                                        }
                                    </strong>
                                </div>
                            )}

                        </div>

                        {props.hasSubmit && (
                            <div className="mt-2 max-sm:fixed max-sm:bg-white max-sm:border-t max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-50 max-sm:p-4">
                                <Button type="submit" loading={props.submitLoading} className="h-12 px-2 w-full" >
                                    {t('complete-reserve-and-get-confirmation')}
                                </Button>
                            </div>
                        )}

                    </div>



                </div>
                :
                <div >
                    <Skeleton />                  
                </div>
            }

            {/* {
            hotelInformation ?
                props.isBooking ? <div className={styles.bookingNeedHelp}>
                    <h4 className={styles.subjectBookingNeedHelp}>{t('need-help')}</h4>
                    <div className={styles.contentBookingNeedHelp}>
                        <span>{t('24hours-backup')}</span>
                        <a href={`tel:${portalPhoneLink || safaranehPhoneLink}`}> {portalPhoneNumber || safaranehPhoneNumber} </a>
                        <a href={`mailto:${portalEmailAddress || safaranehEmailAddress}`}> {portalEmailAddress || safaranehEmailAddress} </a>
                    </div>
                </div>
                :
                null
            :
            <div className={styles.alertSuccess}>
                <Skeleton.Button active className={styles.subjectAlertInfoSkeleton} />
                <Skeleton.Button active className={styles.contentAlertInfoSkeleton} />
            </div>

        }


        {
            hotelInformation ?
            <div className={styles.alertSuccess}>
                <h6>{t('price-will-increase')}</h6>
                <span>{t('price-will-increase-desc')}</span>
            </div>
            :
            <div className={styles.alertSuccess}>
                <Skeleton.Button active className={styles.subjectAlertInfoSkeleton} />
                <Skeleton.Button active className={styles.contentAlertInfoSkeleton} />
            </div>
        }
            
            {
                hotelInformation ?
                hotelInformation.TopSelling && !props.isBooking ?
                <div className={styles.alertInfo}>
                    <h6>{t('recent-reserve-number')}</h6>
                    <span>
                        {t('recent-reserve-number-of-hotel')}<b> {hotelInformation.TopSelling} </b> {t('are')}
                    </span>
                </div>
                :null
                :
                <div className={styles.alertInfo}>
                    <Skeleton.Button active className={styles.subjectAlertInfoSkeleton} />
                    <Skeleton.Button active className={styles.contentAlertInfoSkeleton} />
                </div>
            } */}

        </div>
    )

}

export default Aside;