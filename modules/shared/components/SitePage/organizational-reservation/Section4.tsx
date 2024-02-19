import { NextPage } from "next";
import phonepic from '../../../../../public/images/organizational-reservation/Phone.jpg';
import conferancepic from '../../../../../public/images/organizational-reservation/conference.jpg';
import Image from "next/image";

const Section4: NextPage = () => {
    return (
        <div className="grid grid-cols-2 max-lg:grid-cols-1 mt-10">
            <Image src={phonepic} alt="خدمات ویژه سفرانه" width={400} height={150}
                onContextMenu={e => e.preventDefault() } className="w-full h-full max-lg:h-80 max-md:h-full object-cover" />
            <div className="bg-blue-900 p-18 max-sm:p-10 ">
                <h2 className="text-4xl text-white mb-12 font-bold">
                    خدمات ویژه سفرانه
                </h2>
                <ul className="select-none">
                    
                    <li className="bg-white p-3 max-sm:p-2 mb-5 text-gray-500 relative ">
                    <span className="w-12 h-full bg-orange-500 absolute bottom-0 right-0"></span>
                        <p className="mr-12">ارائه تخفیف مازاد به شرکت ها و آژانس‌ها</p>
                    </li>
                    <li className="bg-white p-3 max-sm:p-2 mb-5 text-gray-500 relative ">
                    <span className="w-12 h-full bg-orange-500 absolute bottom-0 right-0"></span>
                        <p className="mr-12">تضمین کمترین قیمت</p>
                    </li>
                    <li className="bg-white p-3 max-sm:p-2 mb-5 text-gray-500 relative ">
                    <span className="w-12 h-full bg-orange-500 absolute bottom-0 right-0"></span>
                        <p className="mr-12">تنوع در راه‌های پرداخت</p>
                    </li>
                    <li className="bg-white p-3 max-sm:p-2 mb-5 text-gray-500 relative ">
                    <span className="w-12 h-full bg-orange-500 absolute bottom-0 right-0"></span>
                        <p className="mr-12">امکان رزرو به صورت تقبل کلیه هزینه‌ها</p>
                    </li>
                </ul>
            </div>
            <div className="bg-blue-900 p-18 max-sm:p-10 ">
                <h2 className="text-4xl text-white mb-12 font-bold">
                مزایای رزرو شرکتی در سفرانه
                </h2>
                <ul className="select-none">
                <li className="bg-white p-3 max-sm:p-2 mb-5 text-gray-500 relative ">
                    <span className="w-12 h-full bg-orange-500 absolute bottom-0 right-0"></span>
                        <p className="mr-12">ارائه فاکتور رسمی</p>
                    </li>
                    <li className="bg-white p-3 max-sm:p-2 mb-5 text-gray-500 relative ">
                    <span className="w-12 h-full bg-orange-500 absolute bottom-0 right-0"></span>
                        <p className="mr-12">پشتیبانی اختصاصی برای شرکت‌ها در تمامی روزهای هفته</p>
                    </li>
                    <li className="bg-white p-3 max-sm:p-2 mb-5 text-gray-500 relative ">
                    <span className="w-12 h-full bg-orange-500 absolute bottom-0 right-0"></span>
                        <p className="mr-12">برگزاری همایش و رزرو سالن با حداقل قیمت</p>
                    </li>
                    <li className="bg-white p-3 max-sm:p-2 mb-5 text-gray-500 relative ">
                    <span className="w-12 h-full bg-orange-500 absolute bottom-0 right-0"></span>
                        <p className="mr-12">طراحی و اجرای تورهای اختصاصی پرسنلی و مأموریتی</p>
                    </li>
                </ul>
            </div>
            <Image src={conferancepic} alt="خدمات ویژه سفرانه" width={400} height={150}
                onContextMenu={e => e.preventDefault() } className="w-full h-full max-lg:h-80 max-md:h-full object-cover" />
        </div>
    )
}

export default Section4;