

import React, { memo, ReactNode, useEffect } from 'react';

type Props = {
    isOpen: boolean;
    children: ReactNode;
};



export const Modal = memo(({ isOpen, children }: Props) => {
    useEffect(() => {
        if (isOpen) {
            // モーダルが開いたときにスクロールを無効化
            document.body.style.overflow = 'hidden';
        } else {
            // モーダルが閉じたときにスクロールを復元
            document.body.style.overflow = '';
        }

        // コンポーネントがアンマウントされたときのクリーンアップ
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div
            className={`fixed sm:absolute z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className="w-full flex flex-col bg-white rounded-xl shadow-2xl transform transition-transform duration-300 p-4"
                style={{
                    maxWidth: '90%', // コンテンツエリアの90%に調整
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
});
