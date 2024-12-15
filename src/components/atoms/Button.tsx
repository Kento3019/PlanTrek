import React, { memo, ReactNode } from "react";

type Props = {
    id?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    children: ReactNode;
};

export const Button = memo(({ id, onClick, className, children }: Props) => {
    return (
        <button
            id={id}
            onClick={onClick}
            className={`focus:outline-none ${className}`}
        >
            {children}
        </button>
    );
});
