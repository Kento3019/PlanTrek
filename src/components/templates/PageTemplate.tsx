import React, { memo, ReactNode } from 'react';
import { HeaderTemplate } from './HeaderTemplate';
import { FooterTemplate } from './FooterTemplate';

type Props = {
    children: ReactNode;
};

export const PageTemplate = memo(({ children }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="h-svh sm:h-screen text-[18px] sm:text-[16px] w-full max-w-screen-sm flex flex-col bg-white relative bg-gradient-to-b from-white to-gray-100">
                <HeaderTemplate />
                <main
                    className="flex-grow px-2 overflow-auto"
                >
                    {children}
                </main>
                <FooterTemplate />
            </div>
        </div>
    );
});
