import React, { memo, ReactNode } from 'react';
import { HeaderTemplate } from './HeaderTemplate';
import { FooterTemplate } from './FooterTemplate';

type Props = {
    children: ReactNode;
};

export const PageTemplate = memo(({ children }: Props) => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="text-[18px] sm:text-[16px] w-full max-w-screen-sm min-h-screen flex flex-col bg-white relative  bg-gradient-to-b from-white to-gray-100">
                <HeaderTemplate />
                <main className="flex-grow px-4 ">
                    {children}
                </main>
                <FooterTemplate />

                {/* コンテンツエリア内の右下に配置するFAB */}
            </div>
        </div>
    );
});
