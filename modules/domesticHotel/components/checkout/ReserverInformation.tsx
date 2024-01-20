import FormikField from "@/modules/shared/components/ui/FormikField";
import PhoneInput from "@/modules/shared/components/ui/PhoneInput";
import { validateEmail, validateNationalId, validateRequiedPersianAndEnglish } from "@/modules/shared/helpers/validation";
import { Field, FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "next-i18next";

type Props = {
    errors: FormikErrors<{
        reserver: {
            gender: string;
            firstName: string;
            lastName: string;
            email: string;
            nationalId: string;
            phoneNumber: string;
        };
    }>;
    touched: FormikTouched<{
        reserver: {
            gender: string;
            firstName: string;
            lastName: string;
            email: string;
            nationalId: string;
            phoneNumber: string;
        };
    }>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{
        reserver: {
            gender: string;
            firstName: string;
            lastName: string;
            email: string;
            nationalId: string;
            phoneNumber: string;
        };
    }>>
}

const ReserverInformation: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { errors, touched, setFieldValue } = props;

    return (
        <>
            <h4 className='md:col-span-3 font-semibold mb-2 text-lg'>
                {t('reserver-information')}
            </h4>

            <div role="group" aria-labelledby="my-radio-group">
                <label className='block leading-4 text-xs' > جنسیت </label>
                <label className='inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4'>
                    <Field type="radio" name="reserver.gender" value="male" className="text-xs" />
                    مرد
                </label>
                <label className='inline-flex items-center gap-1'>
                    <Field type="radio" name="reserver.gender" value="female" className="text-xs" />
                    زن
                </label>
            </div>

            <FormikField
                errorText={errors.reserver?.firstName as string}
                id='firstName'
                name='reserver.firstName'
                isTouched={touched.reserver?.firstName}
                label={t('first-name')}
                validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-first-name'), t('just-english-persian-letter-and-space'))}
            />

            <FormikField
                errorText={errors.reserver?.lastName as string}
                id='lastName'
                name='reserver.lastName'
                isTouched={touched.reserver?.lastName}
                label={t('last-name')}
                validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-last-name'), t('just-english-persian-letter-and-space'))}
            />


            <PhoneInput
                defaultCountry={
                    {
                        countryCode: "ir",
                        dialCode: "98",
                        format: "... ... ...."
                    }
                }
                onChange={(v: string) => {
                    setFieldValue('reserver.phoneNumber', v)
                }}
                name={'reserver.phoneNumber'}
                isTouched={touched.reserver?.phoneNumber}
                label={t("phone-number") + " (بدون صفر)"}
                errorText={errors.reserver?.phoneNumber}
                initialValue='+989374755674'
            />

            <FormikField
                errorText={errors.reserver?.nationalId as string}
                id='nationalId'
                name='reserver.nationalId'
                isTouched={touched.reserver?.nationalId}
                label={t('national-code')}
                maxLength={10}
                validateFunction={(value: string) => validateNationalId({ value: value, invalidMessage: t('invalid-national-code'), reqiredMessage: t('please-enter-national-code') })}
            />

            <FormikField
                errorText={errors.reserver?.email as string}
                id='email'
                name='reserver.email'
                isTouched={touched.reserver?.email}
                label={t('email')}
                validateFunction={(value: string) => validateEmail({ value: value, reqiredMessage: t('enter-email-address'), invalidMessage: t('invalid-email') })}
            />
        </>
    )
}

export default ReserverInformation;