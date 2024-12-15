import React from 'react';

type ArrowIconProps = {
    size?: number; // サイズを指定するためのプロパティ（デフォルト: 24）
    color?: string; // 色を指定するためのプロパティ（デフォルト: currentColor）
    className?: string; // 追加のクラス名
};

export const ArrowIcon: React.FC<ArrowIconProps> = ({
    size = 24,
    color = 'currentColor',
    className = '',
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`icon icon-tabler icon-tabler-arrow-narrow-right ${className}`}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M15 16l4 -4" />
            <path d="M15 8l4 4" />
        </svg>
    );
};
