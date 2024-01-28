import { useTranslation } from "next-i18next";
import { useState, useEffect } from 'react';

import ModalPortal from "../ui/ModalPortal";
import { useAppDispatch } from "../../hooks/use-store";
import { setBodyScrollable } from "../../store/stylesSlice";
import { Close } from "../ui/icons";
import { Form, Formik } from "formik";
import PhoneInput from "../ui/PhoneInput";
import FormikField from "../ui/FormikField";
import { validateEmail, validateRequied } from "../../helpers/validation";
import Button from "../ui/Button";
import { useRouter } from "next/router";
import { getReserveFromCoordinator } from "../../actions";

const TrackOrder: React.FC = () => {

    const { t } = useTranslation('common');

    const dispatch = useAppDispatch();

    const router = useRouter();

    const [type, setType] = useState<"email" | "mobile">('mobile');

    const [open, setOpen] = useState<boolean>(false);

    const [delayedOpen, setDelayedOpen] = useState<boolean>(false);

    useEffect(() => {

        if (open) {
            dispatch(setBodyScrollable(false));
        } else {
            dispatch(setBodyScrollable(true));
        }

        return (() => {
            dispatch(setBodyScrollable(true));
        })
    }, [open]);

    useEffect(() => {
        let timeOut: any;
        if (open) {
            timeOut = setTimeout(() => { setDelayedOpen(true) }, 50);
        }

        return (() => { setDelayedOpen(false); clearTimeout(timeOut); })
    }, [open]);

    useEffect(() => {
        let timeOut: any;
        if (!delayedOpen) {
            timeOut = setTimeout(() => { setOpen(false) }, 100);
        }

        return (() => { clearTimeout(timeOut); })
    }, [delayedOpen]);

    const submitHandler = async (values: {
        reserveId: string;
        email: string;
        phoneNumber?: undefined;
    } | {
        reserveId: string;
        phoneNumber: string;
        email?: undefined;
    }) => {

        const userName = values.phoneNumber || values.email || "";

        const reserveResponse: any = await getReserveFromCoordinator({username:userName , reserveId: values.reserveId});

        if (reserveResponse?.data?.result?.type){
            if (reserveResponse.data.result.type==="HotelDomestic"){
                setOpen(false);
                router.push(`/myaccount/booking/hotel?username=${userName}&reserveId=${values.reserveId}`);
            }
        }else{
            debugger;
        }
    }

    return (
        <>
            <button
                onClick={() => { setOpen(true) }}
                type="button"
                aria-label={t('retrieve-my-booking')}
                className="h-12 text-sm text-blue-700 hover:text-blue-500 ltr:float-right rtl:float-left rtl:ml-5 ltr:mr-5 hidden md:block"
            >
                {t('retrieve-my-booking')}
            </button>


            <ModalPortal
                selector='modal_portal'
                show={open}
                children={<div className="fixed w-screen h-screen ovelflow-auto bg-black/75 backdrop-blur top-0 left-0 flex items-center justify-center">

                    <div
                        className="absolute left-0 right-0 bottom-0 top-0"
                        onClick={() => { setDelayedOpen(false) }}
                    />

                    <div className={`bg-white sm:rounded-md relative w-full sm:w-520 transition-all ${delayedOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                        <div className="border-b border-neutral-300 p-4 flex items-center justify-between font-semibold">
                            {t('retrieve-my-booking')}
                            <button
                                type="button"
                                className="outline-none"
                                onClick={() => { setDelayedOpen(false) }}
                            >
                                <Close className="w-7 h-7 fill-current" />
                            </button>
                        </div>

                        <div className="p-4 flex gap-5 items-center">
                            <div className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    id="mobile-radio"
                                    value="mobile"
                                    onChange={e => { if (e.target.checked) { setType("mobile") } }}
                                    checked={type === "mobile"}
                                    className="cursor-pointer"
                                />

                                <label htmlFor="mobile-radio" className="cursor-pointer"> موبایل </label>
                            </div>
                            <div className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    id="email-radio"
                                    value="email"
                                    onChange={e => { if (e.target.checked) { setType("email") } }}
                                    checked={type === "email"}
                                    className="cursor-pointer"
                                />

                                <label htmlFor="email-radio" className="cursor-pointer"> ایمیل </label>
                            </div>

                        </div>

                        <Formik
                            validate={() => { return {} }}
                            initialValues={type === "email" ? { reserveId: "", email: "" } : { reserveId: "", phoneNumber: "" }}
                            onSubmit={submitHandler}
                        >
                            {({ errors, touched, setFieldValue, values }) => {
                                return (

                                    <Form className='p-8' autoComplete='off' >

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
                                            errorText={errors.reserveId}
                                            id='reserveId'
                                            name='reserveId'
                                            isTouched={touched.reserveId}
                                            label={t('tracking-code')}
                                            maxLength={10}
                                            validateFunction={(value: string) => validateRequied(value, 'کد پیگیری را وارد نمایید!')}
                                            value={values.reserveId}
                                        />

                                        <Button
                                            type="submit"
                                            className="h-12 w-full"
                                        >
                                            ادامه
                                        </Button>

                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>}
            />
        </>
    )
}

export default TrackOrder;