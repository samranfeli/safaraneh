import Button from "@/modules/shared/components/ui/Button";
import FormikField from "@/modules/shared/components/ui/FormikField";
import { validateEmail } from "@/modules/shared/helpers/validation";
import { useAppDispatch, useAppSelector } from "@/modules/shared/hooks/use-store";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { updateProfileEmail } from "../../actions";
import { useState } from "react";
import { setReduxNotification } from "@/modules/shared/store/notificationSlice";

const EmailActivationForm = () => {

    const { t } = useTranslation('common');

    const dispatch = useAppDispatch();

    const userAuthentication = useAppSelector(state => state.authentication);
    const user = userAuthentication.user;

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    let initialValues = {
        emailAddress: "",
    }

    if (userAuthentication?.isAuthenticated) {
        initialValues = {
            emailAddress: user.emailAddress || ""
        }
    }

    const submitHandler = async (params: any) => {

        const token = localStorage.getItem('Token');
        if (!token) return;

        setSubmitLoading(true);

        dispatch(setReduxNotification({
            status: '',
            message: "",
            isVisible: false
        }));

        const updateResponse: any = await updateProfileEmail(params, token);

        setSubmitLoading(false);

        if (updateResponse.data && updateResponse.data.success) {

            dispatch(setReduxNotification({
                status: 'success',
                message: "اطلاعات با موفقیت ارسال شد",
                isVisible: true
            }));

        } else {

            let message = "";

            if (updateResponse?.response?.data?.error?.message) {

                message = updateResponse.response.data.error.message;
            }
            dispatch(setReduxNotification({
                status: 'error',
                message: message,
                isVisible: true
            }));

        }
    }

    return (

        <>

            {!!userAuthentication?.isAuthenticated && <Formik
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


                            <div className="sm:grid sm:grid-cols-2 gap-4 mb-5">
                                <FormikField
                                    labelIsSimple
                                    showRequiredStar
                                    className="mb-5 font-sans"
                                    setFieldValue={setFieldValue}
                                    errorText={errors.emailAddress as string}
                                    id='emailAddress'
                                    name='emailAddress'
                                    isTouched={touched.emailAddress}
                                    label={t('email')}
                                    validateFunction={(value: string) => validateEmail({ value: value, reqiredMessage: "ایمیل خود را وارد نمایید!", invalidMessage: t('invalid-email') })}
                                    value={values.emailAddress!}
                                />

                                <div>
                                    <Button
                                        type="submit"
                                        className="h-10 px-8 rounded w-auto mt-7"
                                        loading={submitLoading}
                                    >
                                        ذخیره
                                    </Button>
                                </div>

                            </div>

                        </Form>
                    )
                }}
            </Formik>}

        </>

    )
}

export default EmailActivationForm;