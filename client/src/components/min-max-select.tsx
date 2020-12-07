import React from "react";

export interface MinMaxSelectProps {
    min: number;
    max: number;
    value: number;
    label: string;
    onChange: (val: number) => void;
}

/**
 * MinMaxSelect component- creates select element for given min max value with label
 * @function MinMaxSelect
 *
 * @param {MinMaxSelectProps} props
 * @constructor
 *
 * @return {JSX.Element}
 */
const MinMaxSelect = (props: MinMaxSelectProps): JSX.Element => {
    const {min, max, value, label, onChange} = props;
    const initValue: number[] = [];
    const [values, setValues] = React.useState(initValue);

    React.useEffect(() => {
        let values: number[] = Array.from({length: Math.max(0, max - min + 1)}, (_, i: number) => i + min);
        setValues(values);
    }, [min, max]);

    return (
        <div data-test='component-min-max-select' className="form-group">
            <label data-test='select-label'>{label}</label>
            <select data-test='select-element' value={value} className="form-control"
                    onChange={((event: React.ChangeEvent<HTMLSelectElement>) => onChange(parseInt(event.target.value)))}>
                {
                    values.map((v: number) => (
                        <option key={v} value={v} data-test="select-option">{v}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default MinMaxSelect;
