import React from 'react';

interface CircleIconProps {
    className?: string; // Tailwindの色を指定
}

const CircleIcon: React.FC<CircleIconProps> = ({ className = 'text-black' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`icon ${className}`} // Tailwindクラスを適用
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" />
        </svg>
    );
};

export default CircleIcon;
