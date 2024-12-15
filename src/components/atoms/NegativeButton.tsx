import React, { ReactNode } from 'react';
import { Button } from './Button';

type Props = {
    id?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    children: ReactNode;
};

export const NegativeButton = ({ id, onClick, className, children }: Props) => {
    return (
        <Button
            id={id}
            className={`py-2 bg-neutral-400 text-white shadow-md hover:bg-gray-500 active:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500
                        font-semibold rounded-md px-4 transition-all duration-200 ease-in-out ${className}`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
