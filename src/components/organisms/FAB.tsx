import React from "react";
import { RoundedButton } from "../atoms/RoundedButton";
import PlusIcon from "../image/PlusIcon";

type Props = {
    children: React.ReactNode;
    isOpenFAB: boolean;
    onClose: () => void;

};

export const FAB = ({ children, isOpenFAB, onClose }: Props) => {

    return (
        <>
            <div className="block sm:hidden">
                {isOpenFAB ? (
                    <>
                        <div
                            className="fixed sm:absolute inset-0 bg-black bg-opacity-40 z-40"
                            onClick={onClose}
                        />
                        <div className="fixed sm:absolute bottom-10 right-6 z-50">
                            {children}
                        </div>
                    </>
                ) : (
                    <div className="fixed sm:absolute bottom-10 right-6">
                        <RoundedButton
                            className="px-3 py-3 bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-400 transition-all duration-200 ease-in-out"
                            onClick={onClose}
                        >
                            <span><PlusIcon /></span>
                        </RoundedButton>
                    </div>
                )}
            </div>
        </>
    );
};
