import React from 'react';

interface TagIconProps {
    className?: string; // Tailwindのクラス名を指定
}

const TagIcon: React.FC<TagIconProps> = ({ className = 'text-black' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`icon ${className}`} // Tailwindクラスを適用
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11.172 2a3 3 0 0 1 2.121 .879l7.71 7.71a3.41 3.41 0 0 1 0 4.822l-5.592 5.592a3.41 3.41 0 0 1 -4.822 0l-7.71 -7.71a3 3 0 0 1 -.879 -2.121v-5.172a4 4 0 0 1 4 -4zm-3.672 3.5a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2" />
        </svg>
    );
};

export default TagIcon;
