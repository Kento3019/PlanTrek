import React from 'react';

const DoubleRightArrow: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-6 h-6" // 親要素に合わせたサイズ設定
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 8l8 8-8 8" />
            <path d="M20 8l8 8-8 8" />
        </svg>
    );
};

export default DoubleRightArrow;
