
import React, { memo, } from "react";

type Props = {
    type: string;
    className: string
    placeholder?: string;
    name?: string;
    value?: string | number;
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: string

}

export const Input = memo(({ type, className, placeholder, name, value, checked, onChange, min }: Props) => {
    return (
        <input
            type={type}
            className={`
                    ${className}
                    focus:outline-none
                `}
            placeholder={placeholder}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            min={min}
        />
    );
})
