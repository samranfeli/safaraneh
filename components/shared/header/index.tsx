import Image from "next/image";
import Link from "next/link";
import TravelServices from "./travelServices";
import Language from "./Language";

export default function Header() {
    return (
        <header className="bg-white">

            <div className="max-w-container mx-auto px-3 py-3 flex justify-center md:justify-between relative">
                <div className="flex gap-8 items-center">
                    <Link href="/" className="block">
                        <img src='/images/logofa.png' width={115} height={48} alt="سفرانه" />
                    </Link>
                    <TravelServices />
                </div>

                <div className="gap-4 items-center hidden md:flex">
                    <Language />

                    <button type="button" className="text-sm text-blue-700 hover:text-blue-500" >
                        پیگیری رزرو
                    </button>
                    
                    <button type="button" className="text-sm text-blue-700 hover:text-blue-500" >
                        ورود یا ثبت نام
                    </button>
                </div>

            </div>

        </header>
    )
}