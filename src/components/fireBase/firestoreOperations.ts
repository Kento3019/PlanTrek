import {
    CollectionReference,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    QuerySnapshot,
    SnapshotOptions,
    WithFieldValue,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
} from "firebase/firestore";

// Generic Firestore Data Converter
export const createConverter = <T>(): FirestoreDataConverter<T> => ({
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
        return snapshot.data(options) as T;
    },
    toFirestore(data: WithFieldValue<T>): DocumentData {
        return data as DocumentData;
    },
});

// Create Document
export async function createDocument<T extends DocumentData>(
    collRef: CollectionReference<T>,
    key: string,
    data: WithFieldValue<T>
): Promise<void> {
    try {
        const docRef = doc(collRef, key);
        await setDoc(docRef, data);
    } catch (error) {
        console.error("Error creating document: ", error);
    }
}

export async function readDocuments<T extends DocumentData>(
    collRef: CollectionReference<T>
): Promise<T[]> {
    try {
        const querySnapshot: QuerySnapshot<T> = await getDocs(collRef);
        const documents: T[] = [];

        querySnapshot.forEach((doc) => {
            documents.push(doc.data());
        });

        return documents;
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}

// Update Document
export const updateDocument = async <T extends DocumentData>(
    collRef: CollectionReference<T>,
    key: string,
    data: WithFieldValue<T>
): Promise<void> => {
    try {
        const docRef = doc(collRef, key);
        await setDoc(docRef, data);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

// Delete Document
export const deleteDocument = async <T extends DocumentData>(
    collRef: CollectionReference<T>,
    key: string
): Promise<void> => {
    try {
        const docRef = doc(collRef, key);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};
