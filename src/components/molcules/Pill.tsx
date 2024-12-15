import React from 'react';

type Props = {
    label: any;
    className?: string
}

export const Pill = ({ label, className }: Props) => {
    return (
        <div className={`${className}  px-0.5 border border-gray-200 rounded-full shadow-sm`}>
            <p>{label}</p>
        </div>
    )
}
