import React from "react";
import { PositiveButton } from "../atoms/PositiveButton";
import { UpwardIcon } from "../image/UpwardArrowIcon";

type Props = {
    children: React.ReactNode;
    existing: boolean;
    onClick: () => void;
    btnStr: string;
    msgStr: string;
};

export const ListNotFound = ({ children, existing, onClick, btnStr, msgStr }: Props) => {
    return (
        <>
            {existing ? (
                <>
                    <div className='mt-4'>
                        <PositiveButton
                            className='px-2 w-full rounded-md'
                            onClick={onClick}
                        >
                            {btnStr}
                        </PositiveButton>
                    </div>
                    <div className="mt-5 m-3 flex flex-col items-center text-center">
                        <div className="animate-bounce">
                            <UpwardIcon />
                        </div>
                        <p className='mt-2'>{msgStr}</p>
                    </div>
                </>
            ) : (
                children
            )}
        </>
    );
};
