import React, { createContext, useState, ReactNode, useContext } from 'react';
import { ExpenseTransaction } from '../types/ExpenseTransaction';


type ExpenseTransactionContextType = {
    selectedTransaction: ExpenseTransaction | undefined;
    setSelectedTransaction: React.Dispatch<React.SetStateAction<ExpenseTransaction | undefined>>;
    transactions: Array<ExpenseTransaction>;
    setTransactions: React.Dispatch<React.SetStateAction<Array<ExpenseTransaction>>>;
}

type Props = {
    children: ReactNode;
}

export const ExpenseTransactionsContext = createContext<ExpenseTransactionContextType | undefined>(undefined);

export const useTransactions = (): ExpenseTransactionContextType => {
    const context = useContext(ExpenseTransactionsContext);
    if (!context) {
        throw new Error("useTransactions must be used within a TransactionsProvider");
    }
    return context;
};

export const ExpenseTransactionsProvider = ({ children }: Props) => {
    const [transactions, setTransactions] = useState<Array<ExpenseTransaction>>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<ExpenseTransaction | undefined>(undefined);

    return (
        <ExpenseTransactionsContext.Provider value={{ transactions, setTransactions, selectedTransaction, setSelectedTransaction }}>
            {children}
        </ExpenseTransactionsContext.Provider>
    );
};
