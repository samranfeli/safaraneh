import Button from '@/modules/shared/components/ui/Button';
import Loading from '@/modules/shared/components/ui/Loading';
import Skeleton from '@/modules/shared/components/ui/Skeleton';
import { ErrorIcon, InfoCircle } from '@/modules/shared/components/ui/icons';
import { getDatesDiff, numberWithCommas } from '@/modules/shared/helpers';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Props = {
    goToBankLoading?: boolean;
    onSubmit: (gatewayId: number) => void;
    expireDate?: string;
    bankGatewayList?: any;
    isError?: any;
    type?: "Undefined" | "HotelDomestic" | "FlightDomestic" | "Bus" | "Package" | "Flight" | "Hotel" | "PnrOutside" | "Cip" | "Activity";
    coordinatorPrice?: number;

}

const OnlinePayment: React.FC<Props> = props => {

    const { t } = useTranslation('common');
    const { t: tPayment } = useTranslation('payment');

    const {
        bankGatewayList,
        goToBankLoading,
        isError,
        expireDate,
        type,
        coordinatorPrice
    } = props


    const [gatewayId, setGatewayId] = useState<number>();
    const [remaindSeconds, setRemaindSeconds] = useState<number>(100);

    let firstBankId: number | undefined = undefined;
    if (bankGatewayList?.gateways?.length) {
        firstBankId = bankGatewayList.gateways[0].id;
    }

    useEffect(() => {
        if (firstBankId) {
            setGatewayId(firstBankId);
        }
    }, [firstBankId]);

    const submit = () => {
        if (!sumbitBtnIsDisabled && !props.goToBankLoading && gatewayId) {
            props.onSubmit(gatewayId)
        }
    }

    const remaindTimeElement = (second: number) => {
        const days = Math.floor(second / (24 * 60 * 60))
        const daysRemained = second % (24 * 60 * 60)
        const hours = Math.floor(daysRemained / (60 * 60))
        const hoursRemained = daysRemained % (60 * 60)
        const minutes = Math.floor(hoursRemained / 60)
        const seconds = hoursRemained % 60

        if (second > 0) {
            return (
                <div className='bg-white p-4 border border-neutral-300 rounded-md mb-4 border-t-2 border-t-orange-400 mt-8'>
                    <h6 className='text-orange-400 font-semibold mb-1'> درخواست رزرو تایید شد </h6>
                    <p className='text-xs'>
                        <span> خواهشمند است حداکثر ظرف مدت </span>
                        {days ? <b> <span className='font-mono'> {days} </span> روز </b> : null}
                        {hours ? <b> <span className='font-mono'> {hours} </span> ساعت </b> : null}
                        {!!(minutes && (hours || days)) && (<span> و </span>)}
                        {minutes ? <b> <span className='font-mono'> {minutes} </span> دقیقه </b> : null}
                        {!!(seconds && (minutes || hours)) && (<span> و </span>)}
                        {seconds ? <b> <span className='font-mono'> {seconds} </span> ثانیه </b> : null}
                        <span>
                            {' '}
                            نسبت به پرداخت صورتحساب اقدام فرمایید. بدیهی است پس از منقضی شدن
                            زمان مذکور درخواست شما لغو می گردد.{' '}
                        </span>
                    </p>
                </div>
            )
        }
        return null
    }

    let countDownTimer: any;

    useEffect(() => {
        if (expireDate) {


            const remainedsec = getDatesDiff(new Date(), new Date(expireDate), 'seconds');

            if (remainedsec > 1) {
                setRemaindSeconds(remainedsec)
                countDownTimer = setInterval(() => {
                    setRemaindSeconds((prevState) => {
                        if (prevState > 1) {
                            return prevState - 1
                        } else {
                            clearInterval(countDownTimer)
                            return 0
                        }
                    })
                }, 1000)
            } else {
                setRemaindSeconds(0)
            }
        } else {
            setRemaindSeconds(0)
        }
        return () => {
            clearInterval(countDownTimer)
        }
    }, [props.expireDate])



    let sumbitBtnIsDisabled = false
    if (
        type === 'Hotel' ||
        type === 'Flight' ||
        (type === 'HotelDomestic' && remaindSeconds < 1)
    ) {
        sumbitBtnIsDisabled = true
    }
    return (
        <div
            className='pt-10'
        // className={`${styles.contentBooking} ${styles.contentPayment} ${
        //   process.env.THEME_NAME === 'TRAVELO' && styles.contentPaymentTravelo
        // }`}
        >
            {type === 'HotelDomestic' && remaindSeconds < 1 && (
                <div className='border p-4 border-neutral-300 rounded border-t-4 border-t-red-500 text-xs'>
                    <h6 className='text-red-600 text-sm font-semibold'> اخطار! </h6>
                    <p>
                        درخواست رزرو تایید شد ولی به علت عدم پرداخت در مهلت تعیین شده لغو گردید.
                    </p>
                </div>
            )}

            {isError === '0' || isError === 0 ? (
                <div
                //className={styles.errorPayment}
                >
                    <div
                    //className={styles.subject}
                    >
                        <ErrorIcon className='w-6 h-6 full-red-500' />

                        {tPayment('error-in-pay')}
                    </div>
                    <span>{tPayment('please-pay-again')}</span>
                </div>
            ) : (
                ''
            )}


            <p className='text-sm mt-5'>
                <InfoCircle className='w-5 h-5 full-neutral-500 inline-block align-middle rtl:ml-2 ltr:mr-2' />
                <span>{tPayment('second-password')}</span>
            </p>

            <Link href="/other/pouya-password" className='inline-block text-blue-800 hover:text-blue-600 text-sm px-7 mb-8'>
                {tPayment('second-password-desc')}
            </Link>




            {bankGatewayList && bankGatewayList.gateways ? (
                <div
                //className={styles.howPay}
                >
                    <h5 className='text-xl mb-5'>
                        {tPayment('please-choose-pay-panel')}
                    </h5>
                    <div
                        className=''
                    //   className={`${styles.cardBody} ${
                    //     type === 'HotelDomestic' && remaindSeconds < 1
                    //       ? 'card-body-disable'
                    //       : ''
                    //   }`}
                    >
                        <div className='bg-neutral-50 p-2 sm:p-4 text-xs rounded flex items-center gap-2'>
                            <img
                                src={bankGatewayList.image.path}
                                alt={bankGatewayList.image.altAttribute}
                            />
                            {bankGatewayList.description}
                        </div>

                        <div className='flex gap-4 my-4'>
                            {bankGatewayList.gateways.map((bank: any, index: number) => (
                                <button
                                    key={index}
                                    disabled={type === 'HotelDomestic' && remaindSeconds < 1}
                                    type='button'
                                    onClick={() => { setGatewayId(bank.id) }}
                                    className={`border border-3 px-4 py-3 text-sm grow text-center rounded-sm text-blue-700 select-none outline-none border-blue-500 disabled:border-neutral-400 disabled:bg-neutral-200 disabled:grayscale ${gatewayId === bank.id ? "bg-blue-100" : "bg-blue-50"}`}
                                >
                                    <img
                                        className="block mx-auto mb-1"
                                        src={bank.image.path}
                                        alt={bank.image.altAttribute}
                                    />
                                    {bank.name}
                                </button>
                            ))}

                            {/* <button

                                type='button'
                                onClick={() => { setGatewayId(100) }}
                                disabled={type === 'HotelDomestic' && remaindSeconds < 1}
                                className={`border border-3 px-4 py-3 text-sm grow text-center rounded-sm text-blue-700 select-none outline-none border-blue-500 disabled:border-neutral-400 disabled:bg-neutral-200 disabled:grayscale ${gatewayId === 100 ? "bg-blue-100" : "bg-blue-50"}`}
                            >
                                <img
                                    className="block mx-auto mb-1"
                                    src={"bank.image.path"}
                                    alt={"bank.image.altAttribute"}
                                />
                                صادرات
                            </button> */}



                        </div>


                        {coordinatorPrice ? (
                            <div className='text-sm font-semibold py-4'>
                                {tPayment('total-price')} :  {numberWithCommas(coordinatorPrice)} {t('rial')}
                            </div>
                        ) : (
                            <Skeleton />
                        )}

                        <Button
                            className="h-12 px-5 font-semibold w-full sm:w-60"
                            onClick={submit}
                            disabled={sumbitBtnIsDisabled}
                            loading={goToBankLoading}
                        >

                            {tPayment('pay')}

                            {/* {loadingSubmit ? (
                          <LoadingOutlined
                            spin
                            className={styles.loadingFlight}
                          ></LoadingOutlined>
                        ) : (
                          <LockIcon />
                        )} */}

                        </Button>


                        <p className='my-4 text-neutral-400 text-xs' >
                            {tPayment('accept-privacy')}
                        </p>
                    </div>
                </div>
            ) : (
                <div
                //className={styles.howPay}
                >
                    <div
                    //className={styles.cardTitle}
                    >
                        {tPayment('please-choose-pay-panel')}</div>
                    <div
                    //className={styles.cardBody}
                    >
                        <div
                        //className={styles.loading}
                        >
                            <Loading size='small' />

                            <span>در حال بارگذاری</span>
                        </div>
                    </div>
                </div>
            )}

            {type === 'HotelDomestic' && remaindTimeElement(remaindSeconds)}

            {/* {props.isAuthenticated ? <Wallet pricePayment={price} />: ''} */}
        </div>
    )
}

export default OnlinePayment;