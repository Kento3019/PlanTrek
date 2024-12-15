import React, { ReactNode } from 'react';
import { Button } from './Button';

type Props = {
    id?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    children: ReactNode;
};

export const PositiveButton = ({ id, onClick, className, children }: Props) => {
    return (
        <Button
            id={id}
            className={`${className} font-semibold bg-indigo-600 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-400 border-transparent py-2 transition-all duration-200 ease-in-out`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
