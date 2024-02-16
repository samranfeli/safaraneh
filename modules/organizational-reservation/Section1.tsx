import { NextPage } from "next";
import pic from '../../public/images/organizational-reservation/em-company.jpg';
import winningpic from '../../public/images/organizational-reservation/winner.png';
import supportpic from '../../public/images/organizational-reservation/customer-service.png';
import handeShakeepic from '../../public/images/organizational-reservation/handshake.png';
import Image from "next/image";

const Section1: NextPage = () => {
    return(
        <div className="flex">
            <div className="w-1/2 max-md:w-11/12 max-md:absolute z-0 m-auto">
            <Image src={pic} alt="em-company" width={300} height={100} onContextMenu={e => e.preventDefault()}
                className="shadow-2xl scale-90 max-md:opacity-10 w-9/12 max-md:w-2/3 max-sm:w-full max-sm:pt-16 max-md:m-auto"
                style={{
                    borderRadius:'30% 70% 70% 30%/30% 30% 70% 70%',
                    }}
                />
            </div>
            <div className="w-1/2 max-md:w-full z-10">
                <p className="text-yellow-700 font-bold">رزرو های سازمانی</p>
                <h2 className="leading-normal mt-3 font-semibold text-4xl max-md:text-3xl max-sm:text-2xl">سفرانه به شرکت‌ها و سازمان‌ها چه خدماتی ارائه می‌کند؟</h2>
                <div className="flex gap-5 mt-7 text-gray-500">
                    <div className="relative">
                        <span className="w-12 h-12 -right-2 bg-green-600 absolute -z-10 opacity-60"></span>
                        <Image src={winningpic} alt="تخفیف و پیشنهادات ویژه" width={50} height={50} />
                        <p className="pt-2">تخفیف و پیشنهادات ویژه</p>
                    </div>
                    <div className="relative">
                        <span className="w-12 h-12 -right-2 bg-orange-600 absolute rounded-full -z-10 opacity-60"></span>
                        <Image src={supportpic} alt='پشتیبانی اختصاصی' width={50} height={50} />
                        <p className="pt-2">پشتیبانی اختصاصی</p>
                    </div>
                    <div className="relative">
                        <span className="w-12 h-10 -right-2 rotate-45 bg-yellow-400 absolute -z-10 opacity-60"></span>
                        <Image src={handeShakeepic} alt="تضمین کمترین قیمت" width={50} height={50} />
                        <p>تضمین کمترین قیمت</p>
                    </div>
                </div>
                <p className="text-sm max-sm:text-xs mt-5 text-gray-500">
                یکی از چالش‌های پیش روی شرکت‌ها، سازماندهی سفرهای کاری، تفریحی، و سفر-همایش برای پرسنل است. انتخاب مناسب‌ترین هتل، بررسی ظرفیت، کیفیت و دریافت بیشترین تخفیف از جمله مواردی هستند که شرکت‌ها در این چالش پیش رو دارند. سفرانه با تجربه تخصصی برگزاری سفرهای گروهی یا فردی پرسنلی در این زمینه بهترین ارائه‌کننده خدمات گردشگری است.
                </p>
                <p className="text-sm max-sm:text-xs mt-5 text-gray-500">
                پنل رزرو شرکتی سفرانه با دریافت اطلاعات شرکت‌ها در کاهش دغدغه برنامه‌ریزی سفرهای کاری گام بزرگی را برمی‌دارد.
                </p>
            </div>
        </div>
    )
}

export default Section1;