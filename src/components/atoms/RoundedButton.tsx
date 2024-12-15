import React, { ReactNode } from 'react';
import { Button } from './Button';

type Props = {
    id?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    children: ReactNode;
};

export const RoundedButton = ({ id, onClick, className, children }: Props) => {
    return (
        <Button
            className={`${className} rounded-full shadow-lg`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
