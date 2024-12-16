import { useEffect, useState } from 'react';
import { useScheduleManager } from '../hooks/useScheduleManager';
import { useSchedules } from '../provider/SchedulesProvider';
import Calendar from '../organisms/Calendar';
import { EventClickArg } from '@fullcalendar/core';
import { EventInfoTable } from '../organisms/EventInfoTable';
import { NoteIcon } from '../image/NoteIcon';
import { useNavigate } from 'react-router-dom';
import { PositiveButton } from '../atoms/PositiveButton';
import { RoundedButton } from '../atoms/RoundedButton';
import { Schedule } from '../types/Schedule';
import { useCategoriesManager } from '../hooks/useCategoriesManage';
import { Loading } from '../organisms/Loadning';
import { ListNotFound } from '../organisms/ListNotFound';
import { FAB } from '../organisms/FAB';
import { useFAB } from '../hooks/useFAB';

export const SchedulePage = () => {
    const navigate = useNavigate();
    const { isOpenFAB, toggleFAB } = useFAB();
    const { readSchedule } = useScheduleManager();
    const { setSelectedSchedule, schedules } = useSchedules();
    const { readCategories } = useCategoriesManager();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    readSchedule(),
                    readCategories()
                ]);
            } catch (error) {
                console.error('データの読み込み中にエラーが発生しました:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleEventClick = async (arg: EventClickArg) => {
        const transaction = schedules.find(schedule => schedule.sid === arg.event.id);
        if (transaction) {
            await Promise.all([readSchedule(), readCategories()]);
            navigateToForm(transaction);
        }
    };

    const navigateToForm = async (schedule: Schedule | undefined) => {
        setSelectedSchedule(schedule);
        await Promise.all([readSchedule(), readCategories()]);
        navigate(`./form`);
    };

    return (
        <div className='max-h-full  flex flex-col'>
            <Loading loading={loading}>
                <ListNotFound
                    existing={schedules.length === 0}
                    onClick={() => navigateToForm(undefined)}
                    btnStr='スケジュールを追加する'
                    msgStr='「スケジュールを追加する」からメンバー間の予定を登録しましょう'
                >
                    <>
                        <div className=''>
                            <div className='hidden sm:flex justify-start mt-2'>
                                <PositiveButton
                                    className='px-2 rounded-md'
                                    onClick={() => navigateToForm(undefined)}
                                >
                                    スケジュールを追加する
                                </PositiveButton>
                            </div>
                            <div className='shadow-sm'>
                                <Calendar
                                    events={schedules.map((schedule) => ({
                                        id: schedule.sid,
                                        title: schedule.content,
                                        start: schedule.allDay ? schedule.date.start : new Date(`${schedule.date.start}T${schedule.time.start}:00`).toISOString(),
                                        end: schedule.allDay ? schedule.date.end : new Date(`${schedule.date.end}T${schedule.time.end}:00`).toISOString(),
                                        category: schedule.category.cid, description: "",
                                        allDay: schedule.allDay
                                    }))}
                                    onEventClick={handleEventClick}
                                />
                            </div>
                        </div>
                        <div className={`flex-1  overflow-y-auto`}>
                            <EventInfoTable navigate={navigateToForm} />
                        </div>
                        <FAB isOpenFAB={isOpenFAB} onClose={toggleFAB}>
                            <div className="flex flex-col">
                                <RoundedButton
                                    className="px-4 py-3 bg-indigo-600 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-400 transition-all duration-200 ease-in-out"
                                    onClick={() => navigateToForm(undefined)}
                                >
                                    <p className="flex flex-row">
                                        <span className="mr-2"><NoteIcon /></span>
                                        スケジュールを追加する
                                    </p>
                                </RoundedButton>
                            </div>
                        </FAB>
                    </>
                </ListNotFound>
            </Loading>
        </div>
    );
};
