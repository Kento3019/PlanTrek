import React from "react";
import { Input } from "../atoms/Input";

type Props = {
    type: string;
    label: string;
    placeholder: string;
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LabeledInput = ({ type, value, label, placeholder, onChange }: Props) => {
    return (
        <>
            <p className="text-lg font-semibold mb-2">{label}</p>
            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mb-4 p-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-300"
            />
        </>
    );
}
