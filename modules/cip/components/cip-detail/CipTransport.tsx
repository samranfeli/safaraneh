import FormikField from "@/modules/shared/components/ui/FormikField";
import { Minus, Plus } from "@/modules/shared/components/ui/icons";
import { numberWithCommas } from "@/modules/shared/helpers";
import { validateRequied } from "@/modules/shared/helpers/validation";
import { FormikErrors, FormikTouched } from "formik";

type Props = {
    selectedTransport: any[];
    updateTransport: (id: number, fn: "inc" | "dec") => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{
        cip_transport_address: string
    }>>;
    errors: FormikErrors<{
        cip_transport_address: string
    }>;
    touched: FormikTouched<{
        cip_transport_address: string
    }>;
    values: {
        cip_transport_address: string
    }
}

const CipTransport: React.FC<Props> = props => {

    const { updateTransport, selectedTransport, errors, touched, setFieldValue, values } = props;

    if (!selectedTransport || selectedTransport.length === 0) {
        return null;
    }
    const someTransportIsSelected = selectedTransport.some(item => item.count > 0);

    return (
        <div
            //className={`${styles.taxiCip} ${process.env.THEME_NAME === "TRAVELO" && styles.taxiCipTravelo}`} 
            id="anchortaxicip"
        >
            
            <strong className="font-semibold text-lg block "> تاکسی ویژه cip </strong>

            <div
            //className={styles.content}
            >
                <div
                //className={styles.carList}
                >
                    {selectedTransport.sort((a, b) => a.id - b.id).map((item, index) => (
                        <div
                            //className={`${styles.car} ${index?"margin-start-10":""}`} 
                            key={item.name}
                        >
                            <div
                            //className={styles.carDetailsCip}
                            >
                                {item.picture.path ?
                                    <img src={item.picture.path} alt={item.picture.altAttribute} title={item.picture.titleAttribute} />
                                    : <img src="/images/default-car.jpg" />}
                                <div
                                //className={styles.carTextCip}
                                >
                                    <h6>{item.name}</h6>
                                    <small>{numberWithCommas(item.salePrice)} ریال</small>
                                </div>
                            </div>
                            <div
                            //className={`${styles.addRemoveCar}`}
                            >
                                <button type="button" onClick={() => updateTransport(item.id, "inc")} >
                                <Plus className="w-6 h-6 fill-white" />
                                </button>
                                <input type="text" className="value" value={item.count} readOnly />
                                <button type="button" onClick={() => updateTransport(item.id, "dec")} >
                                    <Minus className="w-6 h-6 fill-white" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {someTransportIsSelected && (

                    <FormikField
                        setFieldValue={setFieldValue}
                        id="cip_transport_address"
                        errorText={errors.cip_transport_address}
                        name="cip_transport_address"
                        isTouched={touched.cip_transport_address}
                        label="آدرس مقصد از فرودگاه"
                        validateFunction={(value: string) => validateRequied(value, "لطفا آدرس مقصد را وارد نمایید")}
                        value={values.cip_transport_address}
                    />
                )
                }
            </div>
        </div>
    )
}

export default CipTransport;