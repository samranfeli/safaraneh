import Button from "@/modules/shared/components/ui/Button";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";

const notFound: NextPage = () => {

    return (
        <>
            <Head>
                <title> خطای ۴۰۴ </title>
            </Head>
            <div className="max-w-container m-auto px-5 max-sm:px-3">
                <div className="flex flex-col items-center justify-center py-10 md:pt-15 md:pb-40 h-screen">
                    <Image
                        src="/images/passenger.png"
                        width={160}
                        height={320}
                        alt="passenger"
                        className="mb-6 max-sm:h-40 max-sm:w-auto"
                    />
                    <div className="font-semibold mb-3 text-lg md:text-2xl" > خطای ۴۰۴</div>
                    <p className="text-neutral-500 mb-8 text-sm">
                        ظاهراً در کوچه پس‌کوچه‌های شهر گم شده‌اید، ما شما را به نزدیک‌ترین هتل
                        راهنمایی می‌کنیم :)
                    </p>
                    <div className="inline-flex justify-center flex-wrap gap-5">
                        <Button
                        className="px-5 h-8 text-sm"
                            href="/"
                            >
                            برو به صفحه اصلی
                        </Button>
                        <Button
                        className="px-5 h-8 text-sm"
                            href="/hotel/هتل-پارسیان-آزادی-تهران"
                        >
                            برو به نزدیک‌ترین هتل
                        </Button>
                        <Button
                        className="px-5 h-8 text-sm"
                            href="/blog"
                        >
                            برو به یک جای هیجان انگیز
                        </Button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default notFound;

export async function getStaticProps(context: any) {
    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common']),
            },

        }
    )

}