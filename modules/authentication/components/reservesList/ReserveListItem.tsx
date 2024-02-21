import {useState} from 'react';
import { Bed, Cancel, CreditCard, DownCaret, ErrorIcon, TikCircle, TimeSand, Travel } from "@/modules/shared/components/ui/icons";
import { dateDiplayFormat, numberWithCommas } from "@/modules/shared/helpers";
import { UserReserveListItem } from "@/modules/shared/types/common";

type Props = {
    item: UserReserveListItem
}

const ReserveListItem: React.FC<Props> = props => {

    const { creationTime, id, salePrice, status, type, username } = props.item;

    const [openDetail, setOpenDetail] = useState<boolean>(false);

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
            statusText =   <span className="inline-block align-middle text-red-500"> تماس با پشتیبانی </span> ;
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
            statusIcon =  <CreditCard className="w-4.5 h-4.5 fill-[#52c41a] inline-block align-middle" /> ;
            statusText = <span className="inline-block align-middle text-[#52c41a]"> علی الحساب </span>;
            break;
        default:
            statusIcon = "";
            statusText = "";
    }

    return (
        <div className='border border-neutral-200 grid grid-cols-6 text-xs mb-3 leading-5 py-3'>
            <div className="px-3 py-1.5 col-span-3 md:col-span-1"> <div className='md:hidden'> شماره سفارش: </div> {id} </div>
            <div className="px-3 py-1.5 col-span-3 md:col-span-1 rtl:max-md:text-left ltr:max-md:text-right"> 
                <div className='md:hidden'>
                    {statusIcon}
                </div>
                {typeIcon(type)} {typeName(type)} 
            </div>
            <div className="px-3 py-1.5 whitespace-nowrap col-span-3 md:col-span-1"> <div className='md:hidden'> تاریخ رزرو: </div> {dateDiplayFormat({ date: creationTime, locale: "fa", format: "ddd dd mm" })} </div>
            <div className="px-3 py-1.5 col-span-3 md:col-span-1 rtl:max-md:text-left ltr:max-md:text-right"> <div className='md:hidden'> مبلغ کل: </div>  {numberWithCommas(salePrice || 0)} </div>
            <div className="px-3 py-1.5 whitespace-nowrap col-span-6 md:col-span-1 max-md:hidden"> {statusIcon} {statusText} </div>
            <div className="px-3 py-1.5 rtl:text-left ltr:text-right">
                <button
                    type="button"
                    className="text-blue-700"
                    onClick={() => {setOpenDetail(prevstate => !prevstate)}}
                >
                    جزییات <DownCaret className={`w-4 h-4 inline-block align-middle fill-current transition-all ${openDetail?"rotate-180":""}`} />
                </button>
            </div>
            {!!openDetail && <div className='col-span-6 p-10 bg-neutral-100'>
                جزییات
            </div>}
        </div>
    )
}

export default ReserveListItem;