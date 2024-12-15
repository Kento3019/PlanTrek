
import React, { memo } from "react";
import { Input } from "./Input";

type Props = {
    type: string;
    placeholder?: string;
    name?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    min?: string

}

export const FormInput = memo(({ type, placeholder, name, value, onChange, className, min }: Props) => {
    return (
        <Input
            type={type}
            className={`${className} text-gray-900  border-b `
            }
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            min={min}
        />
    );
})
