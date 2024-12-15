import { Category } from "./Category";

export type Schedule = {
    sid: string;
    date: {
        start: string,
        end: string
    }
    time: {
        start: string,
        end: string
    }
    allDay: boolean;
    content: string;
    contentURL: string,
    remarks: string
    category: Category;
}

