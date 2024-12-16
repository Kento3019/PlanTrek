import { useCallback, useState } from "react";
import { useGroup } from "../provider/GroupProvider";
import { User } from "../types/User";
import { NAME_PAYER, NAME_AMOUNT, NAME_INVOLVES } from '../types/FieldName';
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../provider/ExpenseTransactionProvider";
import { useTransactionsManager } from "./useTransactionsManager";
import { ExpenseTransaction } from "../types/ExpenseTransaction";


export const useTransactionFormDataState = () => {
    const { group } = useGroup();
    const { setSelectedTransaction, transactions } = useTransactions();
    const { createTransaction, updateTransaction, readTransaction } = useTransactionsManager();
    const navigate = useNavigate();

    const initialFormData: ExpenseTransaction = {
        tid: "",
        date: new Date().toLocaleDateString('sv-SE'),
        content: "",
        payer: group[0],
        involves: group,
        amount: 0,
    };

    const [formData, setFormData] = useState<ExpenseTransaction>(initialFormData);

    const updateFormData = useCallback((ExpenseTransaction: ExpenseTransaction | undefined) => {
        if (ExpenseTransaction) {
            setFormData(ExpenseTransaction);
        }
    }, []);

    // フォームフィールドの変更を処理する関数
    const handleFormFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const checked = "checked" in e.target ? e.target.checked : undefined;
        const findUserById = (uid: string): User | undefined => group.find(user => user.uid === uid);

        const getNewValue = () => {
            switch (name) {
                case NAME_AMOUNT:
                    return Number(value) === 0 ? undefined : Number(value);
                case NAME_PAYER:
                    return findUserById(value);
                case NAME_INVOLVES:
                    return checked
                        ? [...formData.involves, findUserById(value)!]
                        : formData.involves.filter(user => user.uid !== value);
                default:
                    return value;
            }
        };
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: getNewValue(),
        }));
    }, [group, formData]);

    const validateForm = useCallback((transaction: ExpenseTransaction) => {
        if (transaction.content === "") {
            alert("割り勘の対象を入力してください");
            return false;
        } else if (transaction.amount <= 0) {
            alert("金額は０より大きい数値を入力してください")
            return false;
        } else if (Number(transaction.involves.length) <= 0) {
            alert("割り勘する人は1人以上選択してください")
            return false;
        } else if (!transaction.payer) {
            alert("異常なページ遷移です。イベントを選択しなおしてください")
            navigate(-1)
            return false;
        }
        return true;
    }, [navigate]);

    const handleFieldRegister = useCallback(async (ExpenseTransaction: ExpenseTransaction) => {
        if (!validateForm(ExpenseTransaction)) {
            return;
        }
        try {
            if (ExpenseTransaction.tid === "") {
                const maxId = Math.max(0, ...transactions.map(tran => Number(tran.tid)));
                const issuedtid = String(maxId + 1);
                ExpenseTransaction = {
                    ...ExpenseTransaction,
                    tid: issuedtid,
                };
                createTransaction(ExpenseTransaction);
            }
            else {
                updateTransaction(ExpenseTransaction);
            }
            await readTransaction();
        } catch (error) {
            console.error("Error handling modal action: ", error);
        } finally {
            navigate(-1);
            setSelectedTransaction(undefined);

        }
    }, [createTransaction, updateTransaction, readTransaction, setSelectedTransaction, navigate, transactions, validateForm]);

    return {
        formData,
        updateFormData,
        handleFormFieldChange,
        handleFieldRegister
    };
};
