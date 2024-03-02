import { NextPage } from "next";
import alley from '../../../../../public/images/organizational-reservation/street.jpg';
import Image from "next/image";

const Section2: NextPage<any> = ({logo, sitename}) => {
    return (
        <div className="pt-12 max-md:pt-24">
            <div className="bg-white space-y-7 shadow-2xl p-8 pt-14 pb-14 max-md:p-2 max-md:pt-6 max-md:pb-6 ml-5 mr-5 max-sm:mr-2 max-sm:ml-2 z-10 relative top-10">
                <h2 className="text-5xl pt-3 max-lg:text-4xl leading-10 max-sm:text-lg font-bold pb-3">شرکت‌ها و سازمان‌ها برای چه مواردی نیاز به سفرهای سازمانی دارند؟</h2>
                <p className="text-sm">
                    بسیاری از شرکت‌ها و سازمان‌های بزرگ با اهداف مختلف به یک شریک تجاری معتمد برای انجام امور مربوط به خدمات گردشگری نیاز دارند. این سفرها ممکن است به صورت مأموریت‌های کاری، هدایای مناسبتی و یا بن تخفیف مناسبتی برای کارکنان، برگزاری سفرهای گروهی با اهداف کاری و تفریحی و... باشد.
                </p>
                <p className="text-sm">
                شرکت خدمات هوایی و گردشگری سفرانه با سال‌ها تجربه در زمینه ارائه پکیج‌های مختلف سازمانی آماده خدمات‌رسانی به کلیه به بزرگ‌ترین شرکت‌ها و سازمان‌ها است.
                </p>
                {
                    sitename && logo &&
                        <Image src={logo} height={40} width={100} className="w-32" alt={sitename} />
                }
                <p className="font-bold">سفرانه مشرق زمین</p>
            </div>
            <Image src={alley} alt="سفرانه مشرق زمین" width={400} height={100} className="w-full object-cover z-0 max-sm:h-72" priority={true}
            onContextMenu={e => e.preventDefault()}/>
        </div>
    )
}

export default Section2;