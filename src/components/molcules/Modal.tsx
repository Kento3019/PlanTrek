import React, { memo, ReactNode, CSSProperties } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    header?: ReactNode;
    overlayClassName?: string;
    contentClassName?: string;
    style?: CSSProperties;
};

export const Modal = memo(
    ({
        isOpen,
        onClose,
        children,
        header,
        overlayClassName = '',
        contentClassName = '',
        style = {}
    }: ModalProps) => {
        return (
            <div
                className={`${overlayClassName} absolute  z-50 inset-0 bg-black bg-opacity-50 flex justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            >
                <div
                    className={`transform transition-transform duration-300 ${contentClassName}`}
                    style={style}
                    onClick={(e) => e.stopPropagation()}
                >
                    {header}
                    {children}
                </div>
            </div>
        );
    }
);
