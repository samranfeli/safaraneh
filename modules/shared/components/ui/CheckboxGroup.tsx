import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

type Props = {
    values: string[];
    items: { value: string, label: React.ReactNode }[];
    onChange: (values: string[]) => void;
    name: string;
}

const CheckboxGroup: React.FC<Props> = props => {

    const [values, setValues] = useState<string[]>(props.values)

    const onChange = (checked: boolean, value: string) => {
        setValues(prevValues => {
            if (checked) {
                if (!prevValues.includes(value)) {
                    return ([...prevValues, value])
                } else {
                    return prevValues
                }
            }
            const updatedValues = prevValues.filter(valueItem => valueItem !== value);
            return updatedValues;
        })
    }

    useEffect(() => {
        props.onChange(values);
    }, [values.length]);


    useEffect(() => {
        setValues(props.values)
    }, [props.values.length])

    return (
        <>
            {props.items.map((item, index) =>
                <Checkbox
                    block
                    id={props.name + "_" + index}
                    label={item.label}
                    onChange={(checked: boolean) => { onChange(checked, item.value) }}
                    value={item.value}
                    key={props.name + "_" + index}
                    checked={values.includes(item.value)}
                />
            )}
        </>
    )
}

export default CheckboxGroup;