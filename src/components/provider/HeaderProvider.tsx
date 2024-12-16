// HeaderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type HeaderContextType = {
    isHeaderVisible: boolean;
    toggleHeaderVisibility: () => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    const toggleHeaderVisibility = () => {
        setIsHeaderVisible((prev) => !prev);
    };

    return (
        <HeaderContext.Provider value={{ isHeaderVisible, toggleHeaderVisibility }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeaderContext must be used within a HeaderProvider");
    }
    return context;
};
