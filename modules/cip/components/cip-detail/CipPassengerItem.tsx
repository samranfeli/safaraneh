import DatePicker from "@/modules/shared/components/ui/DatePicker";
import FormikField from "@/modules/shared/components/ui/FormikField"
import PhoneInput from "@/modules/shared/components/ui/PhoneInput";
import TimePicker from "@/modules/shared/components/ui/TimePicker";
import { validateEmail, validateNationalId, validateRequied, validateRequiedPersianAndEnglish } from "@/modules/shared/helpers/validation";
import { Field, FormikErrors, FormikTouched } from "formik";
import { useTranslation } from "next-i18next";
import { CipFormPassengerItemType } from "../../types/cip";
import { Close, Loading, Minus, Plus } from "@/modules/shared/components/ui/icons";
import Quantity from "@/modules/shared/components/ui/Quantity";
import DatePickerSelect from "@/modules/shared/components/ui/DatePickerSelect";
import { dateFormat, goBackYears } from "@/modules/shared/helpers";

type Props = {
    passengerItem: CipFormPassengerItemType
    passengerIndex: number;
    decreasePassengers: () => void;
    setReserverIsNotPassenger: () => void;
    isLastItem?: boolean;
    //passengerServicesArray;
    updatePassenger: (property: any, value: any) => void;
    //form;
    //userInfo;
    //passengerServicesArray,

    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{
        passengers: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
            userName: string;
            gender: boolean;
            passengerType: "Adult" | "Child";
            passportNumber: string;
            nationalId: string;
            nationality: string;
            birthday: string;
            services: any[]
        }[];
    }>>;
    errors: FormikErrors<{
        passengers: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
            userName: string;
            gender: boolean;
            passengerType: "Adult" | "Child";
            passportNumber: string;
            nationalId: string;
            nationality: string;
            birthday: string;
            services: any[]
        }[];
    }>;
    touched: FormikTouched<{
        passengers: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
            userName: string;
            gender: boolean;
            passengerType: "Adult" | "Child";
            passportNumber: string;
            nationalId: string;
            nationality: string;
            birthday: string;
            services: any[]
        }[];
    }>;
    values: {
        passengers: {
            firstName: string;
            lastName: string;
            phoneNumber: string;
            email: string;
            userName: string;
            gender: boolean;
            passengerType: "Adult" | "Child";
            passportNumber: string;
            nationalId: string;
            nationality: string;
            birthday: string;
            services: any[]
        }[];
    };
    // reserverIsPassenger:boolean;
}

const maximumBirthDate = dateFormat(new Date());
const minimumBirthDate = dateFormat(goBackYears(new Date(), 100));


const CipPassengerItem: React.FC<Props> = props => {

    const { t } = useTranslation('common');
    const { passengerItem, passengerIndex, setReserverIsNotPassenger, updatePassenger, values, errors, touched, setFieldValue } = props;

    return (
        <div className="bg-white rounded-lg border border-neutral-300 mb-5 md:mb-8">

            <div className="border-b border-neutral-300 px-5 py-2 flex justify-between">
                <h4 className="font-semibold text-sm">مسافر {passengerIndex + 1}</h4>

                {!!props.isLastItem && <button type="button" className="bg-red-100 rounded p-1.5" onClick={() => props.decreasePassengers()}>
                    <Close className="w-5 h-5 fill-red-600" />
                </button>}
            </div>
            <div className="px-5 py-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">


                <div className="leading-4" >
                    <label className='block text-xs mb-1' > جنسیت </label>
                    <label className='inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4'>
                        <Field
                            type="radio"
                            className="text-xs"
                            onChange={(e: any) => {
                                const val = e.target.checked;
                                setFieldValue(`passengers.${passengerIndex}.gender`, val);
                                if (setReserverIsNotPassenger) {
                                    setReserverIsNotPassenger();
                                }
                            }}
                            checked={values.passengers[passengerIndex]?.gender}
                        />
                        مرد
                    </label>
                    <label className='inline-flex items-center gap-1'>
                        <Field
                            type="radio"
                            className="text-xs"
                            onChange={(e: any) => {
                                const val = !e.target.checked;
                                setFieldValue(`passengers.${passengerIndex}.gender`, val);
                                if (setReserverIsNotPassenger) {
                                    setReserverIsNotPassenger();
                                }
                            }}
                            checked={!values.passengers[passengerIndex]?.gender}
                        />
                        زن
                    </label>
                </div>


                <div className="leading-4" >
                    <label className='block text-xs mb-1' > نوع مسافر </label>
                    <label className='inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4 text-sm'>
                        <Field
                            type="radio"
                            className="text-xs"
                            onChange={(e: any) => {
                                const val = e.target.checked;
                                setFieldValue(`passengers.${passengerIndex}.passengerType`, val ? "Adult" : "Child");
                            }}
                            checked={values.passengers[passengerIndex]?.passengerType === "Adult"}
                        />
                        بزرگسال
                    </label>
                    <label className='inline-flex items-center gap-1 text-sm'>
                        <Field
                            type="radio"
                            className="text-xs"
                            onChange={(e: any) => {
                                const val = e.target.checked;
                                setFieldValue(`passengers.${passengerIndex}.passengerType`, val ? "Child" : "Adult");
                            }}
                            checked={values.passengers[passengerIndex]?.passengerType === "Child"}
                        />
                        کودک زیر ۲ سال
                    </label>
                </div>

                <FormikField
                    setFieldValue={setFieldValue}
                    id={`passengers_${passengerIndex}_firstName`}
                    errorText={errors.passengers ? (errors.passengers[passengerIndex] as FormikErrors<{
                        firstName: string;
                    }>)?.firstName : undefined}
                    name={`passengers.${passengerIndex}.firstName`}
                    isTouched={(touched.passengers && touched.passengers[passengerIndex]) ? touched.passengers[passengerIndex].firstName : false}
                    label={t('first-name')}
                    validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-passenger-first-name'), t('just-english-persian-letter-and-space'))}
                    value={values.passengers[passengerIndex]?.firstName}
                    onChange={() => {
                        if (!passengerIndex && setReserverIsNotPassenger) {
                            setReserverIsNotPassenger();
                        }
                    }}
                />

                <FormikField
                    setFieldValue={setFieldValue}
                    id={`passengers_${passengerIndex}_lastName`}
                    errorText={errors.passengers ? (errors.passengers[passengerIndex] as FormikErrors<{
                        lastName: string;
                    }>)?.lastName : undefined}
                    name={`passengers.${passengerIndex}.lastName`}
                    isTouched={(touched.passengers && touched.passengers[passengerIndex]) ? touched.passengers[passengerIndex].lastName : false}
                    label={t('last-name')}
                    validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-passenger-last-name'), t('just-english-persian-letter-and-space'))}
                    value={values.passengers[passengerIndex]?.lastName}
                    onChange={() => {
                        if (!passengerIndex && setReserverIsNotPassenger) {
                            setReserverIsNotPassenger();
                        }
                    }}
                />

                <FormikField
                    setFieldValue={setFieldValue}
                    id={`passengers_${passengerIndex}_nationalId`}
                    errorText={errors.passengers ? (errors.passengers[passengerIndex] as FormikErrors<{
                        nationalId: string;
                    }>)?.nationalId : undefined}
                    name={`passengers.${passengerIndex}.nationalId`}
                    isTouched={(touched.passengers && touched.passengers[passengerIndex]) ? touched.passengers[passengerIndex].nationalId : false}
                    label={t('national-code')}
                    maxLength={10}
                    validateFunction={(value: string) => validateNationalId({ value: value, invalidMessage: t('invalid-national-code'), reqiredMessage: t('please-enter-national-code') })}
                    value={values.passengers[passengerIndex]?.nationalId}
                />


                <FormikField
                    setFieldValue={setFieldValue}
                    id={`passengers_${passengerIndex}_passportNumber`}
                    errorText={errors.passengers ? (errors.passengers[passengerIndex] as FormikErrors<{
                        passportNumber: string;
                    }>)?.passportNumber : undefined}
                    name={`passengers.${passengerIndex}.passportNumber`}
                    isTouched={(touched.passengers && touched.passengers[passengerIndex]) ? touched.passengers[passengerIndex].passportNumber : false}
                    label={"شماره گذرنامه"}
                    validateFunction={(value: string) => validateRequied(value, "لطفا شماره گذرنامه را وارد کنید.")}
                    value={values.passengers[passengerIndex]?.passportNumber}
                />
                
                <div>
                    <DatePickerSelect
                        setFieldValue={setFieldValue}
                        max={maximumBirthDate}
                        min={minimumBirthDate}
                        name={`passengers.${passengerIndex}.birthday`}
                        id={`passengers_${passengerIndex}_birthday`}
                        //initialValue={user.birthDay ? dateFormat(new Date(user.birthDay)) : ""}
                        shamsi={true}
                        label="تاریخ تولد"
                        value={values.passengers[passengerIndex].birthday||""}
                        descending
                        errorText={errors.passengers ? (errors.passengers[passengerIndex] as FormikErrors<{
                            birthday: string;
                        }>)?.birthday : undefined}
                        isTouched={(touched.passengers && touched.passengers[passengerIndex]) ? touched.passengers[passengerIndex].birthday : false}
                        validateFunction={(value: string) => validateRequied(value, "لطفا تاریخ تولد مسافر را وارد نمایید")}
                    />
                </div>









            </div>

            {/* <div className={styles.contentPassenger}>

                
                <Form.Item
                    hidden
                    name={['passengers', passengerIndex ,'nationality']}
                    initialValue={"IR"}
                >
                    <input type={"hidden"} />
                </Form.Item>
            </Row>    */}

            
            {/* {passengerServicesArray?.find(serviceItem => serviceItem.passengerType === passengerItem.type)?.services?.length > 0 && <div className={styles.additinalServicePAssenger}>
                <div className={styles.subject}> سرویس هایی بیشتر :</div>
                <div className={styles.content}>
                    <Checkbox.Group
                        onChange={value => {
                            UpdatePassenger(passengerItem.id,"services",value);
                            form.setFieldValue(['passengers', passengerIndex , 'services'], value);
                        }}
                        value={passengerItem.services}
                    >
                        <Row gutter={[20,20]}>
                            {passengerServicesArray.find(serviceItem => serviceItem.passengerType === passengerItem.type).services.map(serviceItem => <Col key={serviceItem.id}>
                                <Checkbox value={serviceItem.id} >
                                    {serviceItem.name}
                                </Checkbox>
                            </Col>)}
                        </Row>
                    </Checkbox.Group>
                </div>
            </div>}
            <Form.Item
                hidden
                name={['passengers', passengerIndex ,'services']}
                initialValue={[]}
            >
                <input type={"hidden"} />
            </Form.Item> 
        </div>*/}
        </div>
    )
}

export default CipPassengerItem;