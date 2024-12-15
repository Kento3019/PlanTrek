import React, { memo, ReactNode } from "react";

type Props = {
    className?: string;
    name?: string;
    value?: string | number;
    children: ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectBox = memo(({ className, name, value, onChange, children }: Props) => {
    return (
        <select
            value={value}
            name={name}
            onChange={onChange}
            className={`${className} p-2 my-2 border-b`}
        >
            {children}
        </select >
    );
});
