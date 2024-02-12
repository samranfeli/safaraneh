import BreadCrumpt from "@/modules/blogs/components/template/BreadCrumpt";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Map from '../../modules/Footer/ContactMap';
import instagram from '../../public/images/footer/Instagram.svg';
import twitter from '../../public/images/footer/Twitter.svg';
import linkden from '../../public/images/footer/Linkedin.svg';
import facebook from '../../public/images/footer/Facebook.svg';
import Image from "next/image";

const contact: NextPage = () => {
    return (
        <>
            <BreadCrumpt page="تماس با ما" />
            <div className="max-w-container m-auto p-5 max-sm:p-2 mt-5">
            <h2 className="text-3xl font-bold">تماس با ما</h2>
                <div className="pl-5 pr-5 pt-10 pb-10 border-2 border-gray mt-7 rounded-md bg-white grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                    <div className="space-y-3">
                        <h5 className="text-xl font-semibold">با ما در ارتباط باشید</h5>
                        <address className="not-italic flex gap-2">
                            <b>آدرس</b>:
                            <p className="text-sm">پاسداران شمالی، پایین‌تر از سه‌راه اقدسیه، مجتمع صاحبقرانیه، پلاک 565، واحد 7</p>
                        </address>
                        <div className="flex gap-2">
                            <b>تلفن</b>:
                            <Link href={`tel:+982126150051`} className="font-semibold text-lg">02126150051</Link>
                        </div>
                        <div className="flex gap-2">
                            <b>فکس</b>:
                            <Link href={`tel:+982126150054`} className="font-semibold text-lg">2126150054 98+</Link>
                        </div>
                        <div className="flex gap-2">
                            <b>ایمیل</b>:
                            <Link href={`mailto:info@safaraneh.com`} className="font-semibold">info@safaraneh.com</Link>
                        </div>
                        <div className="flex gap-2">
                            <b>کد پستی</b>:
                            <b className="font-semibold text-lg">1957644595</b>
                        </div>

                        <h5 className="text-2xl pt-5 font-semibold">ما را در شبکه اجتماعی دنبال کنید</h5>
                        <div className="flex max-lg:pt-5 max-lg:pb-10 gap-4">
                            <Link href="https://www.instagram.com/safaraneh_com/">
                                <Image src={instagram} alt='instagram' width={30} height={30} />
                            </Link> 
                            <Link href="https://twitter.com/safaraneh">
                                <Image src={twitter} alt='instagram' width={30} height={30} />
                            </Link>
                            <Link href="https://www.linkedin.com/company/safaraneh/">
                                <Image src={linkden} alt='instagram' width={30} height={30} />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-xl font-semibold">آدرس ما بر روی نقشه</h5>
                        <Map />
                    </div>
                </div>
            </div>
        </>
    )
}

export default contact;


export async function  getStaticProps (context: any)  {
    return (
        {
            props: {
                ...await (serverSideTranslations(context.locale, ['common'])),
            },

        }
    )

}