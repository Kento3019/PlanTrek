import { collection } from "firebase/firestore";
import { useFirestore } from "../fireBase/useFirestore";
import { db } from '../../firebase';
import { createConverter } from "../fireBase/firestoreOperations";
import { useParams } from "react-router-dom";
import { useSchedules } from "../provider/SchedulesProvider";
import { Schedule } from "../types/Schedule";


export const useScheduleManager = () => {
    const { createDocument, readDocuments, updateDocument, deleteDocument } = useFirestore<Schedule>();
    const { uuid } = useParams();
    const collectionRef = collection(db, "users", uuid!, "schedule").withConverter(createConverter<Schedule>());
    const { setSchedules } = useSchedules();

    const createSchedule = (schedule: Schedule) => {
        createDocument(collectionRef, schedule.sid, schedule);
    }

    // const createTransaction = (transaction: Transaction) => {
    //     data.forEach((transaction) => createDocument(collectionRef, transaction.tid, transaction));
    // }


    const readSchedule = async (): Promise<Schedule[]> => {
        const result = await readDocuments(collectionRef);
        setSchedules(result);
        return result;
    }

    const updateSchedule = (schedule: Schedule) => {
        updateDocument(collectionRef, schedule.sid, schedule);
    }

    const deleteSchedule = (schedule: Schedule) => {
        deleteDocument(collectionRef, schedule.sid);
    }

    return { createSchedule, readSchedule, updateSchedule, deleteSchedule };
}

