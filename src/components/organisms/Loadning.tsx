import React from "react";
import { LoadingIcon } from "../image/LoadingIcon";

type Props = {
    children: React.ReactNode;
    loading: boolean;
};

export const Loading = ({ children, loading }: Props) => {
    return (
        <>
            {loading ? (
                <div role="status" className="mt-4 flex justify-center">
                    <LoadingIcon />
                </div>
            ) : (
                children
            )}
        </>
    );
};
