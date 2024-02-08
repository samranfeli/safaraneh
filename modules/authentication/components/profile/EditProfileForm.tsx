import Button from "@/modules/shared/components/ui/Button";
import FormikField from "@/modules/shared/components/ui/FormikField";
import { validateNationalId, validateRequiedPersianAndEnglish } from "@/modules/shared/helpers/validation";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "next-i18next";

const EditProfileForm = () => {

    const { t } = useTranslation('common');

    const initialValues = {
        gender: true,
        firstname: "",
        lastname: "",
        timezone: "",
        nationalId: "",
        birthDay: "",
        nationalityId: "",
        isNewsLetter: false
    }

    const submitHandler = async (params: any) => {

        // setSubmitLoading(true);

        // const reserveResponse: any = await domesticHotelPreReserve(params);

        // if (reserveResponse.data && reserveResponse.data.result) {
        //   const id = reserveResponse.data.result.id;
        //   const username = reserveResponse.data.result.username;

        //   if (discountData?.isValid && promoCode) {
        //     await registerDiscountCode({ discountPromoCode: promoCode , reserveId: id.toString(), username: username });
        //   }

        //   if (reserveResponse.data.result.rooms.every((x: any) => x.availablityType === "Online")) {
        //     router.push(`/payment?reserveId=${id}&username=${username}`);
        //   } else {
        //     router.push(`/hotel/capacity?reserveId=${id}&username=${username}`);
        //   }

        // } else {

        //   dispatch(setReduxError({
        //     title: tHotel('error-in-reserve-room'),
        //     message: tHotel('sorry-room-is-full'),
        //     isVisible: true,
        //     closeErrorLink: backUrl || "/",
        //     closeButtonText: backUrl ? tHotel('choose-room') : t("home")
        //   }));

        // }
    }

    return (

        <>
            <h5 className='text-base mb-5'>
                اطلاعات کاربری
            </h5>

            <Formik
                validate={() => { return {} }}
                initialValues={initialValues}
                onSubmit={submitHandler}
            >
                {({ errors, touched, isValid, isSubmitting, setFieldValue, values }) => {
                    if (isSubmitting && !isValid) {
                        setTimeout(() => {
                            const formFirstError = document.querySelector(".has-validation-error");
                            if (formFirstError) {
                                formFirstError.scrollIntoView({ behavior: "smooth" });
                            }
                        }, 100)
                    }
                    return (
                        <Form autoComplete='off' >

                            <div role="group" >
                                <label className='block text-xs mb-1' > جنسیت </label>
                                <label className='inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4'>
                                    <Field
                                        type="radio"
                                        className="text-xs"
                                        onChange={(e: any) => {
                                            const val = e.target.checked;
                                            setFieldValue('gender', val);
                                        }}
                                        checked={values.gender}
                                    />
                                    مرد
                                </label>
                                <label className='inline-flex items-center gap-1'>
                                    <Field
                                        type="radio"
                                        className="text-xs"
                                        onChange={(e: any) => {
                                            const val = !e.target.checked;
                                            setFieldValue('gender', val);
                                        }}
                                        checked={!values.gender}
                                    />
                                    زن
                                </label>
                            </div>

                            <div className="sm:grid sm:grid-cols-2 gap-4">

                                <FormikField
                                    labelIsSimple
                                    showRequiredStar
                                    setFieldValue={setFieldValue}
                                    errorText={errors.firstname as string}
                                    id='firstname'
                                    name='firstname'
                                    isTouched={touched.firstname}
                                    label={t('first-name')}
                                    validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-first-name'), t('just-english-persian-letter-and-space'))}
                                    onChange={(value: string) => { setFieldValue('firstname', value, true) }}
                                    value={values.firstname}
                                />

                                <FormikField
                                    labelIsSimple
                                    showRequiredStar
                                    setFieldValue={setFieldValue}
                                    errorText={errors.lastname as string}
                                    id='lastname'
                                    name='lastname'
                                    isTouched={touched.lastname}
                                    label={t('first-name')}
                                    validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-first-name'), t('just-english-persian-letter-and-space'))}
                                    onChange={(value: string) => { setFieldValue('lastname', value, true) }}
                                    value={values.lastname}
                                />

                                <FormikField
                                    labelIsSimple
                                    setFieldValue={setFieldValue}
                                    errorText={errors.nationalId as string}
                                    id='nationalId'
                                    name='nationalId'
                                    isTouched={touched.nationalId}
                                    label={t('national-code')}
                                    maxLength={10}
                                    validateFunction={(value: string) => validateNationalId({ value: value, invalidMessage: t('invalid-national-code') })}
                                    value={values.nationalId}
                                    onChange={(value: string) => { setFieldValue('nationalId', value, true) }}
                                />

                                <div>
                                    تاریخ تولد...
                                </div>
                            </div>



                            <p> در خبرنامه ما ثبت نام کنید </p>
                            <input type="checkbox" />


                            <Button
                                type="submit"
                                className="h-10 px-8 rounded"
                            >
                                ذخیره
                            </Button>

                            <hr className="my-5" />

                            اطلاعات تماس





                        </Form>
                    )
                }}
            </Formik>
        </>

    )
}

export default EditProfileForm;