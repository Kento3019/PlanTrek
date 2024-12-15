// Accordion.tsx
import React, { ReactNode } from 'react';

type AccordionProps = {
    children: ReactNode;
};

type AccordionItemProps = {
    title: string;
    children: ReactNode; // 'children' を明示的に定義
    isOpen?: boolean;
};

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
    return (
        <div className="w-full max-w-full">
            <div className={``}>{children}</div>
        </div >
    );
};
export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen = false }) => {
    return (
        <details className="group" open={isOpen}>
            <summary
                className={`mb-2 flex cursor-pointer list-none items-center justify-between py-2 font-medium
                    ${!isOpen && 'border-b border-gray-100'} // アコーディオンが閉じているときに下線を表示
                    group-open:border-b-0`
                }>
                {title}
                <div className="text-gray-500 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="block h-5 w-5 transition-transform duration-300 group-open:rotate-180"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </div>
            </summary>
            <div className="pb-4 text-gray-500">{children}</div>
        </details>
    );
};
