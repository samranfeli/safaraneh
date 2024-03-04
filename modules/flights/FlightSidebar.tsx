import { useEffect, useState } from "react";
import Image from "next/image";
import Checkbox from "../shared/components/ui/Checkbox";
import Select from "../shared/components/ui/Select";

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
            max-sm:w-10/12 max-lg:h-screen bg-white border-1 border-gray-200 rounded max-lg:rounded-none z-20 duration-300 max-lg:border-0
            ${OpenSide ? 'max-lg:translate-x-0' : 'max-lg:translate-x-full'}`}
            >
                <div>
                    <h3 className="font-semibold ">نتیجه جستجوی شما</h3>
                    <p className="text-2xs">2 پرواز پیدا شد</p>
                </div>
                <div className="pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-2">ایرلاین ها</h5>
                           
                    
                            <Checkbox
                            label={(<div className="flex w-full justify-between">
                                <div className="flex gap-1">
                                    <Image
                                        src="https://cdn2.safaraneh.com/images/flights/ep.png"
                                        alt="pic"
                                        height={30} width={30} className="w-6 h-6"/>
                                    <p className="text-xs">آسمان</p>
                                </div>
                                    <p className="text-2xs text-left font-semibold text-gray-500">قیمت موجود نیست</p>
                                </div>)}
                                onChange={c => null}
                                value=""
                            />    
                    
                            <Checkbox
                            label={(<div className="flex w-full justify-between">
                                <div className="flex gap-1">
                                    <Image
                                        src="https://cdn2.safaraneh.com/images/flights/nv.png"
                                        alt="pic"
                                        height={30} width={30} className="w-6 h-6"/>
                                    <p className="text-xs">آسمان</p>
                                </div>
                                    <p className="text-2xs text-left font-semibold">از 25.000.000 ریال</p>
                                </div>)}
                                onChange={c => null}
                                value=""
                            />

                            </div>
                            
                        
                <div className="text-xs pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-2">زمان پرواز</h5>
                    <Checkbox
                        label={<p className="text-xs">قبل از ۶:۰۰ صبح</p>}
                        onChange={c => null}
                        value=""
                        />
                    <Checkbox
                        label={<p className="text-xs">۶:۰۰ صبح تا ۱۱:۵۹ ظهر</p>}
                        onChange={c => null}
                        value=""
                        />
                    <Checkbox
                        label={<p className="text-xs">۱۲:۰۰ ظهر تا ۱۸:۰۰ بعد از ظهر</p>}
                        onChange={c => null}
                        value=""
                        />
                    <Checkbox
                        label={<p className="text-xs">بعد از ۱۸:۰۰ بعد از ظهر</p>}
                        onChange={c => null}
                        value=""
                        />
                </div>

                <div className="pt-2 pb-2 space-y-3">
                    <h5 className="text-sm font-semibold mb-2">مبلغ</h5>
                        <Select value="l" onChange={e => null}
                        items={[{ label: "10,000,000ریال", value: '' }]}
                        placeholder="حداقل"
                        className="h-fit p-2"
                        />
                    <Select value="l"
                        onChange={e => null}
                        items={[{ label: "30,000,000ریال", value: '' }]}
                        placeholder="حداکثر"
                        className="h-fit p-2" />
                </div>

                <div className="text-sm pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-2">نوع بلیط</h5>
                    <Checkbox
                        label={<p className="text-xs">سیستمی</p>}
                        onChange={c => null}
                        value=""
                        />
                    <Checkbox
                        label={<p className="text-xs">چارتری</p>}
                        onChange={c => null}
                        value=""
                        />
                </div>

                <div className="text-sm pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-2">نوع کابین</h5>
                    <Checkbox
                        label={<p className="text-xs">اکونومی (2)</p>}
                        onChange={c => null}
                        value=""
                        />
                    
                        <Checkbox
                        label={<p>بیزنس (0)</p>}
                        onChange={c => null}
                        value=""
                        />
                </div>
                </div>
 
            <div className={`bg-black/75 z-10 fixed top-0 left-0 backdrop-blur contrast-100 ${!OpenSide ? 'hidden' : 'max-lg:w-full h-full'}`}
                onClick={e => setOpenSide(prevState => !prevState)}>
            </div>

            <button
                className={`bg-blue-600 p-2 pl-4 pr-4 rounded-xl z-10 hidden text-white fixed bottom-4 left-1/2 -translate-x-1/2
                ${OpenSide ? 'hidden' : 'max-lg:inline-block'}`}
                type="submit"
                onClick={e => setOpenSide(prevState => !prevState)}>
                فیلتر
            </button>
               
            </>
    )
}

export default FlightTollbar;