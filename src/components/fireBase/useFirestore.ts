
import { DocumentData } from 'firebase/firestore';
import { createDocument, readDocuments, updateDocument, deleteDocument } from './firestoreOperations';

export const useFirestore = <T extends DocumentData>() => {
    return {
        createDocument: createDocument<T>,
        readDocuments: readDocuments<T>,
        updateDocument: updateDocument<T>,
        deleteDocument: deleteDocument<T>,
    };
}
