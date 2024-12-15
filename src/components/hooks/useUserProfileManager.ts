import { collection } from "firebase/firestore";
import { useFirestore } from "../fireBase/useFirestore";
import { db } from '../../firebase';
import { User } from '../types/User';
import { createConverter } from "../fireBase/firestoreOperations";
import { useParams } from "react-router-dom";
import { useGroup } from "../provider/GroupProvider";

export const useUserProfileManager = () => {
    const { createDocument, readDocuments, updateDocument } = useFirestore<User>();
    const { setGroup } = useGroup();
    const { uuid } = useParams();

    const createUser = (uuid: string, user: User) => {
        const collectionRef = collection(db, "users", uuid, "profiles").withConverter(createConverter<User>());
        createDocument(collectionRef, user.uid, user);
    }
    const createUsers = (uuid: string, users: User[]) => {
        if (users.length > 0) {
            users.forEach((user) => createUser(uuid, user));
        }
    }
    const updateUsers = (users: User[]) => {
        const collectionRef = collection(db, "users", uuid!, "profiles").withConverter(createConverter<User>());
        if (users.length > 0) {
            users.forEach((user) => updateDocument(collectionRef, user.uid, user));
        }
    }

    const readUsers = async (): Promise<User[]> => {

        const collectionRef = collection(db, "users", uuid!, "profiles").withConverter(createConverter<User>());
        const result = await readDocuments(collectionRef);
        setGroup(result);
        return result;
    }
    return { createUsers, readUsers, updateUsers };
}
