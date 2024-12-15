import React, { ReactNode } from 'react';

import { CrossIcon } from "../image/CrossIcon";
import { User } from "../types/User";

type Props = {
    onClick: () => void
    children: ReactNode
    label: string;
    className?: string;
}

export const PillWithButton = ({ onClick, children, label, className }: Props) => {
    return (
        <div className={`${className} px-3 pb-0.5 mx-1 my-2 flex flex-row justify-center items-center w-auto  border border-gray-200 rounded-full shadow-md`}>
            <p>{label}</p>
            <button onClick={onClick}>
                {children}
            </button>
        </div>
    )
}
