import { useEffect, useState } from 'react';
import { useScheduleManager } from '../hooks/useScheduleManager';
import { useSchedules } from '../provider/SchedulesProvider';
import Calendar from '../organisms/Calendar';
import { EventClickArg } from '@fullcalendar/core';
import { EventInfoTable } from '../organisms/EventInfoTable';
import { NoteIcon } from '../image/NoteIcon';
import { RoundedButton } from '../atoms/RoundedButton';
import { useCategoriesManager } from '../hooks/useCategoriesManage';
import { Loading } from '../organisms/Loadning';
import { ListNotFound } from '../organisms/ListNotFound';
import { FAB } from '../organisms/FAB';
import { useFAB } from '../hooks/useFAB';
import { FormModal } from '../organisms/FormModal';

export const SchedulePage = () => {
    const { isOpenFAB, toggleFAB } = useFAB();
    const { readSchedule } = useScheduleManager();
    const { setSelectedSchedule, schedules } = useSchedules();
    const { readCategories } = useCategoriesManager();
    const [loading, setLoading] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const storedDate = localStorage.getItem('calendarCurrentDate');
    const [currentDate, setCurrentDate] = useState(storedDate ? new Date(storedDate) : new Date());

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([readSchedule(), readCategories()]);
            } catch (error) {
                console.error('データの読み込み中にエラーが発生しました:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isOpenModal) {
            const fetchData = async () => {
                try {
                    await Promise.all([readSchedule(), readCategories()]);
                } catch (error) {
                    console.error('データの読み込み中にエラーが発生しました:', error);
                }
            };

            fetchData();
        }
        // eslint-disable-next-line
    }, [isOpenModal]);

    const handleEventClick = async (arg: EventClickArg) => {
        const schedule = schedules.find((schedule) => schedule.sid === arg.event.id);
        if (schedule) {
            try {
                await Promise.all([readSchedule(), readCategories()]);
                setSelectedSchedule(schedule);
                setIsOpenModal(true);
            } catch (error) {
                console.error('イベント処理中にエラーが発生しました:', error);
            }
        }
    };

    const handleDatesSet = (dateInfo: any) => {
        const newDate = dateInfo.start;
        if (currentDate.toISOString() !== newDate.toISOString()) {
            setCurrentDate(newDate);
            localStorage.setItem('calendarCurrentDate', newDate.toISOString());
        }
    };


    const renderCalendarEvents = () => {
        return schedules.map((schedule) => ({
            id: schedule.sid,
            title: schedule.content,
            start: schedule.allDay
                ? schedule.date.start
                : new Date(`${schedule.date.start}T${schedule.time.start}:00`).toISOString(),
            end: schedule.allDay
                ? schedule.date.end
                : new Date(`${schedule.date.end}T${schedule.time.end}:00`).toISOString(),
            category: schedule.category.cid,
            description: "",
            allDay: schedule.allDay,
        }));
    };

    return (
        <div className='max-h-full flex flex-col'>
            <Loading loading={loading}>
                <ListNotFound
                    existing={schedules.length === 0}
                    onClick={() => setIsOpenModal(true)}
                    btnStr='スケジュールを追加する'
                    msgStr='「スケジュールを追加する」からメンバー間の予定を登録しましょう'
                >
                    <div>
                        <div className='shadow-sm mt-2'>
                            <Calendar
                                events={renderCalendarEvents()}
                                onEventClick={handleEventClick}
                                initialDate={currentDate}
                                datesSet={handleDatesSet}
                            />
                        </div>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                        <EventInfoTable onOpen={() => setIsOpenModal(true)} />
                    </div>
                    <FAB isOpenFAB={isOpenFAB} onClose={toggleFAB}>
                        <div className='flex flex-col'>
                            <RoundedButton
                                className='px-4 py-3 bg-indigo-600 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-400 transition-all duration-200 ease-in-out'
                                onClick={() => {
                                    setIsOpenModal(true);
                                    toggleFAB();
                                }}
                            >
                                <p className='flex flex-row'>
                                    <span className='mr-2'><NoteIcon /></span>
                                    スケジュールを追加する
                                </p>
                            </RoundedButton>
                        </div>
                    </FAB>
                </ListNotFound>
            </Loading>
            {isOpenModal && (
                <FormModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
            )}
        </div>
    );
};
