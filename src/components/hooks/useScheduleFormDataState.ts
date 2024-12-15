import { useCallback, useState } from "react";
import { NAME_STARTTIME, NAME_ENDTIME, NAME_STARTDATE, NAME_ENDDATE, NAME_ALLDAY } from '../types/FieldName';
import { useSchedules } from "../provider/SchedulesProvider";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../provider/CategoryProvider";
import { Schedule } from "../types/Schedule";
import { useScheduleManager } from "./useScheduleManager";
import { SingleValue } from "react-select";
import { Category } from "../types/Category";


export const useScheduleFormDataState = () => {
    const { setSelectedSchedule, schedules } = useSchedules();
    const { createSchedule, readSchedule, updateSchedule } = useScheduleManager();
    const navigate = useNavigate();
    const { categories } = useCategories();

    const initialFormData: Schedule = {
        sid: "",
        date: {
            start: new Date().toLocaleDateString('sv-SE'), //yyyy-mm-ddにするためにsv-SEで返す
            end: new Date().toLocaleDateString('sv-SE'), //yyyy-mm-ddにするためにsv-SEで返す
        },
        time: {
            start: "13:00",
            end: "15:00",
        },
        allDay: false,
        content: "",
        contentURL: "",
        remarks: "",
        category: categories[0]
    };

    const [formData, setFormData] = useState<Schedule>(initialFormData);

    const updateFormData = useCallback((schedule: Schedule | undefined) => {
        if (schedule) {
            setFormData(schedule);
        }
    }, []);

    // フォームフィールドの変更を処理する関数
    const handleFormFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, } = e.target;
        const checked = "checked" in e.target ? e.target.checked : undefined;

        // 新しい値を生成する関数
        const getNewValue = () => {
            const fieldKey = name.split(".")[1] as "start" | "end";

            if (name.startsWith(NAME_STARTDATE) || name.startsWith(NAME_ENDDATE)) {
                return { ...formData.date, [fieldKey]: value };
            }

            if (name.startsWith(NAME_STARTTIME) || name.startsWith(NAME_ENDTIME)) {
                return { ...formData.time, [fieldKey]: value };
            }

            if (name === NAME_ALLDAY) {
                return checked;
            }
            return value; // その他のフィールドはそのまま更新
        };

        // フィールド名に基づいて更新するキーを決定
        const getFieldKey = () => {
            if (name.startsWith("time.")) return "time";
            if (name.startsWith("date.")) return "date";
            return name;
        };

        setFormData(prevFormData => ({
            ...prevFormData,
            [getFieldKey()]: getNewValue(),
        }));
    }, [formData]);


    const handleOptionChange = (option: SingleValue<{ value: string; label: React.JSX.Element }>) => {

        const findCategoryById = (cid: string): Category | undefined => categories.find(cat => cat.cid === cid);

        if (option) {
            // 選択されたカテゴリを取得
            const selectedCategory = findCategoryById(option.value);

            // FormDataを更新する
            if (selectedCategory) {
                const newFormData = {
                    ...formData,
                    category: selectedCategory // 取得したカテゴリをFormDataに追加
                };
                updateFormData(newFormData); // updateFormData関数でフォームデータを更新
            }
        }
    }

    const validateForm = useCallback((transaction: Schedule) => {
        if (transaction.content === "") {
            alert("タイトルを入力してください");
            return false;
        } else if (!transaction.category) {
            alert("異常なページ遷移です。イベントを選択しなおしてください")
            navigate(-1)
            return false;
        } else if (Date.parse(`${transaction.date.start}T${transaction.time.start}:00`) > Date.parse(`${transaction.date.end}T${transaction.time.end}:00`)) {
            alert("開始は終了より早い時間を入力してください")
            return false;
        } else if (transaction.contentURL !== "") {
            try {
                const url = new URL(transaction.contentURL);
                return url.protocol === "http:" || url.protocol === "https:";
            } catch {
                alert("URLの形式で入力してください");
                return false;
            }
        }
        return true;
    }, [navigate]);

    const handleFieldRegister = useCallback(async (schedule: Schedule) => {
        if (!validateForm(schedule)) {
            return;
        }
        try {
            if (schedule.sid === "") {
                const maxId = Math.max(0, ...schedules.map(tran => Number(tran.sid)));
                const issuedtid = String(maxId + 1);
                schedule = {
                    ...schedule,
                    sid: issuedtid,
                };
                createSchedule(schedule);
            }
            else {
                updateSchedule(schedule);
            }
            await readSchedule();
        } catch (error) {
            console.error("Error handling modal action: ", error);
        } finally {
            navigate(-1);
            setSelectedSchedule(undefined);

        }
    }, [createSchedule, readSchedule, updateSchedule, setSelectedSchedule, navigate, schedules, validateForm]);

    return {
        formData,
        updateFormData,
        handleFormFieldChange,
        handleFieldRegister,
        handleOptionChange
    };
};
