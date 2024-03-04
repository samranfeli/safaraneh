import { getAirportByUrl } from "@/modules/cip/actions";
import CipDetailGallery from "@/modules/cip/components/cip-detail/CipDetailGallery";
import CipName from "@/modules/cip/components/cip-detail/CipName";
import { CipGetAirportByUrlResponseType } from "@/modules/cip/types/cip";
import AnchorTabs from "@/modules/shared/components/ui/AnchorTabs";
import Button from "@/modules/shared/components/ui/Button";
import FormikField from "@/modules/shared/components/ui/FormikField";
import Steps from "@/modules/shared/components/ui/Steps";
import { RightCaret } from "@/modules/shared/components/ui/icons";
import { validateRequied } from "@/modules/shared/helpers/validation";
//import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import DatePicker from "@/modules/shared/components/ui/DatePicker";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

const CipDetails: NextPage = ({ airportData }: { airportData?: CipGetAirportByUrlResponseType }) => {

    const { t } = useTranslation('common');
    const { t: tCip } = useTranslation('cip');

    if (airportData) {
        debugger;
    }
    let airportLocation: [number, number] | undefined = undefined;
    if (airportData?.latitude && airportData?.longitude) {
        airportLocation = [+(airportData.latitude.replace("/", ".")), +(airportData.longitude.replace("/", "."))]
    }

    const submitHandler = async (values: any) => {
        debugger;
    }

    return (
        <div className="max-w-container m-auto">
            <div className="pt-5 px-5 max-md:px-3" id="pictures_section">
                <div className="p-3 bg-white flex justify-between items-center">
                    <Link
                        href="/cip-home"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        <RightCaret className="w-6 h-6 fill-current inline-block ltr:rotate-180" />
                        مشاهده فرودگاه های دیگر
                    </Link>
                    <div className="text-sm font-semibold hidden sm:block">
                        شماره تلفن رزرو :
                        <a href="tel:+982126150051" className="rtl:mr-1 ltr:ml-1"> 02126150051 </a>
                    </div>

                </div>

                {!!airportData && <CipDetailGallery items={airportData?.galleries} />}
            </div>

            <AnchorTabs
                items={[
                    { id: "pictures_section", title: tCip('pictures') },
                    { id: "about-travel-section", title: "اطلاعات سفر" },
                    { id: "reserver_passengers_section", title: "مشخصات رزروگیرنده و مسافران" },
                    { id: "extra_services_section", title: "سرویس های مازاد" },
                    { id: "about_section", title: "درباره فرودگاه" },
                    { id: "facilities_section", title: "امکانات فرودگاه" }
                ]}
            />
            <div className="px-5 max-md:px-3">

                <CipName address={airportData?.address} name={airportData?.name} location={airportLocation} />

                <Steps
                    className="my-6 md:my-10"
                    items={[
                        { label: "تکمیل اطلاعات", status: "active" },
                        { label: "صفحه درگاه بانک", status: "up-comming" },
                        { label: "تایید و پرداخت", status: "up-comming" },
                        { label: "تکمیل خرید", status: "up-comming" }
                    ]}
                />
            </div>

            <div
                id="about-travel-section"
            >
                <Formik
                    validate={() => { return {} }}
                    initialValues={{ originName: "", destinationName: "", airline: "", flightNumber: "", flightDate:"" }}
                    onSubmit={submitHandler}
                >
                    {({ errors, touched, setFieldValue, values }) => {
                        return (

                            <Form className='px-5' autoComplete='off' >

                                <div className="bg-white rounded-lg p-5 sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 border border-neutral-300">
                                    <strong className="font-semibold text-base block sm:col-span-2 md:col-span-4 "> اطلاعات سفر </strong>

                                    <FormikField
                                        setFieldValue={setFieldValue}
                                        errorText={errors.originName as string}
                                        id='originName'
                                        name='originName'
                                        isTouched={!!touched.originName}
                                        label="مبدا"
                                        validateFunction={(value: string) => validateRequied(value, "لطفا مبدا را وارد نمایید")}
                                        onChange={(value: string) => { setFieldValue('originName', value, true) }}
                                        value={values.originName}
                                    />

                                    <FormikField
                                        setFieldValue={setFieldValue}
                                        errorText={errors.destinationName as string}
                                        id='destinationName'
                                        name='destinationName'
                                        isTouched={touched.destinationName}
                                        label="مقصد"
                                        validateFunction={(value: string) => validateRequied(value, "لطفا مقصد را وارد نمایید")}
                                        onChange={(value: string) => { setFieldValue('destinationName', value, true) }}
                                        value={values.destinationName}
                                    />

                                    <FormikField
                                        setFieldValue={setFieldValue}
                                        errorText={errors.airline as string}
                                        id='airline'
                                        name='airline'
                                        isTouched={touched.airline}
                                        label="شرکت هواپیمایی"
                                        validateFunction={(value: string) => validateRequied(value, "لطفا شرکت هواپیمایی را وارد نمایید")}
                                        onChange={(value: string) => { setFieldValue('airline', value, true) }}
                                        value={values.airline}
                                    />


                                    <FormikField
                                        setFieldValue={setFieldValue}
                                        errorText={errors.flightNumber as string}
                                        id='flightNumber'
                                        name='flightNumber'
                                        isTouched={touched.flightNumber}
                                        label="شماره پرواز"
                                        validateFunction={(value: string) => validateRequied(value, "لطفا شماره پرواز را وارد نمایید")}
                                        onChange={(value: string) => { setFieldValue('flightNumber', value, true) }}
                                        value={values.flightNumber}
                                    />

                                    <DatePicker
                                        setFieldValue={setFieldValue}
                                        label="تاریخ پرواز"
                                        errorText={errors.flightDate as string}
                                        isTouched={touched.flightDate}
                                        fieldClassName="pt-1 text-base"
                                        name="flightDate"
                                        id="flightDate"
                                        //initialvalue="2024-03-05"
                                        validateFunction={(value: string) => validateRequied(value, "لطفا تاریخ پرواز را وارد نمایید")}
                                    />



                                </div>



                                <Button
                                    type="submit"
                                    className="h-12 px-5 dm:w-40 mt-10"
                                >
                                    ادامه فرایند خرید

                                </Button>

                            </Form>
                        )
                    }}
                </Formik>



            </div>



        </div>
    )
}

export default CipDetails;



export async function getStaticPaths() {
    return {
        paths: [{
            params: { CipDetail: "فرودگاه-بین-المللی-امام-خمینی-Cip-خدمات" }
        }],
        fallback: true,
    };
}

export async function getStaticProps(context: any) {

    const { locale, params } = context;

    const url = 'fa/cip/' + params?.CipDetail;

    const airportData: any = await getAirportByUrl(url, locale === "fa" ? "fa-IR" : "en-US");

    return (
        {
            props: {
                ...await serverSideTranslations(context.locale, ['common', 'cip']),
                airportData: airportData?.data?.result || null
            },

        }
    )

}