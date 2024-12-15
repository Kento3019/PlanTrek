import React, { ReactNode } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { PositiveButton } from "../atoms/PositiveButton";

type Props = {
    type: string;
    placeholder: string;
    value?: string | number;
    onClick: () => void
    children: ReactNode
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputButton = ({ type, placeholder, value, children, onClick, onChange }: Props) => {
    return (
        <>
            <div className="flex items-center mb-4 max-w-full">
                <Input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="shadow-sm border border-gray-300 flex-grow min-w-0 rounded-l-md p-2"
                />
                <PositiveButton
                    className="py-2 px-4 text-center font-semibold rounded-r-md rounded-l-none border"
                    onClick={onClick}
                >
                    {children}
                </PositiveButton>
            </div>
        </>
    );
}
