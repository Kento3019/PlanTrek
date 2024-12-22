import { collection } from "firebase/firestore";
import { useFirestore } from "../fireBase/useFirestore";
import { db } from '../../firebase';
import { createConverter } from "../fireBase/firestoreOperations";
import { useParams } from "react-router-dom";
import { Category } from "../types/Category";
import { initCategories, useCategories } from "../provider/CategoryProvider";

export const useCategoriesManager = () => {
    const { createDocument, readDocuments, updateDocument } = useFirestore<Category>();
    const { uuid } = useParams();
    const { setCategories } = useCategories();

    const createCategory = (uuid: string, category: Category) => {
        const collectionRef = collection(db, "users", uuid, "categories").withConverter(createConverter<Category>());
        createDocument(collectionRef, category.cid, category);
    }

    const createCategories = (uuid: string, categories: Category[]) => {
        if (categories.length > 0) {
            categories.forEach((category) => createCategory(uuid, category));
        }
    }
    const updateCategories = (categories: Category[]) => {
        const collectionRef = collection(db, "users", uuid!, "categories").withConverter(createConverter<Category>());
        if (categories.length > 0) {
            categories.forEach((category) => updateDocument(collectionRef, category.cid, category));
        }
    }

    const readCategories = async (): Promise<Category[]> => {

        const collectionRef = collection(db, "users", uuid!, "categories").withConverter(createConverter<Category>());
        const result = await readDocuments(collectionRef);

        if ((result.length > 0)) {
            setCategories(result);
        } else {
            createCategories(uuid!, initCategories);
            setCategories(initCategories);
        }



        return result;
    }

    return { createCategories, readCategories, updateCategories };
}
