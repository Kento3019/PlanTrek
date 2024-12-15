import { collection } from "firebase/firestore";
import { useFirestore } from "../fireBase/useFirestore";
import { db } from '../../firebase';
import { createConverter } from "../fireBase/firestoreOperations";
import { useParams } from "react-router-dom";
import { ExpenseTransaction } from "../types/ExpenseTransaction";
import { useTransactions } from "../provider/ExpenseTransactionProvider";


export const useTransactionsManager = () => {
    const { createDocument, readDocuments, updateDocument, deleteDocument } = useFirestore<ExpenseTransaction>();
    const { uuid } = useParams();
    const collectionRef = collection(db, "users", uuid!, "transactions").withConverter(createConverter<ExpenseTransaction>());
    const { setTransactions } = useTransactions();

    const createTransaction = (ExpenseTransaction: ExpenseTransaction) => {
        createDocument(collectionRef, ExpenseTransaction.tid, ExpenseTransaction);
    }
    const readTransaction = async (): Promise<ExpenseTransaction[]> => {
        const result = await readDocuments(collectionRef);
        setTransactions(result);
        return result;
    }

    const updateTransaction = (ExpenseTransaction: ExpenseTransaction) => {
        updateDocument(collectionRef, ExpenseTransaction.tid, ExpenseTransaction);
    }

    const deleteTransaction = (ExpenseTransaction: ExpenseTransaction) => {
        deleteDocument(collectionRef, ExpenseTransaction.tid);
    }

    return { createTransaction, readTransaction, updateTransaction, deleteTransaction };
}

