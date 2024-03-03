import { useEffect, useState } from "react";
import Image from "next/image";

const FlightTollbar: React.FC = () => {

    const [OpenSide, setOpenSide] = useState<boolean>(false)
    
    useEffect(() => {
        if (OpenSide) {
            document.getElementById('main')?.setAttribute('style', 'z-index:50')
            document.body?.setAttribute('style', 'overflow: hidden')
        }
        else {
            document.getElementById('main')?.setAttribute('style', '')
            document.body?.setAttribute('style', '')
        }
    },[OpenSide])

    return (
        <>
            <div className={`w-1/4 max-lg:fixed max-lg:top-0 max-lg:-right-1 max-lg:overflow-y-auto p-4 divide-y-2 space-y-2 max-lg:w-2/5 max-md:w-3/5
            max-sm:w-10/12 max-lg:h-screen bg-white shadow-md rounded max-lg:rounded-none z-20 duration-300 max-lg:border-0
            ${OpenSide ? 'max-lg:translate-x-0' : 'max-lg:translate-x-full'}`}
            >
                <div>
                    <h3 className="font-semibold ">نتیجه جستجوی شما</h3>
                    <p className="text-2xs">2 پرواز پیدا شد</p>
                </div>
                <div className="space-y-4 pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-3">ایرلاین ها</h5>

                        <label htmlFor="a" className="flex justify-between">
                            <div className="flex">
                            <input type="checkbox" id="a" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1' />
                            <Image
                            src="https://cdn2.safaraneh.com/images/flights/ep.png"
                            alt="pic"
                            height={30} width={30} className="w-6 ml-2 mr-2"/>
                            <p className="text-xs">آسمان</p>
                            </div>
                            <p className="text-gray-500 text-2xs font-semibold">ظرفیت تکمیل است</p>
                        </label>
                    
                        <label htmlFor="b" className="flex justify-between">
                            <div className="flex">
                            <input type="checkbox" id="b" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1' />
                            <Image
                            src="https://cdn2.safaraneh.com/images/flights/nv.png"
                            alt="pic"
                            height={30} width={30} className="w-6 ml-2 mr-2"/>
                            <p className="text-xs">آسمان</p>
                            </div>
                            <p className="text-xs text-left font-semibold">از 25.000.000 ریال</p>
                        </label>
                    </div>
                <div className="text-xs pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-3">زمان پرواز</h5>
                    <div className="flex gap-2">
                        <input type="checkbox" id="1" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1'/>
                        <label htmlFor="1" className="w-full inline-block">قبل از 6:00 صبح</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="2" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1'/>
                        <label htmlFor="2" className="w-full inline-block">6:00 صبح تا 11:59 ظهر</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="3" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1'/>
                        <label htmlFor="3" className="w-full inline-block">6:00 صبح تا 11:59 ظهر</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="4" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1'/>
                        <label htmlFor="4" className="w-full inline-block">6:00 صبح تا 11:59 ظهر</label>
                    </div>
                </div>

                <div className="pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-3">مبلغ</h5>
                    <input type="range" className="w-full" />
                </div>

                <div className="text-sm pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-3">نوع بلیط</h5>
                    <div className="flex gap-2">
                        <input type="checkbox" id="q3" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1'/>
                        <label htmlFor="q3" className="w-full">سیستمی</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="q4" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1'/>
                        <label htmlFor="q4" className="w-full">اکونومی</label>
                    </div>
                </div>

                <div className="text-sm pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-3">نوع کابین</h5>
                    <div className="flex gap-2">
                        <input type="checkbox" id="e3" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1'/>
                        <label htmlFor="e3" className="w-full">اکونومی (2)</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="w4" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1'/>
                        <label htmlFor="w4" className="w-full">بیزنس (0)</label>
                    </div>
                </div>
                </div>
 
            <div className={`bg-black/75 z-10 fixed top-0 left-0 backdrop-blur contrast-100 ${!OpenSide ? 'hidden' : 'max-lg:w-full h-full'}`}
                onClick={e => setOpenSide(prevState => !prevState)}>
            </div>

            <button
                className={`bg-blue-600 p-2 pl-4 pr-4 rounded-xl z-10 hidden text-white fixed bottom-4 left-1/2 ${OpenSide ? 'hidden' : 'max-lg:inline-block'}`}
                type="submit"
                onClick={e => setOpenSide(prevState => !prevState)}>
                فیلتر
            </button>
            </>
    )
}

export default FlightTollbar;