import React, { ReactNode } from "react";
import { InputButton } from "./InputButton";

type Props = {
    type: string;
    label?: string;
    placeholder: string;
    value?: string | number
    onClick: () => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: ReactNode
}

export const LabeledInputButton = ({ type, label, value, placeholder, onClick, onChange, children }: Props) => {
    return (
        <>
            <p className="text-lg font-semibold mb-2">{label}</p>
            <InputButton
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onClick={onClick}
            >
                {children}
            </InputButton>
        </>
    );
}
