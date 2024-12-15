import React, { createContext, useState, ReactNode, useContext } from 'react';
import { User } from '../types/User';

type GroupContextType = {
    group: Array<User>;
    setGroup: React.Dispatch<React.SetStateAction<Array<User>>>;
}
type Props = {
    children: ReactNode;
}

export const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const useGroup = (): GroupContextType => {
    const context = useContext(GroupContext);
    if (!context) {
        throw new Error("useGroup must be used within a GroupProvider");
    }
    return context;
};

export const GroupProvider = ({ children }: Props) => {
    const [group, setGroup] = useState<Array<User>>([]);

    return (
        <GroupContext.Provider value={{ group, setGroup }}>
            {children}
        </GroupContext.Provider>
    );
};
