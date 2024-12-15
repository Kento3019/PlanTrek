
import React, { memo, } from "react";

type Props = {
    type: string;
    className: string
    name?: string;
    value?: string | number;
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

export const CheckBox = memo(({ type, className, name, value, checked, onChange }: Props) => {
    return (
        <input
            type={type}
            className={`
                    ${className}
                    w-4 h-4 border border-gray-300 shadow-sm
                `}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
        />
    );
})
