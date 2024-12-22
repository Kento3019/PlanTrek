import React from 'react';

const DoubleLeftArrow: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-6 h-6" // 親要素のサイズに合わせて調整
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 8l-8 8 8 8" />
            <path d="M12 8l-8 8 8 8" />
        </svg>
    );
};

export default DoubleLeftArrow;
