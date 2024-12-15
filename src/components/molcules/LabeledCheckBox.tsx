import React from 'react';
import { CheckBox } from "../atoms/CheckBox"

type Props = {
    type: string;
    className: string
    name?: string;
    value?: string | number;
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;

}
export const LabeledCheckBox = ({ type, className, name, value, checked, onChange, label }: Props) => {
    return (
        <div className='items-center flex flex-row'>
            <CheckBox
                type={type}
                checked={checked}
                className={`${className} mx-1 h-[18px] w-[18px] `}
                name={name}
                value={value}
                onChange={onChange}
            />
            <p className=''>{label}</p>
        </div>
    )
}
