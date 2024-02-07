import { useState } from 'react'
import Button from "@/modules/shared/components/ui/Button";
import PhoneInput from "@/modules/shared/components/ui/PhoneInput";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import FormikField from '@/modules/shared/components/ui/FormikField';
import { validateEmail, validateRequied } from '@/modules/shared/helpers/validation';

const LognWithPassword = () => {

    const { t } = useTranslation('common');

    const [type, setType] = useState<"email" | "mobile">('email');

    const submitHandler = (values: {
        phoneNumber?: string;
        password: string;
        email?: string;
    }) => { debugger; }

    return (
        <>
            <div className='grid grid-cols-2 px-5 py-2'>
                <button
                    type='button'
                    className={`text-sm pb-2 border-b border-b-2 ${type === 'mobile' ? "border-neutral-200" : "border-red-600"}`}
                    onClick={() => { setType('email') }}
                >
                    آدرس ایمیل
                </button>
                <button
                    type='button'
                    className={`text-sm pb-2 border-b border-b-2 ${type === 'email' ? "border-neutral-200" : "border-red-600"}`}
                    onClick={() => { setType('mobile') }}
                >
                    شماره موبایل
                </button>

            </div>
            <Formik
                validate={() => { return {} }}
                initialValues={type === "email" ? { password: "", email: "" } : { password: "", phoneNumber: "" }}
                onSubmit={submitHandler}
            >
                {({ errors, touched, setFieldValue, values }) => {
                    return (

                        <Form className='p-5' autoComplete='off' >

                            {(type === "mobile" &&
                                <PhoneInput
                                    labelIsSimple
                                    showRequiredStar
                                    defaultCountry={
                                        {
                                            countryCode: "ir",
                                            dialCode: "98",
                                            format: "... ... ...."
                                        }
                                    }
                                    onChange={(v: string) => {
                                        //setError(false);
                                        setFieldValue('phoneNumber', v)
                                    }}
                                    name='phoneNumber'
                                    isTouched={touched.phoneNumber}
                                    label={t("phone-number") + " (بدون صفر)"}
                                    errorText={errors.phoneNumber}
                                    className="mb-5"
                                //initialValue='+989374755674'
                                />
                            )}

                            {(type === "email" &&

                                <FormikField
                                    labelIsSimple
                                    showRequiredStar
                                    className="mb-5"
                                    //onChange={() => { setError(false); }}
                                    setFieldValue={setFieldValue}
                                    errorText={errors.email as string}
                                    id='email'
                                    name='email'
                                    isTouched={touched.email}
                                    label={t('email')}
                                    validateFunction={(value: string) => validateEmail({ value: value, reqiredMessage: "ایمیل خود را وارد نمایید!", invalidMessage: t('invalid-email') })}
                                    value={values.email!}
                                />
                            )}

                            <FormikField
                                className="mb-5"
                                labelIsSimple
                                showRequiredStar
                                setFieldValue={setFieldValue}
                                //onChange={()=>{setError(false);}}
                                errorText={errors.password}
                                id='password'
                                name='password'
                                isTouched={touched.password}
                                label="کلمه عبور"
                                maxLength={10}
                                validateFunction={(value: string) => validateRequied(value, 'کلمه عبور را وارد نمایید!')}
                                value={values.password}
                            />

                            <Button
                                type="submit"
                                className="h-12 w-full"
                            //loading={loading}
                            >
                                {t("sign-in")}
                            </Button>

                            {/* {!!error && (
                                <div className="text-red-500 py-3 font-semibold text-center mt-5">
                                    متاسفانه رزروی با این مشخصات یافت نشد!
                                </div>
                            )} */}

                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default LognWithPassword;