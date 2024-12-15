import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Schedule } from '../types/Schedule';


type ScheduleContextType = {
    selectedSchedule: Schedule | undefined;
    setSelectedSchedule: React.Dispatch<React.SetStateAction<Schedule | undefined>>;
    schedules: Array<Schedule>;
    setSchedules: React.Dispatch<React.SetStateAction<Array<Schedule>>>;
}

type Props = {
    children: ReactNode;
}

export const SchedulesContext = createContext<ScheduleContextType | undefined>(undefined);

export const useSchedules = (): ScheduleContextType => {
    const context = useContext(SchedulesContext);
    if (!context) {
        throw new Error("useSchedules must be used within a SchedulesProvider");
    }
    return context;
};

export const SchedulesProvider = ({ children }: Props) => {
    const [schedules, setSchedules] = useState<Array<Schedule>>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>(undefined);

    return (
        <SchedulesContext.Provider value={{ schedules, setSchedules, selectedSchedule, setSelectedSchedule }}>
            {children}
        </SchedulesContext.Provider>
    );
};
